import consts from "../../../../consts";

/** @type {import('./$types').Actions} */
export const actions = {
  addGrades: async ({ cookies, request }) => {
    const formData = await request.formData();

    let currentStudent = 1;
    while (formData.has("studentid_" + currentStudent)) {
      let resultData = {
        member_id: formData.get("studentid_" + currentStudent),
        module_id: formData.get("moduleid"),
        exam_id: formData.get("exam"),
        grade: formData.get("grade_" + currentStudent),
        term: formData.get("term"),
      };

      const resultReq = await fetch(consts.API_URL + "/results/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultData),
      });

      currentStudent = currentStudent + 1;
    }

    return { success: true };
  },
};
