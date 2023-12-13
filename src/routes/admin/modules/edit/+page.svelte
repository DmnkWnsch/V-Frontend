<script>
  export let data;

  import Moduleedit from "../components/moduleedit.svelte";

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
        <Moduleedit id={selected} />
      {/key}
    {/if}
  </form>
</div>
