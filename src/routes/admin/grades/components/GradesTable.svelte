<script>
  // @ts-nocheck
  import consts from "../../../../consts";

  export let memberId;

  // contains all the grades loaded for the given id
  let fullGrades;
  // contains all grades that are filtered for a given module id
  let grades;
  let isLoading = false;

  const loadGrades = async (memberId) => {
    isLoading = true;

    const request = await fetch(
      consts.API_URL + "/members/" + memberId + "/results",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await request.json();

    // Set editable tag for the last exam of each module
    setEditableTags(response);

    isLoading = false;
    grades = response;
    return (fullGrades = response);
  };

  // Highly inefficient method to set whatever a grade is editable / deletable or not
  // Its problematic because we need multiple loops to iterate through the list
  // For this project its fine, but for a production-ready product we would need to rework this
  const setEditableTags = (list) => {
    const moduleIds = [];

    list.forEach((grade) => {
      // Set all grades to not be editable to later only allow the latest tries
      grade.editable = false;
      if (!moduleIds.includes(grade.module_id)) {
        moduleIds.push(grade.module_id);
      }
    });

    moduleIds.forEach((id) => {
      const gradesForModule = list.filter((grade) => {
        return grade.module_id == id;
      });

      // Sorting the list so the tries are in ascending order
      gradesForModule.sort((a, b) => a.try - b.try);

      const lastTry = gradesForModule[gradesForModule.length - 1].try;

      list.some((grade) => {
        const correct = grade.module_id == id && grade.try == lastTry;
        if (correct) grade.editable = true;

        return correct;
      });
    });
  };

  let filter;

  const filterGrades = () => {
    if (!filter || filter.toString().trim().length == 0) {
      return (grades = fullGrades);
    }

    if (fullGrades && filter) {
      const result = fullGrades.filter((grade) => {
        return grade.module_id.toString().startsWith(filter.toString().trim());
      });

      grades = result;
    }
  };

  const getBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "failed":
        return "danger";
      case "passed":
        return "success";
    }
  };

  const getTitleByStatus = (status) => {
    switch (status.toLowerCase()) {
      case "failed":
        return "Durchgefallen";
      case "passed":
        return "Bestanden";
    }
  };

  let editingGradeIndex = -1;

  const setEditingGradeIndex = (index) => {
    if (editingGradeIndex == index) {
      editingGradeIndex = -1;
    } else {
      editingGradeIndex = index;
    }
  };

  $: loadGrades(memberId);
</script>

<div class="col-4">
  <label class="form-label" for="filter">Modul-ID filtern</label>
  <input
    type="number"
    class="form-control"
    name="filter"
    id="filter"
    bind:value={filter}
    on:input={filterGrades}
  />
</div>
<div class="col-12">
  {#if !isLoading && fullGrades == 0}
    Für diesen Studenten liegen keine Ergebnisse vor.
  {/if}

  {#if !isLoading && fullGrades?.length > 0 && grades?.length == 0}
    Für dieses Modul-ID liegen keine Ergebnisse vor.
  {/if}

  {#if !isLoading && grades?.length > 0}
    <div class="accordion" id="gradesAccordion">
      {#each grades as grade, index (index)}
        <div class="accordion-item">
          <form action="?/manageResults" method="POST">
            <input hidden name="id" value={grade.member_id} />
            <input hidden name="examId" value={grade.exam_id} />
            <input hidden name="try" value={grade.try} />

            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#collapse" + index}
                aria-expanded="false"
                aria-controls={"collapse" + index}
              >
                <div class="col">
                  <b>{grade.module_id}</b>
                </div>
                <div class="col">
                  <b>{consts.getExamTypeName(grade.type)}</b>
                </div>
                <div class="col">
                  <h5 class="mb-0">
                    <span class={"badge text-bg-" + getBadgeColor(grade.status)}
                      >{getTitleByStatus(grade.status)}</span
                    >
                  </h5>
                </div>
                <div class="col"><b>{grade.grade}</b></div>
                <div class="col"><b>{grade.try}. Versuch</b></div>
              </button>
            </h2>
            <div
              id={"collapse" + index}
              class="accordion-collapse collapse"
              data-bs-parent="#gradesAccordion"
            >
              <div class="accordion-body row">
                <div class="col-4"><b>Modul</b></div>
                <div class="col-4">{grade.module_id}</div>
                <div class="col-4"></div>

                <div class="col-4"><b>Prüfungsart</b></div>
                <div class="col-4">{consts.getExamTypeName(grade.type)}</div>
                <div class="col-4"></div>

                <div class="col-4"><b>Semester der Leistung</b></div>
                <div class="col-4">{grade.term}</div>
                <div class="col-4"></div>

                <div class="col-4"><b>Status</b></div>
                <div class="col-4">{getTitleByStatus(grade.status)}</div>
                <div class="col-4"></div>

                <div class="col-4"><b>Versuch</b></div>
                <div class="col-4">{grade.try}</div>
                <div class="col-4"></div>

                <div class="col-4"><b>Note</b></div>
                <div class="col-4">{grade.grade}</div>
                <div class="col-4"></div>

                {#if grade.editable}
                  <div class="col-12 mt-3">
                    <button
                      class="btn btn-success"
                      type="button"
                      on:click={setEditingGradeIndex(index)}
                    >
                      Note bearbeiten
                    </button>
                    <button class="btn btn-danger" name="action" value="delete">
                      Note löschen
                    </button>
                  </div>

                  {#if editingGradeIndex == index}
                    <div class="row mt-4 d-flex align-items-center">
                      <div class="col-4"><b>Neue Note</b></div>
                      <div class="col-4">
                        <input
                          type="number"
                          class="form-control"
                          id="new_grade"
                          name="new_grade"
                          placeholder="1.7"
                          step=".1"
                          required
                        />
                      </div>
                      <div class="col-4">
                        <button
                          class="btn btn-success"
                          type="submit"
                          name="action"
                          value="save_grade">Speichern</button
                        >
                      </div>
                    </div>
                  {/if}
                {:else}
                  <div class="col-12 mt-4">
                    <b
                      >Diese Note kann nicht bearbeitet werden, da es einen
                      neueren Versuch gibt.</b
                    >
                  </div>
                {/if}
              </div>
            </div>
          </form>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .accordion-button.collapsed:hover {
    background-color: rgba(var(--bs-secondary-bg-rgb), 1);
  }

  .accordion-button:not(.collapsed) {
    background-color: rgba(var(--bs-secondary-bg-rgb), 1);
  }

  .accordion-button:focus {
    box-shadow: none;
  }
</style>
