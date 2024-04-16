<script>
  // @ts-nocheck
  import {
    Accordion,
    AccordionItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Container,
    FormCheck,
    FormGroup,
    Input,
    InputGroup,
    Row,
  } from "sveltestrap";
  import ModuleAcccordion from "./components/moduleAcccordion.svelte";
  import consts from "../../consts";
  import util from "../../util";
  import MessageBanner from "../admin/components/MessageBanner.svelte";
  import { storedMemberId } from "../MemberIdStore";
  import { onMount } from "svelte";

  export let data;
  export let form;
  /*const loadModules= async () => {
	const modulesReq = await fetch(consts.API_URL + "/modules" , {
      method: "GET",
      headers: { "Content-Type": "application/json",},});
    	const modulesRes = await modulesReq.json();
    	return {modules: modulesRes,}
	}

	let dataPromise = loadModules();*/

  const applyFilter = async () => {
    console.log(filter);
    let query = "";
    if (filter.course_name != "-") {
      if (filter.course_name == "Eingebettete Systeme") {
        query = "courses/1/modules";
      } else if (filter.course_name == "Medieninformatik") {
        query = "courses/2/modules";
      } else if (filter.course_name == "Verteilte Systeme") {
        query = "courses/3/modules";
      } else if (filter.course_name == "Computergraphik") {
        query = "courses/4/modules";
      }
    }
    if (filter.module_type != "-") {
      if (filter.module_type == "Basismodule") {
        query += "?type=BASE";
      }
      if (filter.module_type == "Ergänzungsmodule") {
        query += "?type=ADDITIONAL";
      }
      if (filter.module_type == "Pflichtmodule") {
        query += "?type=FIELD_MODULE";
      }
      if (filter.module_type == "Wahlpflichtmodule") {
        query += "?type=OPTIONAL";
      }
      if (filter.module_type == "Schlüsselkompetenzen") {
        query += "?type=KEY_COMPETENCE";
      }
    }

    const modulesReq = await fetch(consts.API_URL + "/" + query, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const modulesRes = await modulesReq.json();
    console.log(modulesRes);
    filteredData = { modules: modulesRes };
    console.log(filteredData);
    filter.applied = true;
  };

  let filter = {
    applied: false,
    course_name: "-",
    module_type: "-",
    planned_semester: "-",
  };
  let filteredData = data;

  let searchTerm = "";
  let filteredModules = [];
  const searchModule = () => {
    if (searchTerm.trim().length == 0) return (filteredModules = []);

    if (isNaN(parseInt(searchTerm))) {
      return (filteredModules = filteredData.modules.filter((module) => {
        const moduleName = module.name;
        return moduleName.includes(searchTerm);
      }));
    }
  };

  const getRegistrationData = () => {
    let regs = [];

    for (let i = 0; i < data.registrations.length; i++) {
      const reg = data.registrations[i];
      regs[reg.exam_id] = reg;
    }

    return regs;
  };

  const getResultsData = () => {
    let results = [];

    for (let i = 0; i < data.results.length; i++) {
      const res = data.results[i];
      results[res.exam_id] = res;
    }

    return results;
  };

  let finishedModules = 0;
  let allModulesLoaded = false;

  const increaseFinishedModules = (event) => {
    finishedModules = finishedModules + 1;
    if (finishedModules == data.modules.length) {
      allModulesLoaded = true;
    }
  };
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

{#if form?.success}
  <MessageBanner type="success">
    {#if form?.reason == "REG_SUC"}
      Sie haben sich erfolgreich zur Prüfung angemeldet.
    {:else if form?.reason == "UNREG_SUC"}
      Sie haben sich erfolgreich von der Prüfung abgemeldet.
    {/if}
  </MessageBanner>
{/if}

{#if form?.error}
  <MessageBanner type="error">
    {form?.message}
  </MessageBanner>
{/if}

<Accordion style="font-size: inherit;">
  <AccordionItem header="Angemeldete Prüfungen">
    {#each data.registrations as reg, index (index)}
      <Card class={index != 0 ? "mt-3" : ""}>
        <CardHeader>
          <CardTitle
            >{reg.module_name} - {consts.getExamTypeName(reg.type)}</CardTitle
          >
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <Row cols={{ lg: 2, md: 4, sm: 1 }}>
                <Col><f>Datum</f></Col>
                <Col>{util.formatDate(new Date(reg.date))}</Col>
                <Col><f>Prüfungsart</f></Col>
                <Col>{consts.getExamTypeName(reg.type)}</Col>
                <Col><f>Leistungspunkte</f></Col>
                <Col>{reg.credits}</Col>
                <Col><f>Status</f></Col>
                <Col>{util.getNameByRegistrationState(reg.status)}</Col>
              </Row>
            </Col>
            <Col>
              <Row cols={{ lg: 2, md: 2, sm: 5 }}>
                <Col><f>Semester der Leistung</f></Col>
                <Col>{reg.name}</Col>
                <Col><f>Prüfer</f></Col>
                <Col>Max Mustermann</Col>
              </Row>
            </Col>
            <Col xs="auto">
              <form
                class="h-100 d-flex justify-content-center align-items-center"
                method="POST"
                action="?/unregister"
              >
                <input hidden name="member" value={storedMemberId} />
                <input hidden name="plan_id" value={reg.exam_plan_id} />
                <Button color="danger">Abmelden</Button>
              </form>
            </Col>
          </Row>
        </CardBody>
      </Card>
    {/each}
  </AccordionItem>
</Accordion>
<br />

<Row class="d-flex align-items-center">
  <Col>
    <h1>Anmelden zu einer Prüfung</h1>
  </Col>
  <Col>
    <InputGroup>
      <Input
        type="text"
        bind:value={searchTerm}
        on:input={searchModule}
        placeholder="Prüfung finden"
      />
      <Button>Suchen</Button>
    </InputGroup>
    <!--<input 
				 type="text" 
				 bind:value={searchTerm} 
				 on:input={searchModule}
				 placeholder="Prüfung finden"
			/>-->
  </Col>
  <Col xs="auto">
    <div>
      <Button light on:click={applyFilter} color="info">Filter</Button>
    </div>
  </Col>
</Row>

<Container style="background-color: #f6f6f6">
  Filter

  <hr class="my-2" />
  <Row>
    <Col xs="6">
      <Row cols={{ lg: 2, md: 3, sm: 0 }}>
        <Col><h2>Anwendungsschwerpunkt</h2></Col>
        <Col>
          <FormGroup>
            <Input
              bind:value={filter.course_name}
              type="select"
              name="select"
              id="exampleSelect"
            >
              <option>Eingebettete Systeme</option>
              <option>Medieninformatik</option>
              <option>Verteilte Systeme</option>
              <option>Computergraphik/Virtuelle Realität</option>
            </Input>
          </FormGroup>
        </Col>
        <Col><h2>Modulart</h2></Col>
        <Col>
          <FormGroup>
            <Input
              bind:value={filter.module_type}
              type="select"
              name="select"
              id="exampleSelect"
            >
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
            <Input
              bind:value={filter.planned_semester}
              type="select"
              name="select"
              id="exampleSelect"
            >
              <option>-</option>
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
    <Col xs="1" />
    <Col xs="auto">
      <FormGroup check>
        <FormCheck type="checkbox" required label>
          <p slot="label">Bestandene Prüfungen ausblenden</p>
        </FormCheck>
      </FormGroup>
    </Col>
  </Row>
</Container>
<br />

{#if !allModulesLoaded}
  <div class="col-12 text-center">
    <div class="spinner-border text-secondary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
{/if}

<div class={allModulesLoaded ? "" : "d-none"}>
  {#if searchTerm == ""}
    {#if !filter.applied}
      {#key filteredData}
        {#each filteredData.modules as mod}
          {#if filter.planned_semester == "-"}
            <ModuleAcccordion
              id={mod.id}
              name={mod.name}
              credits={mod.credits}
              examRegistrations={getRegistrationData()}
              results={getResultsData()}
              on:finish={increaseFinishedModules}
            />
          {:else if filter.planned_semester == mod.planned_semester}
            <ModuleAcccordion
              id={mod.id}
              name={mod.name}
              credits={mod.credits}
              examRegistrations={getRegistrationData()}
              results={getResultsData()}
              on:finish={increaseFinishedModules}
            />
          {/if}
        {/each}
      {/key}
    {:else}
      {#key filteredData}
        {#each filteredData.modules as mod}
          {#if filter.planned_semester == "-"}
            <ModuleAcccordion
              id={mod.module_id}
              name={mod.name}
              credits={mod.credits}
              examRegistrations={getRegistrationData()}
              results={getResultsData()}
              on:finish={increaseFinishedModules}
            />
          {:else if filter.planned_semester == mod.planned_semester}
            <ModuleAcccordion
              id={mod.module_id}
              name={mod.name}
              credits={mod.credits}
              examRegistrations={getRegistrationData()}
              results={getResultsData()}
              on:finish={increaseFinishedModules}
            />
          {/if}
        {/each}
      {/key}
    {/if}
  {:else if !filter.applied}
    {#each filteredModules as mod}
      {#if filter.planned_semester == "-"}
        <ModuleAcccordion
          id={mod.id}
          name={mod.name}
          credits={mod.credits}
          examRegistrations={getRegistrationData()}
          results={getResultsData()}
          on:finish={increaseFinishedModules}
        />
      {:else if filter.planned_semester == mod.planned_semester}
        <ModuleAcccordion
          id={mod.id}
          name={mod.name}
          credits={mod.credits}
          examRegistrations={getRegistrationData()}
          results={getResultsData()}
          on:finish={increaseFinishedModules}
        />
      {/if}
    {/each}
  {:else}
    {#each filteredModules as mod}
      {#if filter.planned_semester == "-"}
        <ModuleAcccordion
          id={mod.module_id}
          name={mod.name}
          credits={mod.credits}
          examRegistrations={getRegistrationData()}
          results={getResultsData()}
          on:finish={increaseFinishedModules}
        />
      {:else if filter.planned_semester == mod.planned_semester}
        <ModuleAcccordion
          id={mod.module_id}
          name={mod.name}
          credits={mod.credits}
          examRegistrations={getRegistrationData()}
          results={getResultsData()}
          on:finish={increaseFinishedModules}
        />
      {/if}
    {/each}
  {/if}
</div>
