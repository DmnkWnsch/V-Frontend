<script>
    import {
        Container,
        Row,
        Col,
        Button
        } from 'sveltestrap';
</script>

<Container fluid class="my-3 bg-light border border-dark rounded">
  <Row class="bg_grey_1 py-2">
		<Col >
			<h5><b>Prüfungsvvorleistung: </b>Aufgabenkomplexe</h5>
		</Col>
	</Row>
  <Row cols={2} class="py-1">
    <Col sm={{ size: 10 , offset: 0 }} >
      <Row cols={2}>
        <Col>
          <Row cols={2}>
            <Col>
              <p><b>Bewertung:</b></p>
            </Col>
            <Col>
              <p>bestanden</p>
            </Col>
            <Col>
              <p><b>Leistungspunkte:</b></p>
            </Col>
            <Col>
              <p>3</p>
            </Col>
            <Col>
              <p><b>Datum:</b></p>
            </Col>
            <Col>
              <p>Wintersemester 2023</p>
            </Col>
            <Col>
              <p><b>Prügungsart:</b></p>
            </Col>
            <Col>
              <p>Abgabe von Übungsaufgaben</p>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row cols={2}>
        <Col>
          <p><b>Semester der Leistung:</b></p>
        </Col>
        <Col>
          <p>Wintersemester 2022</p>
        </Col>
        <Col>
          <p><b>Prüfer:</b></p>
        </Col>
        <Col>
          <p>Max Mustermann, Hermann Mann, Christian Franz</p>
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
</Container>