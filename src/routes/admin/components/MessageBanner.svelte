<script>
  export let type;

  const standardClasses = "alert";
  const successClasses = standardClasses + " alert-success";
  const errorClasses = standardClasses + " alert-danger";
</script>

<div class={type === "success" ? successClasses : errorClasses}>
  {#if type !== "success"}
    <b>Es ist ein Fehler aufgetreten!</b><br />
  {/if}
  <slot />
</div>
