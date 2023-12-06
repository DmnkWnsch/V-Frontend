<script>
// @ts-nocheck

	import '../styles.css';
	import { Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Dropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'sveltestrap';

	let isOpen = false;
  // @ts-ignore
  	function handleUpdate(event) {
    	isOpen = event.detail.isOpen;
 	}
</script>

<div class="app">
	<Navbar style="background-color: #0e4e3f" dark expand="md">
		<NavbarBrand>Prüfungsverwaltung</NavbarBrand>
		<NavbarToggler on:click={() => (isOpen = !isOpen)} />
		<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		  <Nav class="ms-auto" navbar>
			<NavItem>
<<<<<<< HEAD
			  <NavLink href="/anmeldung">Anmeldung</NavLink>
			</NavItem>
			<NavItem>
			  <NavLink href="/exam-administration">Leistungsübersicht</NavLink>
=======
			  <NavLink href="/">Anmeldung</NavLink>
			</NavItem>
			<NavItem>
			  <NavLink href="/about">Leistungsübersicht</NavLink>
>>>>>>> 9de4a80aad0f71a3bdd6bf6e7af8b5cfa7157007
			</NavItem>
		  </Nav>
		</Collapse>
	  </Navbar>

	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
