<script>
  // @ts-nocheck

  import consts from "../../../../consts";
  import MessageBanner from "../../components/MessageBanner.svelte";

  export let data;
  export let form;

  let searchInput = "";
  let targetModule = {};
  let foundExams = [];

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
  <title>PV-A Prüfungsplan</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container bg-light-subtle border my-4 p-3 shadow-sm">
  {#if form?.success}
    <MessageBanner type="success">
      Der Prüfungstermin wurde erfolgreich festgelegt!
    </MessageBanner>
  {/if}
  {#if form?.error}
    <MessageBanner type="error">
      {form?.message}
    </MessageBanner>
  {/if}

  <form action="?/planExam" method="POST" class="row g-3">
    <div class="col-12 fs-5">Prüfungstermin hinzufügen</div>
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
        <select required class="form-select" id="exam" name="exam">
          {#each foundExams as exam}
            <option value={exam.id}>{getExamTypeName(exam.type)}</option>
          {/each}
        </select>
      </div>

      <div class="col-12 fs-5">Prüfungstermin festlegen</div>
      <div class="col col-lg-6">
        <label class="form-label" for="reg_period">Anmeldeperiode</label>
        <select class="form-select" id="reg_period" name="reg_period" required>
          {#each data.periods as period}
            <option value={period.id}>{period.name}</option>
          {/each}
        </select>
      </div>
      <div class="col col-lg-3">
        <label class="form-label" for="date">Prüfungsdatum</label>
        <input
          class="form-control"
          id="date"
          name="date"
          type="date"
          required
        />
      </div>

      <div class="col-12">
        <button class="btn btn-success">Prüfungstermin festlegen</button>
      </div>
    {:else if searchInput?.toString().length != 6}
      <div class="col-12">Bitte eine 6-stellige Modul-ID eingeben.</div>
    {:else if targetModule.error}
      <div class="col-12">
        <b>Fehler:</b> Das Modul <b>{searchInput}</b> existiert nicht.
      </div>
    {/if}
  </form>
</div>
