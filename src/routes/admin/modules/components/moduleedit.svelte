<script>
  import consts from "../../../../consts";
  import Exam from "./exam.svelte";
  import Moduletype from "./moduletype.svelte";

  /**
   * @type {any}
   */
  export let id;
  export let name = "";
  export let credits = "";

  const loadExamsForModule = async () => {
    const examsReq = await fetch(consts.API_URL + "/modules/" + id + "/exams", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const examsRes = await examsReq.json();
    return examsRes;
  };

  const loadCourseTypes = async () => {
    const courseTypesReq = await fetch(
      consts.API_URL + "/modules/" + id + "/course-types",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const courseTypesRes = await courseTypesReq.json();
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(courseTypesRes);
    return courseTypesRes;
  };

  const loadDataForModule = async () => {
    const examsData = await loadExamsForModule();
    const courseTypes = await loadCourseTypes();

    examCount = examsData.length;

    return {
      exams: examsData,
      courseTypes: courseTypes,
    };
  };

  //let courseTypesPromise = loadCourseTypes();
  //let examsPromise = loadExamsForModule();
  let dataPromise = loadDataForModule();

  let examCount = 1;

  const addExam = () => {
    examCount = examCount + 1;
  };

  const removeExam = () => {
    examCount = examCount - 1;
  };
</script>

{#await dataPromise}
  <div class="col-12 text-center">
    <div class="spinner-border text-secondary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
{:then data}
  <div class="col-12">
    <label for="modulename" class="form-label">Modul-Name</label>
    <input
      name="modulename"
      type="text"
      class="form-control"
      id="modulename"
      placeholder="XYZ"
      required
      value={name ?? ""}
    />
  </div>
  <div class="col-sm-6">
    <label for="moduleId" class="form-label">Modul-ID</label>
    <input
      name="moduleid"
      type="number"
      class="form-control"
      id="moduleId"
      placeholder="012345"
      readonly
      min="100000"
      max="999999"
      value={id ?? 0}
    />
  </div>
  <div class="col-sm-6">
    <label for="credits" class="form-label">Credits</label>
    <input
      name="credits"
      type="number"
      class="form-control"
      id="credits"
      placeholder="3"
      required
      min="1"
      max="99"
      value={credits ?? 0}
    />
  </div>

  <div class="col-12 fs-5 mt-5">Modulprüfungen</div>
  {#each Array(examCount) as _, index (index)}
    {#if index + 1 == examCount && examCount > 1}
      <Exam
        id={index + 1}
        last={true}
        on:click={removeExam}
        selected={data.exams[index]?.type ?? "WRITTEN"}
      />
    {:else}
      <Exam id={index + 1} selected={data.exams[index]?.type ?? "WRITTEN"} />
    {/if}
  {/each}
  {#if examCount > 0}
    <div class="col-12">
      <button on:click={addExam} type="button" class="btn btn-success btn-sm"
        >Weitere Prüfung hinzufügen</button
      >
    </div>
  {/if}

  <div class="col-12 fs-5 mt-5">Typ des Moduls für verschiedene Kurse</div>
  {#each consts.courses as c}
    {#each data.courseTypes as ct}
      {#if ct.course_id == c.id}
        <Moduletype
          name={c.name}
          short={c.shortName}
          selected={ct.type}
          plannedSemester={ct.planned_semester}
        />
      {/if}
    {/each}
  {/each}

  <div class="col-sm-4">
    <button class="btn btn-success" name="action" value="save"
      >Modul speichern</button
    >
    <button class="btn btn-danger" name="action" value="delete"
      >Modul löschen</button
    >
  </div>
{/await}

<style>
  .form-control:read-only {
    background-color: #e9ecef;
  }
</style>
