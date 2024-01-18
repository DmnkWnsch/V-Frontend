<script>
</script>

<div class="card mt-4">
  <div class="card-body">
    <form action="?/addPeriod" method="POST">
      <div class="row">
        <div class="col-5">
          <label for="period_name" class="form-label"
            >Name der Registrierungsperiode</label
          >
          <input
            class="form-control"
            id="period_name"
            type="text"
            name="period_name"
            required
          />
        </div>
        <div class="col-3">
          <label for="start_date" class="form-label">Startdatum</label>
          <input
            class="form-control"
            id="start_date"
            type="date"
            name="start_date"
            required
          />
        </div>
        <div class="col-3">
          <label for="end_date" class="form-label">Enddatum</label>
          <input
            class="form-control"
            id="end_date"
            type="date"
            name="end_date"
            required
          />
        </div>
        <div class="col-1 d-flex align-items-end">
          <button class="btn btn-success" name="action" value="add">+</button>
        </div>
      </div>
    </form>
  </div>
</div>
