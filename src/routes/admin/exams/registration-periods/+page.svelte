<script>
  import RegistrationPeriodCard from "../components/RegistrationPeriodCard.svelte";

  export let data;
</script>

<svelte:head>
  <title>PV-A Prüfungsverwaltung</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container bg-body-tertiary border my-4 p-3 shadow-sm">
  {#each data.periods as period}
    <RegistrationPeriodCard
      id={period.id}
      periodName={period.name}
      startDate={period.start_date}
      endDate={period.end_date}
    />
  {/each}
</div>
