<script>
  // @ts-nocheck

  import consts from "../../../../consts";
  import util from "../../../../util";
  import MessageBanner from "../../components/MessageBanner.svelte";
  import PlannedExamsTable from "../components/PlannedExamsTable.svelte";

  export let data;
  export let form;

  let searchInput = "";
  let targetModule = {};
  let foundExams = [];

  let selectedExamId = -1;

  const searchModule = async () => {
    selectedExamId = -1;
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
</script>

<svelte:head>
  <title>PV-A Teilnehmerlisten</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container border rounded-2 my-4 p-3 shadow-sm">
  {#if form?.success}
    <MessageBanner type="success">
      {#if form?.reason == "EX_DEL"}
        Die Prüfung wurde erfolgreich gelöscht.
      {:else if form?.reason == "EX_UPD"}
        Der neue Termin für die Prüfung wurde gespeichert.
      {:else if form?.reason == "EX_CRE"}
        Der Prüfungstermin wurde erfolgreich festgelegt!
      {/if}
    </MessageBanner>
  {/if}
  {#if form?.error}
    <MessageBanner type="error">
      {form?.message}
    </MessageBanner>
  {/if}

  <form action="?/planExam" method="POST" class="row g-3">
    <div class="col-12 fs-5">Teilnehmerliste erstellen</div>
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
        >
          {#each foundExams as exam}
            <option value={exam.id}>{getExamTypeName(exam.type)}</option>
          {/each}
        </select>
      </div>

      {#if selectedExamId != -1}
        <div class="col-12 fs-5">Aktuelle Prüfungstermine</div>
        {#key selectedExamId}
          <PlannedExamsTable examId={selectedExamId} tableType="PARTICIPANTS" />
        {/key}
      {:else}
        <div class="col-12">Bitte eine Prüfung auswählen.</div>
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
