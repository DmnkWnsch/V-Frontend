<script>
  /**
   * @type {any}
   */
  export let periodName;
  /**
   * @type {any}
   */
  export let startDate;
  /**
   * @type {any}
   */
  export let endDate;

  /**
   * @type {any}
   */
  export let id;

  /**
   * @type {any}
   */
  export let index;

  let editable = false;

  const changeEditable = () => {
    editable = !editable;
  };

  const formatDate = (/** @type {Date} */ date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const monthString = month < 10 ? "0" + month : month;
    const dayString = day < 10 ? "0" + day : day;
    return `${year}-${monthString}-${dayString}`;
  };

  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);

  const currentDate = Date.now();
  const activePeriod =
    startDateObject.getTime() <= currentDate &&
    currentDate < endDateObject.getTime();
</script>

<div class={index == 0 ? "card" : "card mt-3"}>
  <div class="card-body">
    <h5 class="card-title">
      {#if activePeriod}
        <span class="badge bg-success">Aktiv</span>
      {/if}
      {periodName}
    </h5>
    <div class="row">
      <div class="col d-flex align-items-center">
        <span>
          <b>Beginn: </b>
          {startDateObject.toLocaleDateString("de-DE")}
        </span>
      </div>
      <div class="col d-flex align-items-center">
        <span>
          <b>Ende:</b>
          {endDateObject.toLocaleDateString("de-DE")}
        </span>
      </div>
      <div class="col">
        {#if !editable}
          <button
            on:click={changeEditable}
            class="btn btn-success"
            type="button">Bearbeiten</button
          >
        {:else}
          <button
            on:click={changeEditable}
            class="btn btn-secondary"
            type="button">Schließen</button
          >
        {/if}
      </div>
    </div>
    {#if editable}
      <form action="?/editPeriod" method="POST">
        <input name="id" value={id} hidden />
        <div class="row mt-4">
          <div class="col">
            <input
              class="date form-control"
              type="date"
              name="start_date"
              value={formatDate(startDateObject)}
            />
          </div>
          <div class="col">
            <input
              class="form-control"
              type="date"
              name="end_date"
              value={formatDate(endDateObject)}
            />
          </div>
          <div class="col">
            <button class="btn btn-success" name="action" value="save"
              >Speichern</button
            >
            <button class="btn btn-danger" name="action" value="delete"
              >Löschen</button
            >
          </div>
        </div>
      </form>
    {/if}
  </div>
</div>
