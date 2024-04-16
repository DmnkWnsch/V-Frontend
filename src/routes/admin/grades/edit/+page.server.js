// @ts-nocheck
import consts from "../../../../consts";

/** @type {import('./$types').Actions} */
export const actions = {
  manageResults: async ({ cookies, request }) => {
    const formData = await request.formData();
    const action = formData.get("action");

    if (action === "save_grade") {
      return await updateResult(formData);
    } else if (action === "delete") {
      return await deleteResult(formData);
    }
  },
};

const deleteResult = async (formData) => {
  const resultData = {
    member_id: formData.get("id"),
    exam_id: formData.get("examId"),
    try: formData.get("try"),
  };

  const deleteResultRequest = await fetch(consts.API_URL + "/results", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resultData),
  });

  const deleteResultResponse = await deleteResultRequest.json();
  if (deleteResultRequest.status == 200) {
    return {
      success: true,
      data: deleteResultResponse.data,
      reason: "RES_DEL",
    };
  } else {
    return {
      error: true,
      message: deleteResultResponse.message,
    };
  }
};

const updateResult = async (formData) => {
  const resultData = {
    member_id: formData.get("id"),
    exam_id: formData.get("examId"),
    try: formData.get("try"),
    grade: formData.get("new_grade"),
  };

  const updateResultRequest = await fetch(consts.API_URL + "/results", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resultData),
  });

  const updateResultResponse = await updateResultRequest.json();
  if (updateResultRequest.status == 200) {
    return {
      success: true,
      data: updateResultResponse.data,
      reason: "RES_UPD",
    };
  } else {
    return {
      error: true,
      message: updateResultResponse.message,
    };
  }
};
