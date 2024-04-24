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
    Card,
    CardHeader,
    CardTitle,
    CardBody,
  } from "sveltestrap";

  // import custom components
  import Exam_container from "./exam-container/exam_container.svelte";

  import { enhance } from "$app/forms";
  import DemoMember from "../DemoMember.svelte";

  let filter_options = {
    anwendungsschwerpunkt: "Alle",
    modulart: "Alle",
    semester: "Alle",
    only_new_exams: false,
  };
  let search_text_input = "";
  let search_text = "";

  let exam_types = {
    Alle: "ALL",
    Basismodule: "BASE",
    Anwendungsschwerpunkt: "ADDITIONAL",
    Schlüsselkompetenzen: "KEY_COMPETENCE",
  };
  let course_types = {
    Alle: "ALL",
    "Verteilte Systeme": 3,
    "Eingebettete Systeme": 1,
    Computergrafik: 4,
    Medieninformatik: 2,
  };

  function search() {
    search_text = search_text_input;
  }

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
  }

  export let data = {
    results: [],
  };
</script>

<svelte:head>
  <title>Leistungsübersicht</title>
  <meta name="description" content="Verwaltung von Prüfungen" />
</svelte:head>

<DemoMember currentPath="results" demoId={data.demoId} />

<Container class="my-4">
  <h1>Prüfungsergebnisse</h1>

  <Card>
    <CardHeader>
      <CardTitle>Gesamtkonto</CardTitle>
    </CardHeader>

    <CardBody class="fs-5">
      <Row cols={{ lg: 2, sm: 2, xs: 1 }}>
        <Col>
          <Row cols={{ sm: 2, xs: 2 }}>
            <Col><b>Notendurschnitt</b></Col>
            <Col>{data.overall_result}</Col>
          </Row>
        </Col>
        <Col>
          <Row cols={{ sm: 2, xs: 2 }}>
            <Col><b>Leistungspunkte</b></Col>
            <Col>{data.total_points} / 180</Col>
          </Row>
        </Col>
      </Row>
    </CardBody>
  </Card>

  <Container class="my-4" style="background-color: rgb(246, 246, 246);">
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
                  on:click={() => filter_anwendungsschwerpunkt("Alle")}
                  >Alle
                </DropdownItem>
                <DropdownItem
                  on:click={() =>
                    filter_anwendungsschwerpunkt("Medieninformatik")}
                  >Medieninformatik
                </DropdownItem>
                <DropdownItem
                  on:click={() =>
                    filter_anwendungsschwerpunkt("Computergrafik")}
                  >Computergrafik
                </DropdownItem>
                <DropdownItem
                  on:click={() =>
                    filter_anwendungsschwerpunkt("Eingebettete Systeme")}
                  >Eingebettete Systeme
                </DropdownItem>
                <DropdownItem
                  on:click={() =>
                    filter_anwendungsschwerpunkt("Verteilte Systeme")}
                  >Verteilte Systeme
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col>
            <p>Modulart</p>
          </Col>
          <Col>
            <Dropdown>
              <DropdownToggle caret>{filter_options["modulart"]}</DropdownToggle
              >
              <DropdownMenu>
                <DropdownItem header>Modulart</DropdownItem>
                <DropdownItem on:click={() => filter_modulart("Alle")}
                  >Alle</DropdownItem
                >
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
              <DropdownToggle caret>{filter_options["semester"]}</DropdownToggle
              >
              <DropdownMenu>
                <DropdownItem header>Semester</DropdownItem>
                <DropdownItem on:click={() => filter_semester("Alle")}
                  >Alle</DropdownItem
                >
                <DropdownItem on:click={() => filter_semester(1)}
                  >1</DropdownItem
                >
                <DropdownItem on:click={() => filter_semester(2)}
                  >2</DropdownItem
                >
                <DropdownItem on:click={() => filter_semester(3)}
                  >3</DropdownItem
                >
                <DropdownItem on:click={() => filter_semester(4)}
                  >4</DropdownItem
                >
                <DropdownItem on:click={() => filter_semester(5)}
                  >5</DropdownItem
                >
                <DropdownItem on:click={() => filter_semester(6)}
                  >6</DropdownItem
                >
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </Col>
      <Col>
        <Input
          bind:value={search_text_input}
          placeholder="Prüfung durch Name filtern"
        />
      </Col>
    </Row>
  </Container>

  {#each data.results as result}
    <!-- filter only new exams, search, moduletype, planned semester for module-->
    {#if (filter_options["only_new_exams"] == false || result["status"] != "PASSED") && (search_text_input == "" || result["name"].includes(search_text_input)) && (filter_options["anwendungsschwerpunkt"] == "Alle" || result["course_id"].includes(course_types[filter_options["anwendungsschwerpunkt"]])) && (filter_options["modulart"] == "Alle" || result["type"] == exam_types[filter_options["modulart"]]) && (filter_options["semester"] == "Alle" || result["planned_semester"] == filter_options["semester"])}
      <svelte:component this={Exam_container} active="false" data={result} />
      <br />
    {/if}
  {/each}

  {#if data.results.length == 0}
    <Container class="d-flex justify-content-center">
      <b class="text-primary">Für Sie sind noch keine Leistungen hinterlegt.</b>
    </Container>
  {/if}
</Container>

<style>
  @import "./style.css";
</style>
