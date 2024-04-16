<script>
  // @ts-nocheck

  export let memberId;

  import consts from "../../../../consts";
  import util from "../../../../util";

  let searchInput = "";
  let targetModule = {};
  let foundExams = [];
  let loadingFinished = false;

  const searchDataForModule = async () => {
    loadingFinished = false;
    targetModule = {};

    if (searchInput?.toString().trim().length != 6) {
      return (foundExams = []);
    }

    const moduleRequest = await fetch(
      consts.API_URL + "/modules/" + searchInput,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (moduleRequest.status == 200) {
      const moduleResponse = await moduleRequest.json();
      console.log(moduleResponse);

      if (moduleResponse.length == 0) {
        loadingFinished = true;
        return (targetModule = { error: true });
      }

      targetModule = moduleResponse[0];
      const examsRequest = await fetch(
        consts.API_URL + "/modules/" + searchInput + "/exams",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const examsResponse = await examsRequest.json();

      if (examsResponse.length == 0) {
        loadingFinished = true;
        return (foundExams = []);
      }

      let plannedExams = [];
      for (const exam of examsResponse) {
        const plannedExamRequest = await fetch(
          consts.API_URL + "/exams/" + exam.id + "/planned-exams",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (plannedExamRequest.status == 200) {
          const plannedExamResponse = await plannedExamRequest.json();
          for (const pExam of plannedExamResponse) {
            pExam.type = exam.type;
            plannedExams.push(pExam);
          }
        }
      }

      console.log(plannedExams);
      loadingFinished = true;
      return (foundExams = plannedExams);
    }

    return (foundExams = []);
  };
</script>

<div class="card">
  <div class="card-body">
    <form action="?/addRegistration" method="POST" class="row g-3">
      <input hidden name="id" value={memberId} />
      <div class="col-4">
        <label class="form-label" for="regsearch"
          >Geplante Prüfungen für Modul-ID suchen</label
        >
        <input
          class="form-control"
          required
          name="regsearch"
          id="regsearch"
          placeholder="200002"
          type="number"
          bind:value={searchInput}
          on:input={searchDataForModule}
        />
      </div>

      {#if targetModule.name}
        {#if loadingFinished}
          {#if foundExams.length > 0}
            <div class="col-12">
              Geplante Prüfung für <b>{targetModule.name}</b> auswählen
            </div>
            <div class="col-8">
              <select name="planned_exam" id="planned_exam" class="form-select">
                {#each foundExams as exam}
                  {console.log(exam)}
                  <option value={exam.uid}
                    ><b
                      >{consts.getExamTypeName(exam.type)} - {exam.name} - {util.formatDate(
                        new Date(exam.date)
                      )}</b
                    ></option
                  >
                {/each}
              </select>
            </div>
            <div class="col-4">
              <select name="status" id="status" class="form-select">
                <option value="ALLOWED">Zugelassen</option>
                <option value="CONDITIONAL">Unter Vorbehalt</option>
              </select>
            </div>
            <div class="col-4">
              <button class="btn btn-success" type="submit"
                >Anmeldung speichern</button
              >
            </div>
          {:else}
            <div class="col-12">
              Für das Modul <b>{targetModule.name}</b> sind derzeit keine Prüfungen
              geplant.
            </div>
          {/if}
        {/if}
      {:else if targetModule.error}
        <div class="col-12">
          <b>Fehler:</b> Das Modul <b>{searchInput}</b> existiert nicht.
        </div>
      {:else if searchInput?.toString().length != 6}<div class="col-12">
          Bitte eine 6-stellige Modul-ID eingeben.
        </div>{/if}
    </form>
  </div>
</div>
