<script>
// @ts-nocheck

  // import sveltestrap components
  import {
      Accordion,
      AccordionItem,
      Container,
      Row,
      Col,
      Button,
      Badge
      } from 'sveltestrap';
  
  // import custom components
  import Sub_exam_container from './sub-exam-container/sub_exam_container.svelte';

  export let active;
  active = ( active == "true" ) ? "active" : "";
  export let data;
  
</script>

<style>
  @import './style.css';
</style>

<Accordion>
  <AccordionItem {active}>
    <span slot="header">
      <div class="d-flex justify-content-between w-100">
        <b>{data["name"]}</b>
        {#each data["tags"] as value}
          <Badge class="mx-1 badge_{value}">{value}</Badge>
        {/each}
        <span class="mx-5">
          <b>Leistungspunkte: </b>{data["points"]}
        </span>
        <span class="mx-3">
          <b>ID: </b>{data["id"]}
        </span>
      </div>
    </span>
    {#each data["sub_exams"] as value}
      <svelte:component this={Sub_exam_container} data={value}/>
    {/each}
  </AccordionItem>
</Accordion>