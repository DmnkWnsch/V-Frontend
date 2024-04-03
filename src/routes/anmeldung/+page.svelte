<script>
// @ts-nocheck
	import {Accordion,AccordionItem,Button,Card,CardBody,CardHeader,CardTitle,Col,Container,FormCheck,FormGroup,Input,InputGroup,Row} from 'sveltestrap'
    import ModuleAcccordion from './components/moduleAcccordion.svelte';
	import consts from '../../consts';

	export let data;
	/*const loadModules= async () => {
	const modulesReq = await fetch(consts.API_URL + "/modules" , {
      method: "GET",
      headers: { "Content-Type": "application/json",},});
    	const modulesRes = await modulesReq.json();
    	return {modules: modulesRes,}
	}

	let dataPromise = loadModules();*/

	const applyFilter = async () => {
		let query='';
		if (filter.course_name!="") {
			if (filter.course_name=="Eingebettete Systeme") {
				query='courses/1'
			}
			else if (filter.course_name=="Medieninformatik") {
				query='courses/2'
			}
			else if (filter.course_name=="Verteilte Systeme") {
				query='courses/3'
			}
			else if (filter.course_name=="Computergraphik") {
				query='courses/4'
			}
		}
		if (filter.module_type!="") {
			if (filter.module_type=="Basismodule") {
				query+='/modules?type=BASE'
			}
			if (filter.module_type=="Ergänzungsmodule") {
				query+='/modules?type=ADDITIONAL'
			}
			if (filter.module_type=="Pflichtmodule") {
				query+='/modules?type=FIELD_MODULE'
			}
			if (filter.module_type=="Wahlpflichtmodule") {
				query+='/modules?type=OPTIONAL'
			}
			if (filter.module_type=="Schlüsselkompetenzen") {
				query+='/modules?type=KEY_COMPETENCE'
			}
		}
		console.log(query);
		
		const modulesReq = await fetch(consts.API_URL + "/"+ query, {
      	method: "GET",
      	headers: { "Content-Type": "application/json",},});
    	const modulesRes = await modulesReq.json();
		console.log(modulesRes);
		filteredData= {modules: modulesRes,};
		console.log(filteredData);
		filter.applied=true;
	};

	let filter = {
		applied:false,
		course_name: "-",
		module_type: "-",
		planned_semester: "-",
	}
	let filteredData=data;

	let searchTerm= "";
	let filteredModules= [];
	const searchModule = () => {
		if (searchTerm.trim().length == 0) return (filteredModules = []);
		
		if (isNaN(parseInt(searchTerm))) {
			return (filteredModules = filteredData.modules
				.filter((module) => {
					const moduleName = module.name;
					return moduleName.includes(searchTerm);
				}));
		}
	};
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
			<div><Button 
				  light 
				  on:click={applyFilter} 
				  color='info'>Filter</Button></div>
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
							<Input bind:value={filter.course_name} type="select" name="select" id="exampleSelect">
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
							<Input bind:value={filter.module_type} type="select" name="select" id="exampleSelect">
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
							<Input bind:value={filter.planned_semester} type="select" name="select" id="exampleSelect">
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
	{#if searchTerm==""}
		{#if !filter.applied}
			{#key filteredData}
				{#each filteredData.modules as mod}
					{#if (filter.planned_semester=="-")}
						<ModuleAcccordion 
						id={mod.id} 
						name={mod.name} 
						credits={mod.credits}/>
					{:else if (filter.planned_semester==mod.planned_semester)}
						<ModuleAcccordion 
						id={mod.id} 
						name={mod.name} 
						credits={mod.credits}/>
					{/if}					
				{/each}
			{/key}
		{:else}
			{#key filteredData}
				{#each filteredData.modules as mod}
					{#if (filter.planned_semester=="-")}
						<ModuleAcccordion 
						id={mod.module_id} 
						name={mod.name} 
						credits={mod.credits}/>
					{:else if (filter.planned_semester==mod.planned_semester)}
						<ModuleAcccordion 
						id={mod.module_id} 
						name={mod.name} 
						credits={mod.credits}/>
					{/if}					
				{/each}
			{/key}
		{/if}
	{:else}
		{#if !filter.applied}
			{#each filteredModules as mod}
				{#if (filter.planned_semester=="-")}
				<ModuleAcccordion 
				id={mod.id} 
				name={mod.name} 
				credits={mod.credits}/>
				{:else if (filter.planned_semester==mod.planned_semester)}
				<ModuleAcccordion 
				id={mod.id} 
				name={mod.name} 
				credits={mod.credits}/>
				{/if}					
			{/each}
		{:else}
			{#each filteredModules as mod}
			{#if (filter.planned_semester=="-")}
			<ModuleAcccordion 
			id={mod.module_id} 
			name={mod.name} 
			credits={mod.credits}/>
			{:else if (filter.planned_semester==mod.planned_semester)}
			<ModuleAcccordion 
			id={mod.module_id} 
			name={mod.name} 
			credits={mod.credits}/>
			{/if}					
			{/each}
		{/if}
	{/if}
	<!--{#await dataPromise}
  		<div class="col-12 text-center">
   		<div class="spinner-border text-secondary" role="status">
      	<span class="visually-hidden">Loading...</span>
    	</div>
  		</div>
	{:then data}
		{#each data.modules as mod}
			<ModuleAcccordion id={mod.id} name={mod.name} credits={mod.credits}/>			
		{/each}
	{/await}-->
</main>


<style>
	main f{
		font-weight: bold;
	}
</style>


