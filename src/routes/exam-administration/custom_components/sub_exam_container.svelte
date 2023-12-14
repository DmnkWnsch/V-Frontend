<script>
  // import sveltestrap components
    import {
        Container,
        Card,
        CardBody,
        CardHeader,
        CardTitle,
        Row,
        Col,
        Button
        } from 'sveltestrap';

    export let data;
</script>

<Card>
  <CardHeader>
    <CardTitle><b>{data["type"]}: </b>{data["name"]}</CardTitle>
  </CardHeader>
  <CardBody>
    <Row cols={2} class="py-1">
      <Col sm={{ size: 10 , offset: 0 }} >
        <Row cols={2}>
          <Col>
            <Row cols={2}>
              <Col>
                <b>Bewertung:</b>
              </Col>
              <Col>
                {data["result"]}
              </Col>
              <Col>
                <b>Leistungspunkte:</b>
              </Col>
              <Col>
                {data["points"]}
              </Col>
              <Col>
                <b>Datum:</b>
              </Col>
              <Col>
                {data["date"]}
              </Col>
              <Col>
                <b>Prügungsart:</b>
              </Col>
              <Col>
                {data["exam_content"]}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row cols={2}>
          <Col>
            <b>Semester der Leistung:</b>
          </Col>
          <Col>
            {data["semester"]}
          </Col>
          <Col>
            <p><b>Prüfer:</b></p>
          </Col>
          <Col>
            {data["examiners"]}
          </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col sm={{ size: 2 , offset: 0 }} >
        <Container class="h-100 d-flex justify-content-center align-items-center">
          <Button class="bg-success border border-0">Wiederholen</Button>
        </Container>
      </Col>
    </Row>
  </CardBody>
</Card>
<br/>