<script>
  import LandingPage from "../components/LandingPage.svelte";
  import LandingPageItem from "../components/LandingPageItem.svelte";
</script>

<LandingPage>
  <LandingPageItem title="Student anlegen" url="/admin/students/add">
    Einen neuen Studenten anlegen
  </LandingPageItem>

  <LandingPageItem title="Student bearbeiten" url="/admin/students/edit">
    Daten eines Studenten bearbeiten
  </LandingPageItem>
</LandingPage>
