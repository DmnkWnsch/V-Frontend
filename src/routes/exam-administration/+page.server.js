import consts from "../../consts";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

  const memberResReq = await fetch(consts.API_URL + "/members/100000/results", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const memberResRes = await memberResReq.json();
  console.log(memberResRes);
  return {
    results: memberResRes
  };
}