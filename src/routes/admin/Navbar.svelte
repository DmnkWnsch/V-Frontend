<script>
  import { page } from "$app/stores";
  import logo from "$lib/images/svelte-logo.svg";
  import github from "$lib/images/github.svg";

  const navElements = {
    Module: "/admin/modules",
    Noten: "/admin/grades",
    Prüfungsverwaltung: "/admin/exams",
    Studentenverwaltung: "/admin/students",
  };
</script>

<header>
  <nav
    data-bs-theme="dark"
    class="navbar navbar-expand-lg"
    style="background-color: #660000"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="/admin/">Administration</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          {#each Object.entries(navElements) as [name, path]}
            <li class="nav-item">
              <a
                class="nav-link"
                aria-current="page"
                class:active={$page.url.pathname.startsWith(path)}
                href={path}>{name}</a
              >
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </nav>
</header>

<style>
</style>
