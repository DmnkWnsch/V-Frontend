// @ts-nocheck
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

/** @type {import('./$types').Actions} */
export const actions = {
  planExam: async ({ cookies, request }) => {
    const data = await request.formData();

    const exam = {
      exam_id: data.get("exam"),
      date: data.get("date"),
      register_period_id: data.get("reg_period"),
    };

    const planExamReq = await fetch(consts.API_URL + "/planned-exams/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exam),
    });

    const planExamRes = await planExamReq.json();
    if (planExamReq.status == 201) {
      return {
        success: true,
        reason: "EX_CRE",
      };
    } else {
      return {
        error: true,
        message: planExamRes.message,
      };
    }
  },

  managePlannedExam: async ({ cookies, request }) => {
    const formData = await request.formData();
    const action = formData.get("action");

    if (action === "delete") {
      return await deletePlannedExam(formData);
    } else if (action === "save_date") {
      return await updatePlannedExam(formData);
    }
  },
};

const deletePlannedExam = async (formData) => {
  const plannedExamData = {
    plan_id: formData.get("examplan_uid"),
  };

  const deleteExamRequest = await fetch(consts.API_URL + "/planned-exams", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plannedExamData),
  });

  const deleteExamResponse = await deleteExamRequest.json();
  if (deleteExamRequest.status == 200) {
    return {
      success: true,
      data: deleteExamResponse.data,
      reason: "EX_DEL",
    };
  } else {
    return {
      error: true,
      message: deleteExamResponse.message,
    };
  }
};

const updatePlannedExam = async (formData) => {
  const plannedExamData = {
    plan_id: formData.get("examplan_uid"),
    date: formData.get("date"),
  };

  const updateExamRequest = await fetch(consts.API_URL + "/planned-exams", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plannedExamData),
  });

  const updateExamResponse = await updateExamRequest.json();

  if (updateExamRequest.status == 200) {
    return {
      success: true,
      data: updateExamResponse.data,
      reason: "EX_UPD",
    };
  } else {
    return {
      error: true,
      message: updateExamResponse.message,
    };
  }
};
