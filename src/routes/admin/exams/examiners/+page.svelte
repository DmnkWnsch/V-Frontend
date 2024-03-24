<script>
  // @ts-nocheck

  import consts from "../../../../consts";
  import util from "../../../../util";
  import MessageBanner from "../../components/MessageBanner.svelte";

  export let data;
  export let form;

  let searchInput = "";
  let targetModule = {};
  let foundExams = [];
  let selectedExamId = "";
  let selectedExamPlanId = "";
  let foundPlannedExams = [];
  let foundExaminers = [];
  let noPlannedExamsFound = false;
  let noExaminersFound = false;

  const searchModule = async () => {
    if (searchInput?.toString().trim().length != 6) {
      return (targetModule = {});
    }

    const moduleReq = await fetch(consts.API_URL + "/modules/" + searchInput, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (moduleReq.status == 200) {
      const moduleRes = await moduleReq.json();

      if (moduleRes.length == 0) {
        return (targetModule = { error: true });
      }

      const examsReq = await fetch(
        consts.API_URL + "/modules/" + searchInput + "/exams",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const examsRes = await examsReq.json();
      foundExams = examsRes;

      noPlannedExamsFound = false;
      noExaminersFound = false;
      selectedExamId = "";
      selectedExamPlanId = "";
      return (targetModule = moduleRes[0]);
    }
  };

  const getExamTypeName = (examtype) => {
    let result = "";
    consts.EXAM_TYPES.forEach((et) => {
      if (et.type === examtype) {
        result = et.name;
      }
    });

    return result;
  };

  const searchPlannedExamsForExam = async () => {
    selectedExamPlanId = "";
    noPlannedExamsFound = false;
    if (!selectedExamId) return (foundPlannedExams = []);

    const plannedExamsReq = await fetch(
      consts.API_URL + "/exams/" + selectedExamId + "/planned-exams",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (plannedExamsReq.status == 200) {
      const plannedExamsRes = await plannedExamsReq.json();
      noPlannedExamsFound = plannedExamsRes.length == 0 ? true : false;
      return (foundPlannedExams = plannedExamsRes);
    }
  };

  const searchExaminersForExam = async () => {
    noExaminersFound = false;
    if (!selectedExamPlanId) return (foundExaminers = []);

    const examinersReq = await fetch(
      consts.API_URL + "/planned-exams/" + selectedExamPlanId + "/examiners",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (examinersReq.status == 200) {
      const examinersRes = await examinersReq.json();
      noExaminersFound = examinersRes.length == 0 ? true : false;
      return (foundExaminers = examinersRes);
    }
  };
</script>

<svelte:head>
  <title>PV-A Prüfer</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container bg-light-subtle border my-4 p-3 shadow-sm">
  {#if form?.success}
    <MessageBanner type="success">
      Der Prüfer wurde erfolgreich hinzugefügt.
    </MessageBanner>
  {/if}
  {#if form?.error}
    <MessageBanner type="error">
      {form?.message}
    </MessageBanner>
  {/if}

  <form action="?/manageExaminers" method="POST" class="row g-3">
    <div class="col-12 fs-5">Prüfer festlegen</div>
    <div class="col-4">
      <label class="form-label" for="search"
        >Prüfung durch Modul-ID suchen</label
      >
      <input
        type="number"
        class="form-control"
        id="search"
        name="search"
        placeholder="123456"
        bind:value={searchInput}
        on:input={searchModule}
      />
    </div>

    {#if targetModule.name}
      <div class="col-12">
        Prüfungstyp für Modul <b>{targetModule?.name}</b> auswählen
      </div>
      <div class="col-4">
        <select
          required
          class="form-select"
          id="exam"
          name="exam"
          bind:value={selectedExamId}
          on:change={searchPlannedExamsForExam}
        >
          {#each foundExams as exam}
            <option value={exam.id}>{getExamTypeName(exam.type)}</option>
          {/each}
        </select>
      </div>

      {#if selectedExamId}
        {#if noPlannedExamsFound}
          <div class="col-12">
            <b>Fehler:</b> Für diese Prüfung gibt es aktuell keine Termine.
          </div>
        {:else}
          <div class="col-12 fs-5">Prüfungsdatum</div>
          <div class="col-4">
            <select
              required
              class="form-select"
              id="planned_exam"
              name="planned_exam"
              bind:value={selectedExamPlanId}
              on:change={searchExaminersForExam}
            >
              {#each foundPlannedExams as plannedExam}
                <option value={plannedExam.uid}
                  >{util.formatDate(new Date(plannedExam.date))}</option
                >
              {/each}
            </select>
          </div>
        {/if}
      {/if}

      {#if selectedExamPlanId}
        <div class="col-12 fs-5">Prüfer</div>
        {#if noExaminersFound}
          <div class="col-12">
            Für diese Prüfung wurden bisher keine Prüfer festgelegt.
          </div>
        {:else}
          <div class="row row-cols-1 row-cols-md-2 gx-3">
            {#each foundExaminers as examiner}
              <div class="col">
                <div class="card mt-3">
                  <div class="card-body">
                    <h5 class="card-title">
                      {examiner.last_name}, {examiner.name}
                    </h5>
                    <b>ID:</b>
                    {examiner.id}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}

        <div class="col-4">
          <label for="new_examiner_id" class="form-label">ID des Prüfers</label>
          <input
            id="new_examiner_id"
            name="new_examiner_id"
            class="form-control"
            type="number"
            placeholder="123456"
            min="100000"
            max="999999"
            required
          />
        </div>
        <div class="col-4 d-flex align-items-end">
          <button
            type="submit"
            name="action"
            value="new_examiner"
            class="btn btn-success">Prüfer hinzufügen</button
          >
        </div>
      {/if}
    {:else if searchInput?.toString().length != 6}
      <div class="col-12">Bitte eine 6-stellige Modul-ID eingeben.</div>
    {:else if targetModule.error}
      <div class="col-12">
        <b>Fehler:</b> Das Modul <b>{searchInput}</b> existiert nicht.
      </div>
    {/if}
  </form>
</div>
