<script>
  import LandingPage from "../components/LandingPage.svelte";
  import LandingPageItem from "../components/LandingPageItem.svelte";
</script>

<svelte:head>
  <title>PV-A Notenverwaltung</title>
  <meta name="description" content="About this app" />
</svelte:head>

<LandingPage>
  <LandingPageItem title="Notenvergabe" url="/admin/grades/add">
    Hier können Noten für verschiedene Module vergeben werden.
  </LandingPageItem>

  <LandingPageItem title="Noten bearbeiten" url="/admin/grades/edit">
    In diesem Bereich können Noten für verschiedene Module bearbeitet werden.
  </LandingPageItem>
</LandingPage>
