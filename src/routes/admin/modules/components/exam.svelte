<script>
  export let id;
  export let selected = "WRITTEN";
  export let last = false;
  let exam = "" + id;
  let divId = "exam" + id;
  let examtype = "examtype" + id;
</script>

<div class="col-sm-4 d-flex align-items-center">
  <span class="fw-bold">Prüfung {exam}</span>
</div>
<div id={divId} class="col-sm-4">
  <label for={examtype} class="form-label">Prüfungsart</label>
  <select
    bind:value={selected}
    name={examtype}
    class="form-select"
    id={examtype}
  >
    <option value="WRITTEN">schriftliche Prüfung</option>
    <option value="ORAL">mündliche Prüfung</option>
    <option value="TASKS">Prüfungsvorleistung</option>
  </select>
</div>
<div class="col-sm-4 d-flex align-items-end">
  {#if last}
    <button type="button" class="btn btn-danger" on:click>Entfernen</button>
  {/if}
</div>
