// @ts-nocheck

import consts from "../../../../consts";

/** @type {import('./$types').Actions} */
export const actions = {
  manageExaminers: async ({ cookies, request }) => {
    const formData = await request.formData();
    const action = formData.get("action");

    if (action === "new_examiner") {
      return await addExaminer(formData);
    } else if (action.startsWith("delete")) {
      return await removeExaminer(formData);
    }
  },
};

const removeExaminer = async (formData) => {
  const entryId = formData.get("action").split("_")[1];

  const examiner = {
    exam_plan_id: formData.get("planned_exam"),
    member_id: formData.get("examiner_id_" + entryId),
  };

  const delExaminerReq = await fetch(consts.API_URL + "/examiners", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(examiner),
  });

  const delExaminerRes = await delExaminerReq.json();
  if (delExaminerReq.status == 200) {
    console.log(delExaminerRes);
    return {
      success: true,
      message: `Der Prüfer wurde erfolgreich entfernt.`,
    };
  } else {
    return {
      error: true,
      message: delExaminerRes.message,
    };
  }
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
      data: addExaminerRes.data,
      message: `${delExaminerRes.data.last_name}, ${delExaminerRes.data.name} (${delExaminerRes.data.id}) wurde erfolgreich
      als Prüfer festgelegt.`,
    };
  } else {
    return {
      error: true,
      message: addExaminerRes.message,
    };
  }
};
