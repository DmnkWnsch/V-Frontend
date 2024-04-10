<script>
  // @ts-nocheck

  import consts from "../../../../consts";
  import util from "../../../../util";

  export let memberId;
  let registrations;
  let loadingFinished = false;

  const loadRegistrations = async (memberId) => {
    loadingFinished = false;
    const request = await fetch(
      consts.API_URL + "/members/" + memberId + "/registrations",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await request.json();
    loadingFinished = true;
    return (registrations = response.data);
  };

  let editStateOpenIndex = -1;
  const changeEditStateOpen = (index) => {
    if (editStateOpenIndex == index) {
      editStateOpenIndex = -1;
    } else {
      editStateOpenIndex = index;
    }
  };

  $: loadRegistrations(memberId);
</script>

<div class="col-12">
  {#if loadingFinished && registrations == 0}
    Für diesen Student liegen keine Prüfungsanmeldungen vor.
  {/if}

  {#if loadingFinished && registrations.length > 0}
    <div class="accordion" id="regsAccordion">
      {#each registrations as reg, index (index)}
        <div class="accordion-item">
          <form action="?/manageRegistration" method="POST">
            <input hidden name="id" value={memberId} />
            <input hidden name="exam_plan_id" value={reg.exam_plan_id} />
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#collapse" + index}
                aria-expanded="false"
                aria-controls={"collapse" + index}
              >
                <div class="col">
                  <b>{reg.module_id}</b>
                </div>
                <div class="col">
                  <b>{consts.getExamTypeName(reg.type)}</b>
                </div>
                <div class="col">
                  <h5 class="mb-0">
                    <span
                      class={"badge text-" +
                        util.getColorByRegistrationState(reg.status)}
                      >{util.getNameByRegistrationState(reg.status)}</span
                    >
                  </h5>
                </div>
              </button>
            </h2>
            <div
              id={"collapse" + index}
              class="accordion-collapse collapse"
              data-bs-parent="#regsAccordion"
            >
              <div class="accordion-body row">
                <div class="col-4"><b>Prüfungsdatum</b></div>
                <div class="col-4">
                  {util.formatDate(new Date(reg.date))}
                </div>
                <div class="col-4"></div>

                <div class="col-4"><b>Prüfungsart</b></div>
                <div class="col-4">
                  {consts.getExamTypeName(reg.type)}
                </div>
                <div class="col-4"></div>

                <div class="col-4"><b>Status</b></div>
                <div class="col-4">
                  {util.getNameByRegistrationState(reg.status)}
                </div>
                <div class="col-4"></div>

                <div class="col-4"><b>Semester</b></div>
                <div class="col-4">
                  {reg.name}
                </div>
                <div class="col-4"></div>

                <div class="col-12 mt-3">
                  <button
                    class="btn btn-success"
                    type="button"
                    on:click={changeEditStateOpen(index)}
                    >Status bearbeiten</button
                  >
                  <button class="btn btn-danger" name="action" value="delete"
                    >Anmeldung löschen</button
                  >
                </div>
                {#if editStateOpenIndex == index}
                  <div class="row mt-4 d-flex align-items-center">
                    <div class="col-4"><b>Neuer Status</b></div>
                    <div class="col-4">
                      <select
                        name="new_state"
                        id="new_state"
                        class="form-select"
                      >
                        <option value="ALLOWED">Zugelassen</option>
                        <option value="CONDITIONAL">Unter Vorbehalt</option>
                      </select>
                    </div>
                    <div class="col-4">
                      <button
                        class="btn btn-success"
                        type="submit"
                        name="action"
                        value="change_state">Speichern</button
                      >
                    </div>
                  </div>
                {/if}
              </div>
            </div>
          </form>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .accordion-button.collapsed:hover {
    background-color: rgba(var(--bs-secondary-bg-rgb), 1);
  }

  .accordion-button:not(.collapsed) {
    background-color: rgba(var(--bs-secondary-bg-rgb), 1);
  }

  .accordion-button:focus {
    box-shadow: none;
  }
</style>
