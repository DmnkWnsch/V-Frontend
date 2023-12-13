<script>
  import { enhance } from "$app/forms";

  export let form;
  export let data;

  import Exam from "./components/exam.svelte";
  //import Moduleedit from "./components/moduleedit.svelte";
  import Moduletype from "./components/moduletype.svelte";

  const test = import("./components/moduleedit.svelte").then(
    ({ default: C }) => C
  );

  let examCount = 1;

  const addExam = () => {
    examCount = examCount + 1;
  };

  let selected = "";
</script>

<svelte:head>
  <title>PV-A Modulverwaltung</title>
  <meta name="description" content="About this app" />
</svelte:head>

<h3 class="text-center mt-4">Modulverwaltung</h3>
<h5 class="text-center">Module hinzufügen</h5>

<div class="container bg-body-tertiary border my-4 p-3 shadow-sm">
  <form action="" method="POST" class="row g-3">
    <div class="col-12 fs-5">Modul bearbeiten</div>

    <div class="col-12">
      <label for="moduleselect" class="form-label">Modul auswählen</label>
      <select
        bind:value={selected}
        name="moduleselect"
        class="form-select"
        id="moduleselect"
      >
        {#each data.modules as mod}
          <option value={mod.id}>{mod.id} - {mod.name}</option>
        {/each}
      </select>
    </div>

    {#if selected}
      {#key selected}
        {#await test}
          LOADING
        {:then Comp}
          <Comp id={selected} />
        {/await}
      {/key}
    {/if}
  </form>
</div>

<div class="container bg-body-tertiary border my-4 p-3 shadow-sm">
  {#if form?.success}
    <div class="alert alert-success" role="alert">
      Das Modul {form?.id} - {form?.name} wurde erfolgreich gespeichert!
    </div>
  {/if}

  <form action="?/saveModule" method="POST" class="row g-3">
    <div class="col-12 fs-5">Modulinformationen</div>
    <div class="col-12">
      <label for="modulename" class="form-label">Modul-Name</label>
      <input
        name="modulename"
        type="text"
        class="form-control"
        id="modulename"
        placeholder="XYZ"
      />
    </div>
    <div class="col-sm-6">
      <label for="moduleId" class="form-label">Modul-ID</label>
      <input
        name="moduleid"
        type="text"
        class="form-control"
        id="moduleId"
        placeholder="012345"
      />
    </div>
    <div class="col-sm-6">
      <label for="credits" class="form-label">Credits</label>
      <input
        name="credits"
        type="text"
        class="form-control"
        id="credits"
        placeholder="3"
      />
    </div>

    <div class="col-12 fs-5 mt-5">Modulprüfungen</div>
    {#each Array(examCount) as _, index (index)}
      <Exam id={index + 1} />
    {/each}
    <div class="col-12">
      <button on:click={addExam} type="button" class="btn btn-success btn-sm"
        >Weitere Prüfung hinzufügen</button
      >
    </div>

    <div class="col-12 fs-5 mt-5">Typ des Moduls für verschiedene Kurse</div>

    <Moduletype name="Eingebettete Systeme" short="embedded" />
    <Moduletype name="Medieninformatik" short="media" />
    <Moduletype name="Verteilte Systeme" short="distri" />
    <Moduletype name="Computergrafik" short="cg" />

    <div class="col-sm-4">
      <button class="btn btn-success">Modul speichern</button>
    </div>
  </form>
</div>
