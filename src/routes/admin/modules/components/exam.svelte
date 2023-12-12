<script>
  export let id;
  let exam = "" + id;
  let divId = "exam" + id;
  let examtype = "examtype" + id;
</script>

<div class="col-sm-4 d-flex align-items-center">
  <span class="fw-bold">Prüfung {exam}</span>
</div>
<div id={divId} class="col-sm-4">
  <label for={examtype} class="form-label">Prüfungsart</label>
  <select name={examtype} class="form-select" id={examtype}>
    <option selected value="WRITTEN">schriftliche Prüfung</option>
    <option value="ORAL">mündliche Prüfung</option>
    <option value="TASKS">Prüfungsvorleistung</option>
  </select>
</div>
<div class="col-4-sm"></div>
