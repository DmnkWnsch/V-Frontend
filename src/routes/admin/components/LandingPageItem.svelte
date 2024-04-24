<script>
  // @ts-nocheck

  export let title;
  export let url;
</script>

<div class="card hoverable mb-3">
  <div class="card-body">
    <h5 class="card-title">{title}</h5>
    <p class="card-text">
      <slot />
    </p>
    <a href={url} class="btn btn-sm btn-primary stretched-link">{title}</a>
  </div>
</div>

<style>
  .hoverable {
    transition: all 300ms;
  }
  .hoverable:hover {
    background-color: var(--bs-secondary-bg-subtle);
  }
</style>
