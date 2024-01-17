<script>
  // @ts-nocheck

  export let id;
  export let firstName;
  export let lastName;
  export let role;

  let editStudent = false;

  const changeEditStudent = () => {
    editStudent = !editStudent;
  };
</script>

<div class="card mt-3">
  <div class="card-body">
    <h5>{id}</h5>
    <div class="row">
      <div class="col-sm-6">
        <b>Name: </b>{lastName}, {firstName}
      </div>
      <div class="col-sm-6">
        <b>Rolle: </b>{role}
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <button
          on:click={changeEditStudent}
          class={editStudent ? "btn btn-secondary" : "btn btn-success"}
          >{editStudent ? "Schließen" : "Hinzufügen"}</button
        >
      </div>
    </div>
    {#if editStudent}
      <form action="?/editStudent" method="POST">
        <input name="id" value={id} hidden />
        <div class="row mt-1 g-3">
          <div class="col-lg-6">
            <label for="first_name" class="form-label">Vorname</label>
            <input
              type="text"
              class="form-control"
              value={firstName}
              id="first_name"
              name="first_name"
              required
            />
          </div>
          <div class="col-lg-6">
            <label for="last_name" class="form-label">Nachname</label>
            <input
              type="text"
              class="form-control"
              value={lastName}
              id="last_name"
              name="last_name"
              required
            />
          </div>
          <div class="col col-lg-6">
            <label for="role" class="form-label">Rolle</label>
            <select
              name="role"
              id="role"
              class="form-select"
              value={role}
              required
            >
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div class="col col-lg-3 d-flex align-items-end">
            <button class="btn btn-success w-100">Speichern</button>
          </div>
          <div class="col col-lg-3 d-flex align-items-end">
            <button class="btn btn-danger w-100">Löschen</button>
          </div>
        </div>
      </form>
    {/if}
  </div>
</div>
