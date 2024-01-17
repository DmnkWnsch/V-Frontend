import consts from "../../../../consts";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const allStudentsReq = await fetch(consts.API_URL + "/members", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const allStudentsRes = await allStudentsReq.json();

  return {
    students: allStudentsRes,
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  editStudent: async ({ cookies, request }) => {
    const formData = await request.formData();
    console.log(formData);
  },
};
