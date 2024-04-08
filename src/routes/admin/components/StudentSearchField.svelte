<script>
  import consts from "../../../consts";

  export let targetMember = {};
  export let memberFound = false;
  export let isLoading = false;

  let searchInput = "";

  const searchMemberByID = async () => {
    memberFound = false;

    if (searchInput?.toString().trim().length != 6) {
      return (targetMember = {});
    }

    isLoading = true;

    const memberRequest = await fetch(
      consts.API_URL + "/members/" + searchInput,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (memberRequest.status == 200) {
      const response = await memberRequest.json();

      if (response.length == 0) {
        isLoading = false;
        return (targetMember = { error: true });
      }

      memberFound = true;
      isLoading = false;
      return (targetMember = response[0]);
    }
  };
</script>

<label for="search" class="form-label"
  >Student durch Matrikelnummer suchen</label
>
<input
  type="number"
  class="form-control"
  id="search"
  name="search"
  placeholder="123456"
  bind:value={searchInput}
  on:input={searchMemberByID}
/>
