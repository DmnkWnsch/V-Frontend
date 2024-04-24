<script>
  import LandingPage from "../components/LandingPage.svelte";
  import LandingPageItem from "../components/LandingPageItem.svelte";
</script>

<svelte:head>
  <title>PV-A Prüfungsverwaltung</title>
  <meta name="description" content="About this app" />
</svelte:head>

<LandingPage>
  <LandingPageItem title="Planen von Prüfungen" url="/admin/exams/plan">
    Prüfungstermine festlegen
  </LandingPageItem>

  <LandingPageItem title="Prüfer festlegen" url="/admin/exams/examiners">
    Festlegen, welche Prüfer für welche Prüfung verantwortlich sind
  </LandingPageItem>

  <LandingPageItem
    title="Anmeldeperioden verwalten"
    url="/admin/exams/registration-periods"
  >
    Anmeldeperioden erstellen oder bearbeiten
  </LandingPageItem>

  <LandingPageItem
    title="Teilnehmerlisten erstellen"
    url="/admin/exams/participants"
  >
    Teilnehmerlisten erstellen
  </LandingPageItem>
</LandingPage>
