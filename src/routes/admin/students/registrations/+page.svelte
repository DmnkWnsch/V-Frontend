<script>
  export let form;
</script>

<svelte:head>
  <title>PV-A Prüfungsanmeldungen</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container bg-light-subtle border my-4 p-3 shadow-sm">
  <form action="?manageRegistration" method="POST" class="row g-3">
    <div class="col-12 fs-5">Prüfungsanmeldung verwalten</div>
  </form>
</div>
