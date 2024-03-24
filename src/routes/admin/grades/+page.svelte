<script>
  import LandingPage from "../components/LandingPage.svelte";
  import LandingPageItem from "../components/LandingPageItem.svelte";
</script>

<LandingPage>
  <LandingPageItem title="Notenvergabe" url="/admin/grades/add">
    Hier können Noten für verschiedene Module vergeben werden.
  </LandingPageItem>

  <LandingPageItem title="Noten bearbeiten" url="/admin/grades/edit">
    In diesem Bereich können Noten für verschiedene Module bearbeitet werden.
  </LandingPageItem>
</LandingPage>
