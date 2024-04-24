<script>
  import LandingPage from "../components/LandingPage.svelte";
  import LandingPageItem from "../components/LandingPageItem.svelte";
</script>

<svelte:head>
  <title>PV-A Modulverwalting</title>
  <meta name="description" content="About this app" />
</svelte:head>

<LandingPage>
  <LandingPageItem title="Module hinzufügen" url="/admin/modules/add">
    In diesem Bereich werden neue Module mit ihren zugehörigen Prüfungen
    angelegt.
  </LandingPageItem>

  <LandingPageItem title="Module bearbeiten" url="/admin/modules/edit">
    In diesem Bereich können die bereits bestehenden Module bearbeitet werden.<br
    /><b>Achtung:</b> Modul-IDs können nicht verändert werden.
  </LandingPageItem>
</LandingPage>
