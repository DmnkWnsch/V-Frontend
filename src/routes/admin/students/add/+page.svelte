<script>
  import MessageBanner from "../../components/MessageBanner.svelte";
  export let form;
</script>

<svelte:head>
  <title>PV-A Studierendenverwaltung</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container border rounded-2 my-4 p-3 shadow-sm">
  {#if form?.success}
    <MessageBanner type="success">
      Studierender <b>'{form?.last_name}, {form?.first_name}'</b> wurde mit
      MatrikelNr.
      <b>{form?.id}</b>
      erstellt!
    </MessageBanner>
  {/if}
  {#if form?.error}
    <MessageBanner type="error">
      {form?.message}
    </MessageBanner>
  {/if}
  <form action="?/addStudent" method="POST" class="row g-3">
    <div class="col-12 fs-5">Neuen Studierenden hinzufügen</div>
    <div class="col-sm-4">
      <label for="first_name" class="form-label">Vorname</label>
      <input
        name="first_name"
        id="first_name"
        type="text"
        class="form-control"
        placeholder="Max"
        required
      />
    </div>
    <div class="col-sm-4">
      <label for="last_name" class="form-label">Nachname</label>
      <input
        name="last_name"
        id="last_name"
        type="text"
        class="form-control"
        placeholder="Mustermann"
        required
      />
    </div>
    <div class="col-sm-2">
      <label for="role" class="form-label">Rolle</label>
      <select name="role" id="role" class="form-select" required>
        <option value="STUDENT">Student</option>
        <option value="ADMIN">Admin</option>
      </select>
    </div>
    <div class="col-sm-2 d-flex align-items-end">
      <button class="btn btn-success">Speichern</button>
    </div>
  </form>
</div>
