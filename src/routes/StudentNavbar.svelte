<script>
  // @ts-nocheck

  import { page } from "$app/stores";
  import { get } from "svelte/store";
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

  let memberIdInput = storedMemberId;
  const setNewMemberId = () => {
    if (memberIdInput.toString().trim().length == 6) {
      setStoredMemberId(memberIdInput);
    } else {
      // Show error message
    }
  };
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

<div class="container mt-3">
  <div class="alert alert-warning">
    <div class="row g-3 d-flex align-items-center">
      <div class="col"><b>Matrikelnummer für Demonstration:</b></div>
      <div class="col">
        <div class="input-group">
          <input
            class="form-control"
            id="target_member"
            type="number"
            min="100000"
            max="999999"
            bind:value={memberIdInput}
          />
          <button
            class="btn btn-primary"
            type="button"
            on:click={setNewMemberId}>Setzen</button
          >
        </div>
      </div>
    </div>
  </div>
</div>
