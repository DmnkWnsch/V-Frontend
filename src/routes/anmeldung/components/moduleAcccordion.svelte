<script>
    import { Accordion, AccordionItem, Badge } from "sveltestrap";
    import ModuleCard from "./moduleCard.svelte";
    import consts from "../../../consts";
    /**
     * @type {any}
     */
     export let id;
    export let name="";
    export let credits=0; 
    
    const loadExamsForModule = async () => {
        const examsReq = await fetch(consts.API_URL + "/modules/" + id + "/exams", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
        });
        const examsRes = await examsReq.json();
        return examsRes;
    }
    let examsPromise = loadExamsForModule();
</script>

{#await examsPromise}
  <div class="col-12 text-center">
    <div class="spinner-border text-secondary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
{:then exams}
    <Accordion>
        <AccordionItem>
            <h2 slot="header">
                <div class="d-flex justify-content-end">
                    <b>{name}</b>
                    <span class="mx-5">
                        <b>ID: </b>{id}
                    </span>
                    <span>
                        <b>Leistungspunkte: </b>{credits}
                    </span>
                    {#each exams as exam}
                        {#if exam.type=='WRITTEN'}
                            <span class="mx-5">
                                <Badge color="primary">schriftlich</Badge>
                            </span>
                        {:else if exam.type=='TASKS'}
                            <span class="mx-5">
                                <Badge color="warning">PVL</Badge>
                            </span>	 
                        {/if}
                    {/each}  		
                </div>
            </h2>
            {#each exams as exam}
                <ModuleCard type= {exam.type} credits={credits}/>
            {/each}
        </AccordionItem>
    </Accordion>
    <br/>
{/await}

<style>
    b{
        white-space: nowrap;
        line-height: 1em; 
        max-height: 2em;
    }
    span{
        display: inline-flex;
    }
</style>
