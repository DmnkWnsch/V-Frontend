<script>
  // @ts-nocheck

  import MessageBanner from "../../components/MessageBanner.svelte";
  import StudentSearchField from "../../components/StudentSearchField.svelte";
  import GradesTable from "../components/GradesTable.svelte";

  export let form;

  let memberFound;
  let isLoading;
  let targetMember;
</script>

<svelte:head>
  <title>PV-A Noten bearbeiten</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container bg-light-subtle border my-4 p-3 shadow-sm">
  {#if form?.success}
    <MessageBanner type="success">
      {#if form?.reason == "REG_ADD"}
        Die Anmeldung wurde erfolgreich gespeichert.
      {:else if form?.reason == "REG_DEL"}
        Die Anmeldung wurde erfolgreich gelöscht.
      {:else if form?.reason == "REG_UPD"}
        Der neue Status wurde erfolgreich gespeichert.
      {/if}
    </MessageBanner>
  {/if}
  {#if form?.error}
    <MessageBanner type="error">
      {form?.message}
    </MessageBanner>
  {/if}

  <div class="row g-3">
    <div class="col-12 fs-5">Noten bearbeiten</div>
    <div class="col-4">
      <StudentSearchField bind:targetMember bind:memberFound bind:isLoading />
    </div>

    {#if targetMember?.name}
      <div class="col-12 fs-5">Noten von {targetMember.id}</div>
      <GradesTable memberId={targetMember.id} />
    {:else if targetMember?.error}
      <div class="col-12">
        <b>Fehler:</b> Die Matrikelnummer ist nicht vergeben.
      </div>
    {:else if !memberFound}
      <div class="col-12">Bitte eine 6-stellige Matrikelnummer eingeben.</div>
    {/if}
  </div>
</div>
