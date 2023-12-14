<script>
  export let data;

  import Moduleedit from "../components/moduleedit.svelte";

  let selected = "";
</script>

<svelte:head>
  <title>PV-A Modulverwaltung</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container bg-body-tertiary border my-4 p-3 shadow-sm">
  <form action="?/saveModule" method="POST" class="row g-3">
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
        {#each data.modules as mod}
          {#if mod.id + "" == selected}
            <Moduleedit id={selected} name={mod.name} credits={mod.credits} />
          {/if}
        {/each}
      {/key}
    {/if}
  </form>
</div>
