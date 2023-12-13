<script>
  import Exam from "./exam.svelte";
  import Moduletype from "./moduletype.svelte";

  /**
   * @type {any}
   */
  export let id;

  const courses = [
    {
      id: 1,
      name: "Eingebettete Systeme",
      shortName: "embedded",
    },
    {
      id: 2,
      name: "Medieninformatik",
      shortName: "media",
    },
    {
      id: 3,
      name: "Verteilte Systeme",
      shortName: "distri",
    },
    {
      id: 4,
      name: "Computergraphik",
      shortName: "gc",
    },
  ];

  const loadExamsForModule = async () => {
    const examsReq = await fetch(
      "http://localhost:3210/modules/" + id + "/exams",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const examsRes = await examsReq.json();
    return examsRes;
  };

  const loadCourseTypes = async () => {
    const courseTypesReq = await fetch(
      "http://localhost:3210/modules/" + id + "/course-types",
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

    return {
      exams: examsData,
      courseTypes: courseTypes,
    };
  };

  //let courseTypesPromise = loadCourseTypes();
  //let examsPromise = loadExamsForModule();
  let dataPromise = loadDataForModule();
</script>

<!--{#await examsPromise then exams}
  <Exam id="1" selected={exams[0]?.type ?? ""} />
{/await}

{#await courseTypesPromise}
  <p>Loading course types..</p>
{:then courseType}
  {#each courses as c}
    {#each courseType as ct}
      {#if ct.course_id == c.id}
        <Moduletype name={c.name} short={c.shortName} selected={ct.type} />
      {/if}
    {/each}
  {/each}
{/await}-->

{#await dataPromise}
  <div class="col-12 text-center">
    <div class="spinner-border text-secondary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
{:then data}
  <Exam id="1" selected={data.exams[0]?.type ?? ""} />

  {#each courses as c}
    {#each data.courseTypes as ct}
      {#if ct.course_id == c.id}
        <Moduletype name={c.name} short={c.shortName} selected={ct.type} />
      {/if}
    {/each}
  {/each}
{/await}
