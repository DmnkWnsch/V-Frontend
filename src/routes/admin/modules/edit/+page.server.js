/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const allModulesReq = await fetch("http://localhost:3210/modules", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const allModulesRes = await allModulesReq.json();

  return {
    modules: allModulesRes,
  };
}
