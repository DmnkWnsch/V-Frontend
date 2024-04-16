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
  import { setStoredMemberId, storedMemberId } from "./MemberIdStore";

  let isOpen = false;
  // @ts-ignore
  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<Navbar style="background-color: #0e4e3f" dark expand="md">
  <NavbarBrand>Prüfungsverwaltung</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ms-auto" navbar>
      <NavItem>
        <a
          class="nav-link"
          aria-current="page"
          class:active={$page.url.pathname === "/anmeldung"}
          href="/anmeldung">Prüfungsanmeldung</a
        >
      </NavItem>
      <NavItem>
        <a
          class="nav-link"
          aria-current="page"
          class:active={$page.url.pathname === "/exam-administration"}
          href="/exam-administration">Leistungsübersicht</a
        >
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>

<div class="container">
  Matrikelnummer für Demonstration:
  <input class="form-control" id="target_member" value={storedMemberId} />
</div>
