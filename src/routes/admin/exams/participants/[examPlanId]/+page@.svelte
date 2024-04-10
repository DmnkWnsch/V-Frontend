<script>
  import consts from "../../../../../consts";
  import util from "../../../../../util";
  export let data;

  const openPrintWindow = () => {
    window.print();
  };
</script>

<dl class="row p-2">
  <dt class="col-sm-3">Modul</dt>
  <dd class="col-sm-9">
    {data.examInfo.name}
  </dd>

  <dt class="col-sm-3">Prüfungsart</dt>
  <dd class="col-sm-9">
    {consts.getExamTypeName(data.examInfo.type)}
  </dd>

  <dt class="col-sm-3">Termin</dt>
  <dd class="col-sm-9">
    {util.formatDate(new Date(data.registrations[0].date))}
  </dd>

  <dt class="col-sm-3">Prüfer</dt>
  <dd class="col-sm-9">
    {#each data.examiners as examiner, index (index)}
      {#if index != 0}
        ,
      {/if}
      {examiner.name + " " + examiner.last_name}
    {/each}
  </dd>
</dl>

<table class="table">
  <thead>
    <tr>
      <th scope="col">Matrikel-Nr.</th>
      <th scope="col">Nachname</th>
      <th scope="col">Vorname</th>
      <th scope="col">Bemerkungen</th>
    </tr>
  </thead>

  <tbody>
    {#each data.registrations as reg}
      <tr>
        <th scope="row">{reg.member_id}</th>
        <td>{reg.last_name}</td>
        <td>{reg.name}</td>
        <td>
          {#if reg.status != "ALLOWED"}
            Vorbehalt
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<button
  class="btn btn-success m-2 mt-5 hiddenOnPrint"
  on:click={openPrintWindow}>Teilnehmerliste drucken</button
>

<a href="./" class="btn btn-secondary m-2 mt-5 hiddenOnPrint" role="button">
  Zurück zur Übersicht
</a>

<style>
  @media print {
    .hiddenOnPrint {
      display: none;
    }
  }
</style>
