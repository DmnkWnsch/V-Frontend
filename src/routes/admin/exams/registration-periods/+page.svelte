<script>
  import util from "../../../../util";
  import MessageBanner from "../../components/MessageBanner.svelte";
  import RegistrationPeriodAddForm from "../components/RegistrationPeriodAddForm.svelte";
  import RegistrationPeriodCard from "../components/RegistrationPeriodCard.svelte";

  export let data;
  export let form;

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
  {#if form?.success}
    <MessageBanner type="success">
      {#if form?.reason == "add"}
        Die Anmeldeperiode <b>{form?.data.name}</b> vom
        <b>
          {util.formatDate(new Date(form?.data.startDate))}
        </b>
        bis <b>{util.formatDate(new Date(form?.data.endDate))}</b> wurde erfolgreich
        erstellt.
      {:else if form?.reason == "save"}
        Die Anmeldeperiode <b>{form?.data.name}</b> wurde erfolgreich gespeichert.
      {:else if form?.reason == "delete"}
        Die Anmeldeperiode wurde erfolgreich gelöscht.
      {/if}
    </MessageBanner>
  {/if}
  {#if form?.error}
    <MessageBanner type="error">{form?.message}</MessageBanner>
  {/if}

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
