<script>
  // @ts-nocheck

  import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Row,
    Button,
  } from "sveltestrap";
  import consts from "../../../consts";
  import util from "../../../util";
  import { storedMemberId } from "../../MemberIdStore";
  import { onMount } from "svelte";

  export let registrations;

  const isUnregisteringPossible = (date) => {
    // 7 days in milliseconds
    const time = 604800000;

    const targetDate = new Date(date);
    const currentDate = new Date();

    targetDate.setHours(0, 0, 0, 0);

    return targetDate.getTime() - time > currentDate.getTime();
  };

  const loadExaminers = async () => {
    for (let i = 0; i < registrations.length; i++) {
      const examPlanId = registrations[i].exam_plan_id;

      const request = await fetch(
        consts.API_URL + "/planned-exams/" + examPlanId + "/examiners",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = await request.json();
      let examiners = "";

      response.forEach((examiner) => {
        if (examiners.length != 0) {
          examiners += ", ";
        }

        examiners += examiner.name + " " + examiner.last_name;
      });

      registrations[i].examiners = examiners;
    }
  };

  let examinersPromise;

  onMount(() => {
    examinersPromise = loadExaminers();
  });
</script>

<div class="accordion my-4" id="registrationsList">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#regList"
        aria-expanded="false"
        aria-controls="regList"
      >
        <b>Angemeldete Prüfungen</b>
      </button>
    </h2>
    <div
      id="regList"
      class="accordion-collapse collapse"
      data-bs-parent="#registrationsList"
    >
      <div class="accordion-body">
        {#await examinersPromise}
          <div class="col-12 text-center">
            <div class="spinner-border text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        {:then}
          {#if registrations.length == 0}
            <b>Sie sind aktuell für keine Prüfung angemeldet.</b>
          {/if}

          {#each registrations as reg, index (index)}
            <Card class={index != 0 ? "mt-3" : ""}>
              <CardHeader>
                <CardTitle>
                  {reg.module_name} - {consts.getExamTypeName(reg.type)}
                </CardTitle>
              </CardHeader>

              <CardBody>
                <Row cols={{ lg: 2, sm: 2, xs: 1 }}>
                  <Col>
                    <Row cols={{ lg: 2, xs: 1 }}>
                      <Col><b>Datum</b></Col>
                      <Col>{util.formatDate(new Date(reg.date))}</Col>
                      <Col><b>Prüfungsart</b></Col>
                      <Col>{consts.getExamTypeName(reg.type)}</Col>
                      {#if reg.type != "TASKS"}
                        <Col><b>Leistungspunkte</b></Col>
                        <Col>{reg.credits}</Col>
                      {/if}
                      <Col><b>Status</b></Col>
                      <Col>
                        {util.getNameByRegistrationState(reg.status)}
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row cols={{ lg: 2, xs: 1 }}>
                      <Col><b>Semester der Leistung</b></Col>
                      <Col>{reg.name}</Col>
                      <Col><b>Prüfer</b></Col>
                      <Col>{reg.examiners}</Col>
                    </Row>
                  </Col>
                </Row>

                {#if isUnregisteringPossible(reg.date)}
                  <form
                    action="?/unregister"
                    method="POST"
                    class="d-flex justify-content-center mt-3"
                  >
                    <input hidden name="member" value={storedMemberId} />
                    <input hidden name="plan_id" value={reg.exam_plan_id} />

                    <Button color="danger" class="px-3 col-12 col-md-4">
                      Abmelden
                    </Button>
                  </form>
                {:else}
                  <div
                    class="d-flex justify-content-start mt-3 text-danger fw-bold"
                  >
                    Eine Abmeldung ist nicht mehr möglich, da die Prüfung in
                    weniger als 7 Tagen stattfindet.
                  </div>
                {/if}
              </CardBody>
            </Card>
          {/each}
        {/await}
      </div>
    </div>
  </div>
</div>
