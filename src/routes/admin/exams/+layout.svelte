<script>
  import { page } from "$app/stores";

  const navElements = {
    Prüfungsplan: "/admin/exams/plan",
    Prüfer: "/admin/exams/examiners",
    Anmeldeperioden: "/admin/exams/registration-periods",
  };
</script>

<h3 class="text-center mt-4">Prüfungsverwaltung</h3>

<div class="container d-flex justify-content-center">
  <ul class="nav nav-underline">
    {#each Object.entries(navElements) as [name, path]}
      <li class="nav-item">
        <a
          class="nav-link pb-0"
          aria-current="page"
          class:active={$page.url.pathname === path}
          href={path}><h5>{name}</h5></a
        >
      </li>
    {/each}
  </ul>
</div>

<slot />
