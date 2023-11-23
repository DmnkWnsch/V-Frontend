<script>
  // import sveltestrap components
  import {
      Accordion,
      AccordionItem,
      Container,
      Row,
      Col,
      Button
      } from 'sveltestrap';
  
  // import custom components
  import Sub_exam_container from './sub_exam_container.svelte';
</script>

<Accordion>
    <AccordionItem active header="Mathematik III">
      <Sub_exam_container/>
      <Sub_exam_container/>
    </AccordionItem>
  </Accordion>