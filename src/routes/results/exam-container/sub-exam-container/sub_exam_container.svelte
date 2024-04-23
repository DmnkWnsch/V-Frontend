<script>
  // @ts-nocheck

  // import sveltestrap components
  import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
  } from "sveltestrap";
  import util from "../../../../util";
  import consts from "../../../../consts";

  export let data;
</script>

<Card>
  <CardHeader>
    <CardTitle
      >{consts.getExamTypeName(data.type)}

      <span class={"badge text-bg-" + (data.result < 5 ? "success" : "danger")}>
        {#if data.result < 5}
          Bestanden
        {:else}
          Nicht bestanden
        {/if}
      </span>
    </CardTitle>
  </CardHeader>
  <CardBody>
    <Row cols={{ lg: 2, sm: 2, xs: 1 }}>
      <Col>
        <Row cols={{ lg: 2, xs: 1 }}>
          <Col><b>Prüfungsart</b></Col>
          <Col>{data.exam_content}</Col>

          <Col><b>Bewertung</b></Col>
          <Col>{data.result}</Col>

          <Col><b>Versuch</b></Col>
          <Col>{data.try}</Col>

          <Col><b>Status</b></Col>
          <Col>
            {#if data.result < 5}
              Bestanden
            {:else}
              Nicht bestanden
            {/if}</Col
          >
        </Row>
      </Col>
      <Col>
        <Row cols={{ lg: 2, xs: 1 }}>
          <Col><b>Semester der Leistung</b></Col>
          <Col>{data.semester}</Col>

          {#if data.type != "TASKS"}
            <Col><b>Erhaltene Leistungspunkte</b></Col>
            <Col>
              {data.result < 5 ? data.points : 0}
            </Col>
          {/if}
        </Row>
      </Col>
    </Row>
  </CardBody>
</Card>
