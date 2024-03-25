<script>
  // @ts-nocheck

  import MessageBanner from "../../components/MessageBanner.svelte";
  import StudentCard from "../components/StudentCard.svelte";
  export let form;
  export let data;

  let searchTerm = "";
  let filteredStudents = [];

  const searchStudent = () => {
    // Reset filtered students if search term gets deleted
    if (searchTerm.trim().length == 0) return (filteredStudents = []);

    if (isNaN(parseInt(searchTerm))) {
      // Search term is not a number
      return (filteredStudents = data.students
        .filter((student) => {
          const fullName = student.name + " " + student.last_name;
          return fullName.includes(searchTerm);
        })
        .slice(0, 10));
    } else {
      // Search term is a number -> filter for student id
      return (filteredStudents = data.students
        .filter((student) => {
          return student.id.toString().startsWith(searchTerm);
        })
        .slice(0, 10));
    }
  };
</script>

<svelte:head>
  <title>PV-A Studierendenverwaltung</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container bg-light-subtle border my-4 p-3 shadow-sm">
  {#if form?.success}
    <MessageBanner type="success">
      Student mit Matrikelnummer {form?.id} wurde erfolgreich gespeichert!
    </MessageBanner>
  {/if}
  {#if form?.error}
    <MessageBanner type="error">
      {form?.message}
    </MessageBanner>
  {/if}
  {#if form?.deleted}
    <MessageBanner type="success">
      Student mit Matrikelnummer {form?.id} wurde erfolgreich gelöscht!
    </MessageBanner>
  {/if}

  <div class="row g-3">
    <div class="col-12 fs-5">Studierenden bearbeiten</div>
    <div class="col-6">
      <label for="search-field" class="form-label"
        >Namen oder Matrikelnummer eingeben:</label
      >
      <input
        type="text"
        class="form-control"
        id="search-field"
        bind:value={searchTerm}
        on:input={searchStudent}
      />
    </div>
    <div class="col-12">
      <div class="row row-cols-1 row-cols-md-2">
        {#each filteredStudents as student}
          <div class="col">
            <StudentCard
              id={student.id}
              firstName={student.name}
              lastName={student.last_name}
              role={student.role}
            />
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
