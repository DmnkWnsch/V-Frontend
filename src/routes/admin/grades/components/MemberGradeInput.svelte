<script>
  export let id;
  export let last = false;

  let studentIdElementName = "studentid_" + id;
  let gradeElementName = "grade_" + id;

  const element = document.getElementById(studentIdElementName);
  element?.scrollIntoView({
    behavior: "smooth",
  });
</script>

<div class="col-md-4">
  <label class="form-label" for={studentIdElementName}>Matrikelnummer</label>
  <input
    type="number"
    class="form-control"
    id={studentIdElementName}
    name={studentIdElementName}
    placeholder="123456"
    min="100000"
    max="999999"
    required
  />
</div>
<div class="col-md-4">
  <label class="form-label" for={gradeElementName}>Note</label>
  <input
    type="number"
    class="form-control"
    id={gradeElementName}
    name={gradeElementName}
    placeholder="1.7"
    step=".1"
    required
  />
</div>
<div class="col-md-4 d-flex align-items-end">
  {#if last}
    <button type="button" class="btn btn-danger" on:click>Entfernen</button>
  {/if}
</div>
