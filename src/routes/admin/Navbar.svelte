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
      <a href="/">
        <svg
          class="me-3 nav-home"
          fill="currentColor"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
          viewBox="0 0 495.398 495.398"
          xml:space="preserve"
          stroke="#f2f2f2"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g><g id="SVGRepo_iconCarrier">
            <g>
              <g>
                <g>
                  <path
                    d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391 v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158 c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747 c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"
                  ></path>
                  <path
                    d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401 c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79 c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"
                  ></path>
                </g>
              </g>
            </g>
          </g></svg
        >
      </a>
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
  .nav-home {
    color: #f2f2f2;
    transition: color 300ms;
  }
  .nav-home:hover {
    color: var(--bs-primary);
  }
</style>
