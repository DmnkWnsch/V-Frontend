<script>
  import RegistrationPeriodAddForm from "../components/RegistrationPeriodAddForm.svelte";
  import RegistrationPeriodCard from "../components/RegistrationPeriodCard.svelte";

  export let data;

  const periodCount = data.periods.length;
  let addFormOpen = false;
  const changeFormOpenState = () => {
    addFormOpen = !addFormOpen;
  };
</script>

<svelte:head>
  <title>PV-A Prüfungsverwaltung</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container bg-light-subtle border my-4 p-3 shadow-sm">
  {#each data.periods as period, index (index)}
    <RegistrationPeriodCard
      {index}
      id={period.id}
      periodName={period.name}
      startDate={period.start_date}
      endDate={period.end_date}
    />
  {/each}

  {#if periodCount == 0}
    <p class="text-center m-1">
      Aktuell sind keine Registrierungsperioden vorhanden.
    </p>
  {/if}

  <div class="col-12 text-center mt-4">
    <button
      on:click={changeFormOpenState}
      class={addFormOpen ? "btn btn-secondary" : "btn btn-success"}
      >{addFormOpen ? "Schließen" : "Hinzufügen"}</button
    >
  </div>

  {#if addFormOpen}
    <RegistrationPeriodAddForm />
  {/if}
</div>
