import consts from "../../../../consts";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const regPeriodsReq = await fetch(consts.API_URL + "/registration-periods", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const regPeriodsRes = await regPeriodsReq.json();
  return {
    periods: regPeriodsRes,
  };
}
