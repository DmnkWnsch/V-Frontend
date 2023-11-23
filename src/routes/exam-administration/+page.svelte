<script>
// import sveltestrap components
  import {
    Nav,
    NavItem,
	Navbar,
    NavbarBrand,
    NavLink,
	Styles,
	Button,
	Col,
	Row,
	Container,
	InputGroup,
	Input,
	Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
	FormGroup
  } from 'sveltestrap';

// import custom components
  import Exam_container from './custom_components/exam_container.svelte';

</script>

<svelte:head>
	<title>Prüfungsverwaltung</title>
	<meta name="description" content="Verwaltung von Prüfungen" />
</svelte:head>

<style>
	.nav_bar	{
		background-color: #005f50;
	}
	.span_white {
		color: white;
	}
	
	:global(.nav_link) {
		background-color: rgb(255 255 255 / 25%) !important;
	}
	:global(.bg_grey_1) {
		background-color: rgb(0 0 0 / 15%) !important;
	}

</style>

<div class="nav_bar">
	<Navbar>
		<NavbarBrand>
			<span class="span_white" >Prüfungsverwaltung</span>
		</NavbarBrand>
		<Nav pills>
				<NavItem>
					<NavLink href="#" >
						<span class="span_white" >Prüfungsanmeldung</span>
					</NavLink>
				</NavItem>
			<NavItem>
				<NavLink href="#" class="nav_link" active>
					<span class="span_white" >Leistungsübersicht</span>
				</NavLink>
			</NavItem>
		</Nav>
	</Navbar>
</div>
<Container fluid class="bg-light my-5 border border-dark rounded">
	<Row class="bg_grey_1 py-2">
		<Col >
			<h5><b>Gesamtkonto</b></h5>
		</Col>
	</Row>
	<Row cols={2} class="py-5">
		<Row cols={2}>
			<Col>
				<h4><b>Bewertung:</b></h4>
			</Col>
			<Col>2.49</Col>
		</Row>
		<Row cols={2}>
			<Col>
				<h4><b>Leistungspunkte:</b></h4>
			</Col>
			<Col>113</Col>
		</Row>
	</Row>
</Container>
<Container fluid class="bg-light ">
	<Row cols={2} class="py-2">
		<Col>
			<h4>Abgeschlossene Prüfung</h4>
		</Col>
		<Col>
			<Row cols={2}>
				<Col sm={{ size: 6 , offset: 4 }}>
					<InputGroup>
						<Input placeholder="Prüfung finden" />
						<Button>Suchen</Button>
					</InputGroup>
				</Col>
				<Col sm={{ size: 1 , offset: 0 }}>
					<Button class="bg-info border border-0">Filter</Button>
				</Col>
			</Row>
		</Col>
	</Row>
</Container>
<Container fluid class="bg_grey_1">
	<p class="py-2 my-0"><b>Filtern</b></p>
	<hr class="hr my-0" />
	<Row cols={2} class="py-2">
		<Col>
			<Row cols={2}>
				<Col>
					<p>Anwendungsschwerpunkt</p>
				</Col>
				<Col>
					<Dropdown>
						<DropdownToggle caret>Medieninformatik</DropdownToggle>
						<DropdownMenu>
						  <DropdownItem header>Anwendungsschwerpunkt</DropdownItem>
						  <DropdownItem>Medieninformatik</DropdownItem>
						  <DropdownItem>Computergrafik</DropdownItem>
						  <DropdownItem>Eingebettete Systeme</DropdownItem>
						  <DropdownItem>Verteilte Systeme</DropdownItem>
						</DropdownMenu>
					  </Dropdown>
				</Col>
				<Col>
					<p>Modulart</p>
				</Col>
				<Col>
					<Dropdown>
						<DropdownToggle caret>Basismodule</DropdownToggle>
						<DropdownMenu>
						  <DropdownItem header>Modulart</DropdownItem>
						  <DropdownItem>Anwendungsschwerpunkt</DropdownItem>
						  <DropdownItem>Schlüsselkompetenzen</DropdownItem>
						</DropdownMenu>
					  </Dropdown>
				</Col>
				<Col>
					<p>Semester</p>
				</Col>
				<Col>
					<Dropdown>
						<DropdownToggle caret>3</DropdownToggle>
						<DropdownMenu>
						  <DropdownItem header>Semester</DropdownItem>
						  <DropdownItem>1</DropdownItem>
						  <DropdownItem>2</DropdownItem>
						  <DropdownItem>4</DropdownItem>
						  <DropdownItem>5</DropdownItem>
						  <DropdownItem>6</DropdownItem>
						</DropdownMenu>
					  </Dropdown>
				</Col>
			</Row>
		</Col>
		<Col>
			<FormGroup>
				<Input type="checkbox" label="Bestandene Prüfungen ausblenden" />
			</FormGroup>
		</Col>
	</Row>
</Container>

<div class="mt-5">
	<Exam_container/>
</div>




