<script>
  import LandingPage from "./components/LandingPage.svelte";
  import LandingPageItem from "./components/LandingPageItem.svelte";
</script>

<LandingPage>
  <LandingPageItem title="Module verwalten" url="/admin/modules"
    >Module verwalten</LandingPageItem
  >
  <LandingPageItem title="Noten verwalten" url="/admin/grades"
    >Noten verwalten</LandingPageItem
  >
  <LandingPageItem title="Prüfungsverwaltung" url="/admin/exams"
    >Prüfungen verwalten</LandingPageItem
  >
  <LandingPageItem title="Studenten verwalten" url="/admin/modules"
    >Studenten verwalten</LandingPageItem
  >
</LandingPage>
