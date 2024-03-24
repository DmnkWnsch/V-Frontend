// @ts-nocheck

import consts from "../../../../consts";

/** @type {import('./$types').Actions} */
export const actions = {
  manageExaminers: async ({ cookies, request }) => {
    const formData = await request.formData();
    const action = formData.get("action");

    if (action === "new_examiner") {
      return await addExaminer(formData);
    }
  },
};

const addExaminer = async (formData) => {
  const newExaminer = {
    exam_plan_id: formData.get("planned_exam"),
    member_id: formData.get("new_examiner_id"),
  };

  const addExaminerReq = await fetch(consts.API_URL + "/examiners", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newExaminer),
  });

  const addExaminerRes = await addExaminerReq.json();
  if (addExaminerReq.status == 201) {
    return {
      success: true,
    };
  } else {
    return {
      error: true,
      message: addExaminerRes.message,
    };
  }
};
