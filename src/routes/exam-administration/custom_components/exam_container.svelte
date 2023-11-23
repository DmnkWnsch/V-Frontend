<script>
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
  import Sub_exam_container from './sub_exam_container.svelte';

  export let active;
  active = ( active == "true" ) ? "active" : "";
  export let data;
  
</script>

<Accordion>
    <AccordionItem {active} header="<Badge>{data["name"]}</Badge>">
      {#each data["sub_exams"] as value}
        <svelte:component this={Sub_exam_container} data={value}/>
      {/each}
    </AccordionItem>
  </Accordion>