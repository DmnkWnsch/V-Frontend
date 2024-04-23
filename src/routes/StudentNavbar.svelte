<script>
  // @ts-nocheck

  import { page } from "$app/stores";
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from "sveltestrap";

  let isOpen = false;
  // @ts-ignore
  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<Navbar style="background-color: #0e4e3f" dark expand="md">
  <NavbarBrand>SB-Service - Prüfungen</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ms-auto" navbar>
      <NavItem>
        <a
          class="nav-link"
          aria-current="page"
          class:active={$page.url.pathname === "/registration"}
          href="/registration">Prüfungsanmeldung</a
        >
      </NavItem>
      <NavItem>
        <a
          class="nav-link"
          aria-current="page"
          class:active={$page.url.pathname === "/results"}
          href="/results">Leistungsübersicht</a
        >
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>
