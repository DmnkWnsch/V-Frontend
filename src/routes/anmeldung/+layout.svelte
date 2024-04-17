<script>
  // @ts-nocheck

  import StudentNavbar from "../StudentNavbar.svelte";
  import "../styles.css";

  let isOpen = false;
  // @ts-ignore
  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<div class="app">
  <StudentNavbar />
  <!--<Navbar style="background-color: #0e4e3f" dark expand="md">
    <NavbarBrand>Prüfungsverwaltung</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar>
        <NavItem>
          <NavLink href="/" active>Prüfungsanmeldung</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/exam-administration">Leistungsübersicht</NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>-->

  <slot />
</div>
========

<!--<slot />-->

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
