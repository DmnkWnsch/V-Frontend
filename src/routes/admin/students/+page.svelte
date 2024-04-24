<script>
  import LandingPage from "../components/LandingPage.svelte";
  import LandingPageItem from "../components/LandingPageItem.svelte";
</script>

<svelte:head>
  <title>PV-A Studentenverwaltung</title>
  <meta name="description" content="About this app" />
</svelte:head>

<LandingPage>
  <LandingPageItem title="Student anlegen" url="/admin/students/add">
    Einen neuen Studenten anlegen
  </LandingPageItem>

  <LandingPageItem title="Student bearbeiten" url="/admin/students/edit">
    Daten eines Studenten bearbeiten
  </LandingPageItem>

  <LandingPageItem
    title="Prüfungsanmeldungen verwalten"
    url="/admin/students/registrations"
  >
    Prüfungsanmeldungen einsehen und bearbeiten
  </LandingPageItem>
</LandingPage>
