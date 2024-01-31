<script>
  // @ts-nocheck

  import consts from "../../../../consts";
  import ExamPlanCard from "../../exams/components/ExamPlanCard.svelte";
  import MemberGradeInput from "../components/MemberGradeInput.svelte";

  export let data;

  let searchInput = "200002";
  let targetModule = {};
  let foundExams = [];

  const searchModule = async () => {
    if (searchInput?.toString().trim().length != 6) {
      return (targetModule = {});
    }

    const moduleReq = await fetch(consts.API_URL + "/modules/" + searchInput, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (moduleReq.status == 200) {
      const moduleRes = await moduleReq.json();

      if (moduleRes.length == 0) {
        return (targetModule = { name: "bist du dumm?" });
      }

      const examsReq = await fetch(
        consts.API_URL + "/modules/" + searchInput + "/exams",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const examsRes = await examsReq.json();
      foundExams = examsRes;

      return (targetModule = moduleRes[0]);
    }
  };

  const getExamTypeName = (examtype) => {
    let result = "";
    consts.EXAM_TYPES.forEach((et) => {
      if (et.type === examtype) {
        result = et.name;
      }
    });

    return result;
  };

  let memberCount = 1;
  const increaseMemberCount = () => {
    console.log("increasing member count");
    memberCount = memberCount + 1;
  };

  const decreaseMemberCount = () => {
    memberCount = memberCount - 1;
  };

  searchModule();
</script>

<svelte:head>
  <title>PV-A Notenvergabe</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container bg-light-subtle border my-4 p-3 shadow-sm">
  <form action="?/addGrades" method="POST" class="row g-3">
    <div class="col-12 fs-5">Noten vergeben</div>
    <div class="col-4">
      <label class="form-label" for="search">Modul durch Modul-ID suchen</label>
      <input
        type="number"
        class="form-control"
        id="search"
        name="search"
        placeholder="123456"
        bind:value={searchInput}
        on:input={searchModule}
      />
    </div>
    {#if targetModule.name}
      <div class="col-12 fs-5">
        Prüfungen des Moduls <b>{targetModule?.name}</b>
      </div>
      <div class="col-4">
        <label class="form-label" for="exam"
          >Prüfung zur Notenvergabe auswählen</label
        >
        <select class="form-select" id="exam" name="exam">
          {#each foundExams as exam}
            <option value={exam.id}>
              {getExamTypeName(exam.type)}
            </option>
          {/each}
        </select>
      </div>
      <div class="col-12 fs-5">
        Noten für <b>X</b> in <b>{targetModule?.name}</b> vergeben
      </div>
      {#each Array(memberCount) as _, index (index)}
        {#if index + 1 == memberCount && memberCount > 1}
          <MemberGradeInput
            id={memberCount}
            last={true}
            on:click={decreaseMemberCount}
          />
        {:else}
          <MemberGradeInput id={memberCount} />
        {/if}
      {/each}
      <div class="col-12">
        <button
          on:click={increaseMemberCount}
          type="button"
          class="btn btn-success btn-sm"
        >
          Weitere Note hinzufügen
        </button>
      </div>
    {:else if searchInput?.toString().length != 6}
      <div class="col-12">Bitte eine 6-stellige Modul-ID eingeben.</div>
    {/if}

    <div class="col-12 fs-5 mt-5">Noten vergeben</div>
    <div class="col-12">
      <button class="btn btn-success">Noten speichern</button>
    </div>
  </form>
</div>
