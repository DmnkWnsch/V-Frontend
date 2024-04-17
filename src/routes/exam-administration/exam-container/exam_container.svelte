<script>
  // @ts-nocheck

  // import sveltestrap components
  import {
    Accordion,
    AccordionItem,
    Container,
    Row,
    Col,
    Button,
    Badge,
  } from "sveltestrap";

  // import custom components
  import Sub_exam_container from "./sub-exam-container/sub_exam_container.svelte";
  import util from "../../../util";

  export let active;
  active = active == "true" ? "active" : "";
  export let data;
</script>

<div class="accordion" id={"result" + data.id}>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={"#collapse" + data.id}
        aria-expanded="false"
        aria-controls={"collapse" + data.id}
      >
        <div class="row w-100 g-2 g-md-0">
          <div class="col-12 col-md-4 pe-3 text-wrap fw-bold">{data.name}</div>
          <div class="w-100 d-block d-md-none"></div>
          <div class="col">
            <b>ID:</b>
            {data.id}
          </div>
          <div class="col">
            <b>LP:</b>
            {data.points}
          </div>
          <div class="w-100 d-block d-md-none"></div>
          <div class="col">
            {#each data.tags as exam}
              <span class={"badge me-2 text-" + util.getExamColorBadge(exam)}>
                {util.getExamShortNameByType(exam)}</span
              >
            {/each}
          </div>
        </div>
      </button>
    </h2>

    <div
      id={"collapse" + data.id}
      class="accordion-collapse collapse"
      data-bs-parent={"result" + data.id}
    >
      <div class="accordion-body">
        {#each data["sub_exams"] as value, index (index)}
          <div class={index != 0 ? "mt-3" : ""}>
            <svelte:component this={Sub_exam_container} data={value} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  @import "./style.css";
</style>
