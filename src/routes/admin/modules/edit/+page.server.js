// @ts-nocheck
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
      return await deleteModule(data);
    }
  },
};

// @ts-ignore
const deleteModule = async (data) => {
  console.log(data);
  const moduleId = data.get("moduleid");

  const deleteModuleReq = await fetch(consts.API_URL + "/modules/" + moduleId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const deleteRes = await deleteModuleReq.json();

  if (deleteModuleReq.status != 200) {
    return { error: true, message: deleteRes.message };
  }

  const deleteCourseTypesReq = await fetch(
    consts.API_URL + "/modules/" + moduleId + "/course-types",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const deleteCourseTypesRes = await deleteCourseTypesReq.json();

  const deleteExamsReq = await fetch(
    consts.API_URL + "/modules/" + moduleId + "/exams",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const deleteExamsRes = await deleteExamsReq.json();

  return { success: true, id: moduleId };
};
