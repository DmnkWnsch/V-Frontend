<script lang="ts">
// @ts-nocheck
	import {Accordion,AccordionItem,Badge,Button,Card,CardBody,CardHeader,CardTitle,Col,Container,FormCheck,FormGroup,Input,InputGroup,Row} from 'sveltestrap'
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
	<Accordion>
		<AccordionItem header="Angemeldete Prüfungen">
			<Card>
				<CardHeader>
					<CardTitle>Datenbanken Grundlagen</CardTitle>
				</CardHeader>
				<CardBody>
					<Row> 
						<Col>
							<Row cols={{lg:2,md:4,sm:1}}>
								<Col><f>Datum</f></Col>
								<Col>17.02.2023</Col>
								<Col><f>Prüfungsart</f></Col>
								<Col>Schriftlich</Col>
								<Col><f>Leistungspunkte</f></Col>
								<Col>5</Col>
								<Col><f>Status</f></Col>
								<Col>zugelassen (unter Vorbehalt)</Col>
							</Row>
						</Col>
						<Col>
							<Row cols={{lg:2,md:2,sm:5}}>
								<Col><f>semester der Leistung</f></Col>
								<Col>Wintersemester 2022</Col>
								<Col><f>Prüfer</f></Col>
								<Col>Max Mustermann</Col>
							</Row>
						</Col>
						<Col xs="auto"> 
							<Container class="h-100 d-flex justify-content-center align-items-center">
								<Button color='danger'>Abmelden</Button>
							</Container>
						</Col>
					</Row>
				</CardBody>
			</Card>
	
		</AccordionItem>
	</Accordion>
	<br/>

	<Row>
		<Col>
			<h1>Anmelden zu einer Prüfung</h1>
		</Col>
		<Col>
			<InputGroup>
				<Input placeholder="Prüfung finden"/>
				<Button>Suchen</Button>
			</InputGroup>
		</Col>
		<Col xs="auto">
			<div><Button light color='info'>Filter</Button></div>
		</Col>
	</Row>

	<Container style="background-color: #f6f6f6">
		Filter

		<hr class="my-2"/>
		<Row>
			<Col xs=6>	
				<Row cols={{lg:2,md:3,sm:0}}>
					<Col><h2>Anwendungsschwerpunkt</h2></Col>
					<Col>
						<FormGroup>
							<Input type="select" name="select" id="exampleSelect">
							<option>Eingebette Systeme</option>
							<option>Medieninformatik</option>
							<option>Verteilte Systeme</option>
							<option>Computergraphik/Virtuelle Realität</option>
							</Input>
						</FormGroup>
					</Col>
					<Col><h2>Modulart</h2></Col>
					<Col>
						<FormGroup>
							<Input type="select" name="select" id="exampleSelect">
							<option>Basismodule</option>
							<option>Pflichtmodule</option>
							<option>Wahlpflichtmodule</option>
							<option>Ergänzungsmodule</option>
							<option>Schlüsselkompetenzen</option>
							</Input>
						</FormGroup>
					</Col>
					<Col><h2>Semester</h2></Col>
					<Col>
						<FormGroup>
							<Input type="select" name="select" id="exampleSelect">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
							<option>6</option>
							</Input>
						</FormGroup>
					</Col>
				</Row>
			</Col>
			<Col xs=1/>
			<Col xs="auto">
				<FormGroup check>
					<FormCheck type="checkbox" required label>
						<p slot="label">
							Bestandene Prüfungen ausblenden
						</p>
					</FormCheck>
				</FormGroup>
			</Col>
		</Row>
	</Container>
	<br/>
	<Accordion>
		<AccordionItem>
			<h2 slot="header">
				<div class="d-flex justify-content-end">
					<b>Mathematik III</b>
					<span class="mx-5">
						<b>ID: </b>200003
					</span>
					<span>
						<b>Leistungspunkte: </b>9
					</span>
					<span class="mx-5">
						<Badge color="primary">schriftlich</Badge>
					</span>	
					<span class="mx-5">
						<Badge color="warning">PVL</Badge>
					</span>			
				</div>
			</h2>
			<Card>
				<CardHeader>
					<CardTitle>Prüfungsvorleistung: Aufgabenkomplexe</CardTitle>
				</CardHeader>
				<CardBody>
					<Row> 
						<Col>
							<Row cols={{lg:2,md:3,sm:1}}>
								<Col><f>Anmeldezeitraum</f></Col>
								<Col>05.12.22 - 16.12.22</Col>
								<Col><f>Prüfungsart</f></Col>
								<Col>Abgabe von Übungsaufgaben</Col>
								<Col><f>Status</f></Col>
								<Col>nicht angemeldet</Col>
							</Row>
						</Col>
						<Col>
							<Row cols={{lg:2,md:2,sm:5}}>
								<Col><f>Semester der Leistung</f></Col>
								<Col>Wintersemester 2022</Col>
								<Col><f>Prüfer</f></Col>
								<Col>Max Mustermann, Hermann Mann, Christian Franz</Col>
							</Row>
						</Col>
						<Col xs="auto"> 
							<Container class="h-100 d-flex justify-content-center align-items-center">
								<Button color='success'>Anmelden</Button>
							</Container>
						</Col>
					</Row>
				</CardBody>
			</Card>
			<br/>
			<Card>
				<CardHeader>
					<CardTitle>Schriftliche Prüfung</CardTitle>
				</CardHeader>
				<CardBody>
					<Row> 
						<Col>
							<Row cols={{lg:2,md:4,sm:1}}>
								<Col><f>Datum</f></Col>
								<Col>07.02.2023</Col>
								<Col><f>Prüfungsart</f></Col>
								<Col>schriftlich</Col>
								<Col><f>Leistungspunkte</f></Col>
								<Col>9</Col>
								<Col><f>Status</f></Col>
								<Col>nicht angemeldet</Col>
							</Row>
						</Col>
						<Col>
							<Row cols={{lg:2,md:2,sm:5}}>
								<Col><f>Semester der Leistung</f></Col>
								<Col>Wintersemester 2022</Col>
								<Col><f>Prüfer</f></Col>
								<Col>Max Mustermann, Hermann Mann, Christian Franz</Col>
							</Row>
						</Col>
						<Col xs="auto"> 
							<Container class="h-100 d-flex justify-content-center align-items-center">
								<Button color='success'>Anmelden</Button>
							</Container>
						</Col>
					</Row>
				</CardBody>
			</Card>	
		</AccordionItem>
	</Accordion>
	<br/>
	<Accordion>
		<AccordionItem>
			<h2 slot="header">
				<div class="d-flex justify-content-end">
					<b>Theoretische Informatik I</b>
					<span class="mx-5">
						<b>ID: </b>500210
					</span>
					<span>
						<b>Leistungspunkte: </b>8
					</span>
					<span class="mx-5">
						<Badge color="info">mündlich</Badge>
					</span>	
					<span class="mx-5">
						<Badge color="warning">PVL</Badge>
					</span>			
				</div>
			</h2>
			<Card>
				<CardHeader>
					<CardTitle>Prüfungsvorleistung: Übungsaufgaben</CardTitle>
				</CardHeader>
				<CardBody>
					<Row> 
						<Col>
							<Row cols={{lg:2,md:3,sm:1}}>
								<Col><f>Anmeldezeitraum</f></Col>
								<Col>05.12.22 - 16.12.22</Col>
								<Col><f>Prüfungsart</f></Col>
								<Col>Abgabe von Übungsaufgaben</Col>
								<Col><f>Status</f></Col>
								<Col>nicht angemeldet</Col>
							</Row>
						</Col>
						<Col>
							<Row cols={{lg:2,md:2,sm:5}}>
								<Col><f>Semester der Leistung</f></Col>
								<Col>Wintersemester 2022</Col>
								<Col><f>Prüfer</f></Col>
								<Col>Max Mustermann, Hermann Mann, Christian Franz</Col>
							</Row>
						</Col>
						<Col xs="auto"> 
							<Container class="h-100 d-flex justify-content-center align-items-center">
								<Button color='success'>Anmelden</Button>
							</Container>
						</Col>
					</Row>
				</CardBody>
			</Card>
			<br/>
			<Card>
				<CardHeader>
					<CardTitle>Mündliche Prüfung</CardTitle>
				</CardHeader>
				<CardBody>
					<Row> 
						<Col>
							<Row cols={{lg:2,md:4,sm:1}}>
								<Col><f>Datum</f></Col>
								<Col>07.02.2023</Col>
								<Col><f>Prüfungsart</f></Col>
								<Col>mündlich</Col>
								<Col><f>Leistungspunkte</f></Col>
								<Col>8</Col>
								<Col><f>Status</f></Col>
								<Col>nicht angemeldet</Col>
							</Row>
						</Col>
						<Col>
							<Row cols={{lg:2,md:2,sm:5}}>
								<Col><f>Semester der Leistung</f></Col>
								<Col>Wintersemester 2022</Col>
								<Col><f>Prüfer</f></Col>
								<Col>Max Mustermann, Hermann Mann, Christian Franz</Col>
							</Row>
						</Col>
						<Col xs="auto"> 
							<Container class="h-100 d-flex justify-content-center align-items-center">
								<Button color='success'>Anmelden</Button>
							</Container>
						</Col>
					</Row>
				</CardBody>
			</Card>	
		</AccordionItem>
	</Accordion>
	<br/>
	<Accordion>
		<AccordionItem>
			<h2 slot="header">
				<div class="d-flex justify-content-end">
					<b>Datenbanken Grundlagen</b>
					<span class="mx-5">
						<b>ID: </b>565150
					</span>
					<span>
						<b>Leistungspunkte: </b>5
					</span>
					<span class="mx-5">
						<Badge color="primary">schriftlich</Badge>
					</span>			
				</div>
			</h2>
			<Card>
				<CardHeader>
					<CardTitle>Schriftliche Prüfung</CardTitle>
				</CardHeader>
				<CardBody>
					<Row> 
						<Col>
							<Row cols={{lg:2,md:4,sm:1}}>
								<Col><f>Datum</f></Col>
								<Col>07.02.2023</Col>
								<Col><f>Prüfungsart</f></Col>
								<Col>schriftlich</Col>
								<Col><f>Leistungspunkte</f></Col>
								<Col>5</Col>
								<Col><f>Status</f></Col>
								<Col>zugelassen (unter Vorbehalt)</Col>
							</Row>
						</Col>
						<Col>
							<Row cols={{lg:2,md:2,sm:5}}>
								<Col><f>Semester der Leistung</f></Col>
								<Col>Wintersemester 2022</Col>
								<Col><f>Prüfer</f></Col>
								<Col>Max Mustermann, Hermann Mann, Christian Franz</Col>
							</Row>
						</Col>
						<Col xs="auto"> 
							<Container class="h-100 d-flex justify-content-center align-items-center">
								<Button color='danger'>Abmelden</Button>
							</Container>
						</Col>
					</Row>
				</CardBody>
			</Card>	
		</AccordionItem>
	</Accordion>
</main>


<style>
	main f{
		font-weight: bold;
	}

</style>


