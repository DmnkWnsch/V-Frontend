<script>
  // @ts-nocheck

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
    FormGroup,
  } from "sveltestrap";

  // import custom components
  import Exam_container from "./custom_components/exam_container.svelte";

  import { enhance } from "$app/forms";

  let filter_options = {
    anwendungsschwerpunkt: "Medieninformatik",
    modulart: "Basismodule",
    semester: 3,
    only_new_exams: false,
  };

  function search() {}

  function filter() {}

  /*filter opions*/
  function filter_anwendungsschwerpunkt(a) {
    filter_options["anwendungsschwerpunkt"] = a;
  }
  function filter_modulart(m) {
    filter_options["modulart"] = m;
  }
  function filter_semester(s) {
    filter_options["semester"] = s;
    console.log(filter_options);
  }

  export let data = {
    results: [],
  };
</script>

<svelte:head>
  <title>Prüfungsverwaltung</title>
  <meta name="description" content="Verwaltung von Prüfungen" />
</svelte:head>

<!--<div class="nav_bar">
	<Navbar>
		<NavbarBrand>
			<span class="span_white" >Prüfungsverwaltung</span>
		</NavbarBrand>
		<Nav pills>
			<NavItem>
				<NavLink href="/anmeldung" >
					<span class="span_white" >Prüfungsanmeldung</span>
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="/exam-administration" class="nav_link" active>
					<span class="span_white" >Leistungsübersicht</span>
				</NavLink>
			</NavItem>
		</Nav>
	</Navbar>
</div>-->
<Container class="bg-light my-5 border border-dark rounded">
  <Row class="bg_grey_1 py-2">
    <Col>
      <h5><b>Gesamtkonto</b></h5>
    </Col>
  </Row>
  <Row cols={2} class="py-5">
    <Row cols={2}>
      <Col>
        <h4><b>Bewertung:</b></h4>
      </Col>
      <Col>{data.overall_result}</Col>
    </Row>
    <Row cols={2}>
      <Col>
        <h4><b>Leistungspunkte:</b></h4>
      </Col>
      <Col>{data.total_points}</Col>
    </Row>
  </Row>
</Container>
<Container class="bg-light ">
  <Row cols={2} class="py-2">
    <Col>
      <h4>Abgeschlossene Prüfung</h4>
    </Col>
    <Col>
      <Row cols={2}>
        <Col sm={{ size: 6, offset: 4 }}>
          <InputGroup>
            <Input placeholder="Prüfung finden" />
            <Button on:click={search}>Suchen</Button>
          </InputGroup>
        </Col>
        <Col sm={{ size: 1, offset: 0 }}>
          <Button class="bg-info border border-0" on:click={filter}
            >Filter</Button
          >
        </Col>
      </Row>
    </Col>
  </Row>
</Container>
<Container class="bg_grey_1">
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
            <DropdownToggle caret
              >{filter_options["anwendungsschwerpunkt"]}</DropdownToggle
            >
            <DropdownMenu>
              <DropdownItem header>Anwendungsschwerpunkt</DropdownItem>
              <DropdownItem
                on:click={() =>
                  filter_anwendungsschwerpunkt("Medieninformatik")}
                >Medieninformatik</DropdownItem
              >
              <DropdownItem
                on:click={() => filter_anwendungsschwerpunkt("Computergrafik")}
                >Computergrafik</DropdownItem
              >
              <DropdownItem
                on:click={() =>
                  filter_anwendungsschwerpunkt("Eingebettete Systeme")}
                >Eingebettete Systeme</DropdownItem
              >
              <DropdownItem
                on:click={() =>
                  filter_anwendungsschwerpunkt("Verteilte Systeme")}
                >Verteilte Systeme</DropdownItem
              >
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col>
          <p>Modulart</p>
        </Col>
        <Col>
          <Dropdown>
            <DropdownToggle caret>{filter_options["modulart"]}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Modulart</DropdownItem>
              <DropdownItem on:click={() => filter_modulart("Basismodule")}
                >Basismodule</DropdownItem
              >
              <DropdownItem
                on:click={() => filter_modulart("Anwendungsschwerpunkt")}
                >Anwendungsschwerpunkt</DropdownItem
              >
              <DropdownItem
                on:click={() => filter_modulart("Schlüsselkompetenzen")}
                >Schlüsselkompetenzen</DropdownItem
              >
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col>
          <p>Semester</p>
        </Col>
        <Col>
          <Dropdown>
            <DropdownToggle caret>{filter_options["semester"]}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Semester</DropdownItem>
              <DropdownItem on:click={() => filter_semester(1)}>1</DropdownItem>
              <DropdownItem on:click={() => filter_semester(2)}>2</DropdownItem>
              <DropdownItem on:click={() => filter_semester(3)}>3</DropdownItem>
              <DropdownItem on:click={() => filter_semester(4)}>4</DropdownItem>
              <DropdownItem on:click={() => filter_semester(5)}>5</DropdownItem>
              <DropdownItem on:click={() => filter_semester(6)}>6</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </Col>
    <Col>
      <FormGroup>
        <Input
          bind:checked={filter_options["only_new_exams"]}
          type="checkbox"
          label="Bestandene Prüfungen ausblenden"
        />
      </FormGroup>
    </Col>
  </Row>
</Container>

<Container>
  {#each data.results as result}
	{#if filter_options["only_new_exams"] == false || result["status"] != "passed" }
		<div class="mt-5">
		<svelte:component this={Exam_container} active="false" data={result} />
		</div>
	{/if}
  {/each}
</Container>

<style>
  .nav_bar {
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
