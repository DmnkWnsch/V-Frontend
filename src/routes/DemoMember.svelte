<script>
  // @ts-nocheck

  export let demoId;
  export let currentPath;

  let memberIdInput = demoId;
</script>

<div class="container mt-3">
  <div class="alert alert-warning">
    <div class="row g-3 d-flex align-items-center">
      <div class="col">
        <b>Matrikelnummer für Demonstration: {demoId}</b>
      </div>
      <form class="col" method="POST" action={currentPath + "?/manageDemoId"}>
        <div class="input-group">
          <input
            class="form-control"
            id="demo_id"
            name="demo_id"
            type="number"
            min="100000"
            max="999999"
            bind:value={memberIdInput}
          />
          <button class="btn btn-primary" type="submit">Setzen</button>
        </div>
      </form>
    </div>
  </div>
</div>
