<script>
  // @ts-nocheck

  import ModuleCard from "./moduleCard.svelte";
  import consts from "../../../consts";
  import { Accordion, AccordionItem, Badge } from "sveltestrap";
  import util from "../../../util";
  import { createEventDispatcher, onMount } from "svelte";
  /**
   * @type {any}
   */
  export let id;
  export let name = "";
  export let credits = 0;

  export let examRegistrations;
  export let results;

  let exams = [];
  let plannedExams = [];

  const dispatch = createEventDispatcher();

  const sendFinished = () => {
    dispatch("finish", {
      state: true,
      id: id,
    });
  };

  const loadExamsForModule = async () => {
    const examsReq = await fetch(consts.API_URL + "/modules/" + id + "/exams", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const examsRes = await examsReq.json();
    exams = examsRes;

    for (let i = 0; i < exams.length; i++) {
      const exam = exams[i];
      const planned = await loadPlannedExams(exam.id);
      planned.forEach((plannedExam) => {
        plannedExams[plannedExam.exam_id] = plannedExam;
      });
    }

    sendFinished();
    return examsRes;
  };

  const loadPlannedExams = async (examId) => {
    const plannedExamsReq = await fetch(
      consts.API_URL + "/exams/" + examId + "/planned-exams",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await plannedExamsReq.json();

    for (let i = 0; i < res.length; i++) {
      const pe = res[i];

      const examinersReq = await fetch(
        consts.API_URL + "/planned-exams/" + pe.uid + "/examiners",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const examinersRes = await examinersReq.json();
      let examiners = "";

      examinersRes.forEach((ex) => {
        if (examiners.length != 0) {
          examiners += ", ";
        }

        examiners += ex.name + " " + ex.last_name;
      });

      res[i].examiners = examiners;
    }

    return res;
  };

  let examsPromise;

  onMount(() => {
    examsPromise = loadExamsForModule();
  });
</script>

{#await examsPromise}
  <div class="col-12 text-center">Loading..</div>
{:then}
  <div class="accordion" id={"accordion" + id}>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#collapse" + id}
          aria-expanded="false"
          aria-controls={"collapse" + id}
        >
          <div class="row w-100 g-2 g-md-0">
            <div class="col-12 col-md-4 pe-3 text-wrap fw-bold">{name}</div>
            <div class="w-100 d-block d-md-none"></div>
            <div class="col">
              <b>ID:</b>
              {id}
            </div>
            <div class="col">
              {#each exams as exam}
                <span
                  class={"badge me-2 text-" + util.getExamColorBadge(exam.type)}
                >
                  {util.getExamShortNameByType(exam.type)}</span
                >
              {/each}
            </div>
          </div>
        </button>
      </h2>

      <div
        id={"collapse" + id}
        class="accordion-collapse collapse"
        data-bs-parent={"#accordion" + id}
      >
        <div class="accordion-body">
          {#each exams as exam}
            <ModuleCard
              type={exam.type}
              {credits}
              plannedExam={plannedExams[exam.id]}
              registration={examRegistrations[exam.id]
                ? examRegistrations[exam.id]
                : null}
              lastResult={results[exam.id] ? results[exam.id] : null}
            />
          {/each}
        </div>
      </div>
    </div>
  </div>

  <br />
{/await}

<style>
  b {
    white-space: nowrap;
    line-height: 1em;
    max-height: 2em;
  }
  span {
    display: inline-flex;
  }

  .accordion {
    font-size: inherit;
  }
</style>
