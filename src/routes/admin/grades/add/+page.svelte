<script>
  // @ts-nocheck

  import consts from "../../../../consts";
  import MemberGradeInput from "../components/MemberGradeInput.svelte";
  import MessageBanner from "../../components/MessageBanner.svelte";

  export let form;

  let searchInput = "";
  let targetModule = {};
  let foundExams = [];
  let foundPlannedExams = [];
  let selectedExamId = "";
  let selectedRegistrationPeriodId = "";
  let noRegistrationPeriodsFound = false;
  let registrationPeriodsResult = false;

  const searchModule = async () => {
    selectedExamId = "";
    selectedRegistrationPeriodId = "";
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

      noRegistrationPeriodsFound = false;
      selectedExamId = "";
      selectedRegistrationPeriodId = "";

      return (targetModule = moduleRes[0]);
    }
  };

  const searchTermsForExam = async () => {
    selectedRegistrationPeriodId = "";
    noRegistrationPeriodsFound = false;
    registrationPeriodsResult = false;
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
      noRegistrationPeriodsFound = plannedExamsRes.length == 0 ? true : false;
      registrationPeriodsResult = true;
      return (foundPlannedExams = plannedExamsRes);
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

  const getExamTypeNameByExamId = (examid) => {
    let type = "";

    foundExams.forEach((exam) => {
      if (exam.id.toString() == examid) {
        type = exam.type;
      }
    });

    return getExamTypeName(type);
  };

  let memberCount = 1;
  const increaseMemberCount = () => {
    memberCount = memberCount + 1;

    const element = document.getElementById("savebutton");
    element?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const decreaseMemberCount = () => {
    memberCount = memberCount - 1;
  };
</script>

<svelte:head>
  <title>PV-A Notenvergabe</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container border rounded-2 my-4 p-3 shadow-sm">
  {#if form?.success}
    <MessageBanner type="success">Die Noten wurden gespeichert!</MessageBanner>
  {/if}
  <form action="?/addGrades" method="POST" class="row g-3">
    <div class="col-12 fs-5">Noten vergeben</div>
    <div class="col-4">
      <label class="form-label" for="moduleid"
        >Modul durch Modul-ID suchen</label
      >
      <input
        type="number"
        class="form-control"
        id="moduleid"
        name="moduleid"
        placeholder="123456"
        bind:value={searchInput}
        on:input={searchModule}
      />
    </div>
    {#if targetModule.name}
      <div class="col-12 fs-5">
        Prüfungen des Moduls <b>{targetModule?.name}</b>
      </div>
      <div class="col-4">
        <label class="form-label" for="exam"
          >Prüfung zur Notenvergabe auswählen</label
        >
        <select
          required
          class="form-select"
          id="exam"
          name="exam"
          bind:value={selectedExamId}
          on:change={searchTermsForExam}
        >
          {#each foundExams as exam}
            <option value={exam.id}>
              {getExamTypeName(exam.type)}
            </option>
          {/each}
        </select>
      </div>
      {#if selectedExamId && registrationPeriodsResult}
        {#if noRegistrationPeriodsFound}
          <div class="col-12">
            <b>Fehler:</b> Für diese Prüfung gibt es keine Anmeldeperioden.
          </div>
        {:else}
          <div class="col-4">
            <label class="form-label" for="term">
              Semester der Prüfung auswählen
            </label>
            <select
              required
              class="form-select"
              id="term"
              name="term"
              bind:value={selectedRegistrationPeriodId}
            >
              {#each foundPlannedExams as exam}
                <option value={exam.name}>{exam.name}</option>
              {/each}
            </select>
          </div>
        {/if}
      {/if}
      {#if selectedExamId && selectedRegistrationPeriodId}
        <div class="col-12 fs-5">
          Noten für <b>{getExamTypeNameByExamId(selectedExamId)}</b> in
          <b>{targetModule?.name}</b> für das
          <b>{selectedRegistrationPeriodId}</b> vergeben
        </div>
        {#each Array(memberCount) as _, index (index)}
          <MemberGradeInput id={memberCount} />
        {/each}
        <div class="col-12">
          <button
            on:click={increaseMemberCount}
            type="button"
            class="btn btn-success btn-sm"
          >
            Weitere Note hinzufügen
          </button>
          {#if memberCount > 1}
            <button
              on:click={decreaseMemberCount}
              type="button"
              class="btn btn-danger btn-sm"
            >
              Letztes Eingabefeld entfernen
            </button>
          {/if}
        </div>
        <div class="col-12 fs-5 mt-5">Noten abspeichern</div>
        <div class="col-12">
          <button id="savebutton" class="btn btn-success"
            >Noten speichern</button
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
