<script>
  // @ts-nocheck

  import consts from "../../../../consts.js";
  import MessageBanner from "../../components/MessageBanner.svelte";
  import AddRegistrationCard from "../components/AddRegistrationCard.svelte";
  import RegistrationsTable from "../components/RegistrationsTable.svelte";

  export let form;

  let searchInput = "";
  let targetMember = {};
  let memberFound = false;

  const searchMemberByID = async () => {
    memberFound = false;

    if (searchInput?.toString().trim().length != 6) {
      return (targetMember = {});
    }

    const memberRequest = await fetch(
      consts.API_URL + "/members/" + searchInput,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (memberRequest.status == 200) {
      const response = await memberRequest.json();

      if (response.length == 0) {
        return (targetMember = { error: true });
      }

      memberFound = true;
      return (targetMember = response[0]);
    }
  };

  let registrationFormOpen = false;

  const changeRegistrationFormState = () => {
    registrationFormOpen = !registrationFormOpen;
  };
</script>

<svelte:head>
  <title>PV-A Prüfungsanmeldungen</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container border rounded-2 my-4 p-3 shadow-sm">
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
    <div class="col-12 fs-5">Prüfungsanmeldung verwalten</div>
    <div class="col-4">
      <label class="form-label" for="search">
        Student durch Matrikelnummer suchen
      </label>
      <input
        type="number"
        class="form-control"
        id="search"
        name="search"
        placeholder="123456"
        bind:value={searchInput}
        on:input={searchMemberByID}
      />
    </div>
    {#if targetMember.name}
      <div class="col-12 fs-5">
        Prüfungsanmeldungen von {searchInput}
      </div>
      <RegistrationsTable memberId={targetMember.id} />

      <div class="col-12">
        <button
          class="btn btn-success"
          type="button"
          on:click={changeRegistrationFormState}>Neue Anmeldung</button
        >
      </div>

      {#if registrationFormOpen}
        <div class="col-12">
          <AddRegistrationCard memberId={targetMember.id} />
        </div>
      {/if}
    {:else if searchInput?.toString().length != 6}
      <div class="col-12">Bitte eine 6-stellige Matrikelnummer eingeben.</div>
    {:else if targetMember.error}
      <div class="col-12">
        <b>Fehler:</b> Die Matrikelnummer <b>{searchInput}</b> ist nicht vergeben.
      </div>
    {/if}
  </div>
</div>
