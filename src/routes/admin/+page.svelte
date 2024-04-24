<script>
  import LandingPage from "./components/LandingPage.svelte";
  import LandingPageItem from "./components/LandingPageItem.svelte";
</script>

<svelte:head>
  <title>PV-A Startseite</title>
  <meta name="description" content="About this app" />
</svelte:head>

<LandingPage>
  <LandingPageItem title="Module verwalten" url="/admin/modules"
    >Module erstellen oder bearbeiten</LandingPageItem
  >
  <LandingPageItem title="Noten verwalten" url="/admin/grades"
    >Noten vergeben oder bearbeiten</LandingPageItem
  >
  <LandingPageItem title="Prüfungsverwaltung" url="/admin/exams"
    >Prüfungsplan erstellen, Prüfer festlegen, Anmeldeperioden verwalten und
    Teilnehmerlisten generieren</LandingPageItem
  >
  <LandingPageItem title="Studenten verwalten" url="/admin/students"
    >Studenten anlegen, bearbeiten und deren Prüfungsanmeldungen verwalten</LandingPageItem
  >
</LandingPage>
