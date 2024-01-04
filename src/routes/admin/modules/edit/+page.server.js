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
    } else if (action === "save") {
      return await updateModule(data);
    }
  },
};

const updateModule = async (data) => {
  const moduleId = data.get("moduleid");

  const moduleData = {
    name: data.get("modulename"),
    credits: data.get("credits"),
  };

  const updateModuleReq = await fetch(consts.API_URL + "/modules/" + moduleId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(moduleData),
  });

  const deleteExamsReq = await fetch(
    consts.API_URL + "/modules/" + moduleId + "/exams",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  /**
   * Handling the request for adding the exams to the database
   */
  let examTypeId = 1;
  while (data.has("examtype" + examTypeId)) {
    let examsData = {
      module_id: moduleId,
      type: data.get("examtype" + examTypeId),
    };

    const examReq = await fetch(consts.API_URL + "/exams/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(examsData),
    });
    const examRes = await examReq.json();
    if (examReq.status != 201) {
      return { error: true, message: examRes.message };
    }
    console.log(examRes);

    examTypeId = examTypeId + 1;
  }

  consts.courses.forEach(async (course) => {
    let moduleTypeData = {
      course_id: course.id,
      module_id: moduleId,
      type: data.get("moduletype_" + course.shortName),
      planned_semester: data.get("plannedsemester_" + course.shortName),
    };

    const moduleTypeUpdateReq = await fetch(consts.API_URL + "/module-types/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(moduleTypeData),
    });
  });
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
