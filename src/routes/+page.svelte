<script>
  import LandingPage from "./admin/components/LandingPage.svelte";
  import LandingPageItem from "./admin/components/LandingPageItem.svelte";
</script>

<svelte:head>
  <title>Projekt SB-Service</title>
  <meta name="description" content="About this app" />
</svelte:head>

<LandingPage>
  <div class="container mb-5">
    <p class="text-center fs-4 mb-0 fw-bold">Teamorientiertes Praktikum</p>
    <p class="text-center fs-5">Überarbeitung des SB-Service</p>
  </div>

  <LandingPageItem title="Studierendenansicht" url="/registration">
    <p>
      Dieser Teil des Projekts beinhaltet unseren SB-Service aus Studentensicht.
    </p>
    <p>
      Hier können Prüfungen gesucht und angemeldet sowie Ergebnisse eingesehen
      werden.
    </p>
  </LandingPageItem>
  <LandingPageItem title="Administration" url="/admin">
    <p>In diesem Teil befindet sich die Verwaltungansicht.</p>
    <p>
      Hier können die gesamten Daten verwaltet werden. So können zum Beispiel
      Module erstellt oder bearbeitet, Noten vergeben oder Prüfungen geplant
      werden.
    </p>
  </LandingPageItem>
</LandingPage>
