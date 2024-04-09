<script>
  // @ts-nocheck
  import consts from "../../../../consts";
  import util from "../../../../util";
  import ExamContainer from "../../../exam-administration/custom_components/exam_container.svelte";

  export let examId;

  let plannedExams;
  let isLoading = false;

  const loadPlannedExams = async (examId) => {
    isLoading = true;

    const request = await fetch(
      consts.API_URL + "/exams/" + examId + "/planned-exams",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await request.json();

    isLoading = false;
    return (plannedExams = response);
  };

  let editIndex = -1;

  const setEditingIndex = (index) => {
    if (editIndex == index) {
      editIndex = -1;
    } else {
      editIndex = index;
    }
  };

  $: loadPlannedExams(examId);
</script>

<div class="col-12">
  {#if !isLoading && plannedExams == 0}
    Für diese Prüfung liegen noch keine Termine vor.
  {/if}

  {#if !isLoading && plannedExams.length > 0}
    <div class="accordion" id="plannedExamsAccordion">
      {#each plannedExams as exam, index (index)}
        <div class="accordion-item">
          <form action="?/managePlannedExam" method="POST">
            <input hidden name="examplan_uid" value={exam.uid} />

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
                  <b>{util.formatDate(new Date(exam.date))}</b>
                </div>
                <div class="col"><b>{exam.name}</b></div>
              </button>
            </h2>
            <div
              id={"collapse" + index}
              class="accordion-collapse collapse"
              data-bs-parent="#plannedExamsAccordion"
            >
              <div class="accordion-body row">
                <div class="col-4"><b>Datum</b></div>
                <div class="col-4">{util.formatDate(new Date(exam.date))}</div>
                <div class="col-4"></div>
                <div class="col-4"><b>Anmeldeperiode</b></div>
                <div class="col-4">{exam.name}</div>
                <div class="col-4"></div>

                <div class="col-12 mt-3">
                  <button
                    class="btn btn-success"
                    type="button"
                    on:click={setEditingIndex(index)}
                  >
                    Prüfungsdatum ändern
                  </button>
                  <button class="btn btn-danger" name="action" value="delete"
                    >Prüfung löschen</button
                  >
                </div>

                {#if editIndex == index}
                  <div class="row mt-4 d-flex align-items-center">
                    <div class="col-4"><b>Neues Prüfungsdatum</b></div>
                    <div class="col-4">
                      <input
                        class="form-control"
                        id="date"
                        name="date"
                        type="date"
                        min={util.getMinForDatePicker()}
                        required
                      />
                    </div>
                    <div class="col-4">
                      <button
                        class="btn btn-success"
                        type="submit"
                        name="action"
                        value="save_date">Speichern</button
                      >
                    </div>
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
