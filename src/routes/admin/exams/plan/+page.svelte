<script>
  // @ts-nocheck

  import consts from "../../../../consts";
  import ExamPlanCard from "../components/ExamPlanCard.svelte";

  export let data;

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
        return (targetModule = { name: "bist du dumm?" });
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
</script>

<svelte:head>
  <title>PV-A Prüfungsplan</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container bg-light-subtle border my-4 p-3 shadow-sm">
  <form action="?/addStudent" method="POST" class="row g-3">
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
    <div class="col-12">
      {#if targetModule.name}
        Prüfungen für Modul <b>{targetModule?.name}</b>
        <div class="row row-cols-3 mt-3">
          {#each foundExams as exam}
            <div class="col"><ExamPlanCard type={exam.type} /></div>
          {/each}
        </div>
      {:else if searchInput?.toString().length != 6}
        Bitte eine 6-stellige Modul-ID eingeben.
      {/if}
    </div>

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
      <input class="form-control" id="date" name="date" type="date" required />
    </div>
  </form>
</div>
