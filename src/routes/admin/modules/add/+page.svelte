<script>
  import { enhance } from "$app/forms";

  export let form;

  import Exam from "../components/exam.svelte";
  import Moduletype from "../components/moduletype.svelte";

  let examCount = 1;

  const addExam = () => {
    examCount = examCount + 1;
  };

  const removeExam = () => {
    examCount = examCount - 1;
  };
</script>

<svelte:head>
  <title>PV-A Modulverwaltung</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container bg-body-tertiary border my-4 p-3 shadow-sm">
  {#if form?.success}
    <div class="alert alert-success" role="alert">
      Das Modul {form?.id} - {form?.name} wurde erfolgreich gespeichert!
    </div>
  {:else if form?.error}
    <div class="alert alert-danger" role="alert">
      <b>Es ist ein Fehler aufgetreten!</b><br />
      {#if form?.message}
        {form?.message}
      {/if}
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
        required
      />
    </div>
    <div class="col-sm-6">
      <label for="moduleId" class="form-label">Modul-ID</label>
      <input
        name="moduleid"
        type="number"
        class="form-control"
        id="moduleId"
        placeholder="012345"
        required
        min="100000"
        max="999999"
      />
    </div>
    <div class="col-sm-6">
      <label for="credits" class="form-label">Credits</label>
      <input
        name="credits"
        type="number"
        class="form-control"
        id="credits"
        placeholder="3"
        required
        min="1"
        max="99"
      />
    </div>

    <div class="col-12 fs-5 mt-5">Modulprüfungen</div>
    {#each Array(examCount) as _, index (index)}
      {#if index + 1 == examCount && examCount > 1}
        <Exam id={index + 1} last={true} on:click={removeExam} />
      {:else}
        <Exam id={index + 1} />
      {/if}
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
      <button class="btn btn-success">Modul hinzufügen</button>
    </div>
  </form>
</div>
