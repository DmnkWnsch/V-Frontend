<script>
  /**
   * @type {any}
   */
  export let name;
  export let short;
  export let selected = "BASE";
  /**
   * @type {any}
   */
  export let plannedSemester = 0;
  let id = "moduletype_" + short;
  let ps = "plannedsemester_" + short;
</script>

<div class="col-sm-4 d-flex align-items-center">
  <span class="fw-bold">{name}</span>
</div>
<div class="col-sm-4">
  <label for={id} class="form-label">Modulart</label>
  <select bind:value={selected} name={id} class="form-select" {id}>
    <option value="BASE">Basismodul</option>
    <option value="FIELD_MODULE">Schwerpunktmodul</option>
    <option value="OPTIONAL">Wahlpflichtmodul</option>
    <option value="ADDITIONAL">Ergänzungsmodul</option>
    <option value="KEY_COMPETENCE">Schlüsselkompetenz</option>
  </select>
</div>
<div class="col-sm-4">
  <label for={ps} class="form-label">Geplantes Semester</label>
  <input
    required
    name={ps}
    type="number"
    class="form-control"
    id={ps}
    placeholder="1-6"
    min="1"
    max="6"
    value={plannedSemester > 0 ? plannedSemester : ""}
  />
</div>
