import consts from "../../../../consts";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const allModulesReq = await fetch(consts.API_URL + "/modules", {
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

/** @type {import('./$types').Actions} */
export const actions = {
  saveModule: async ({ cookies, request }) => {
    const data = await request.formData();
    // Action determines if the module should be deleted or modified
    const action = data.get("action");
    if (action === "delete") {
      deleteModule(data);
    }
  },
};

// @ts-ignore
const deleteModule = async (data) => {
  console.log(data);
  const moduleId = data.get("moduleid");
  console.log("deleting " + moduleId);
};
