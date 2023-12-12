<script>
  /**
   * @type {any}
   */
  export let name;
  export let short;
  let id = "moduletype_" + short;
  let ps = "plannedsemester_" + short;
</script>

<div class="col-sm-4 d-flex align-items-center">
  <span class="fw-bold">{name}</span>
</div>
<div class="col-sm-4">
  <label for={id} class="form-label">Modulart</label>
  <select name={id} class="form-select" {id}>
    <option selected value="BASE">Basismodul</option>
    <option value="OPTIONAL">Wahlpflichtmodul</option>
    <option value="ADDITIONAL">Ergänzungsmodul</option>
  </select>
</div>
<div class="col-sm-4">
  <label for={ps} class="form-label">Geplantes Semester</label>
  <input name={ps} type="text" class="form-control" id={ps} placeholder="1-6" />
</div>
