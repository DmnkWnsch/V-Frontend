<script>
  // @ts-nocheck

  import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Container,
    Row,
  } from "sveltestrap";
  import util from "../../../util";
  import consts from "../../../consts";
  import { storedMemberId } from "../../MemberIdStore";

  export let type;
  export let credits;
  export let plannedExam;
  export let registration;
  export let lastResult;

  const isRegistrationPossible = () => {
    let periodStart = new Date(plannedExam.start_date);
    let periodEnd = new Date(plannedExam.end_date);

    periodStart.setHours(0, 0, 0, 0);
    periodEnd.setHours(23, 59, 59, 0);

    const currentDate = new Date();

    return (
      periodStart.getTime() <= currentDate.getTime() &&
      periodEnd.getTime() >= currentDate.getTime()
    );
  };
</script>

<Card>
  <CardHeader>
    <CardTitle>{consts.getExamTypeName(type)}</CardTitle>
  </CardHeader>
  <CardBody>
    {#if lastResult?.status == "PASSED"}
      <div class="fw-bold text-success">
        Sie haben diese Prüfung bereits im {lastResult?.term} bestanden.
      </div>
    {:else}
      {#if !plannedExam}
        <div class="mb-3">
          <b class="text-danger">Achtung:</b> Für diese Prüfung liegt aktuell kein
          Termin vor. Eine Anmeldung ist daher nicht möglich.
        </div>
      {:else}
        <Row cols={{ lg: 2, sm: 2, xs: 1 }}>
          <Col>
            <Row cols={{ lg: 2, xs: 1 }}>
              <Col><f>Datum</f></Col>
              <Col>{util.formatDate(new Date(plannedExam.date))}</Col>
              <Col><f>Prüfungsart</f></Col>
              <Col>{consts.getExamTypeName(type)}</Col>
              {#if type != "TASKS"}
                <Col><f>Leistungspunkte</f></Col>
                <Col>{credits}</Col>
              {/if}
              <Col><f>Status</f></Col>
              <Col>
                {#if registration}
                  {util.getNameByRegistrationState(registration.status)}
                {:else}
                  nicht angemeldet
                {/if}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row cols={{ lg: 2, xs: 1 }}>
              <Col><f>Semester der Leistung</f></Col>
              <Col>{plannedExam.name}</Col>
              <Col><f>Prüfer</f></Col>
              <Col>
                {#if plannedExam.examiners}
                  {plannedExam.examiners}
                {:else}
                  -
                {/if}
              </Col>
              <Col>
                <f>Anmeldezeitraum</f>
              </Col>
              <Col>
                {util.formatDate(new Date(plannedExam.start_date)) +
                  " - " +
                  util.formatDate(new Date(plannedExam.end_date))}
              </Col>
            </Row>
          </Col>
        </Row>
        {#if !isRegistrationPossible()}
          <div class="my-3">
            <b class="text-danger">Achtung:</b> Aktuell läuft keine Anmeldeperiode.
          </div>
        {/if}
      {/if}
      {#if registration}
        <div class="d-flex justify-content-start mt-3 text-success fw-bold">
          Sie sind für diese Prüfung angemeldet.
        </div>
      {:else}
        <form
          action="?/register"
          method="POST"
          class="d-flex justify-content-center mt-3"
        >
          <input hidden name="member" value={storedMemberId} />
          <input hidden name="plan_id" value={plannedExam?.uid} />
          <Button
            color={plannedExam && isRegistrationPossible()
              ? "success"
              : "secondary"}
            class="px-3 col-12 col-md-4"
            disabled={!plannedExam || !isRegistrationPossible()}
            >Anmelden</Button
          >
        </form>
      {/if}
    {/if}
  </CardBody>
</Card>
<br />

<style>
  f {
    font-weight: bold;
  }
</style>
