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
      };
    } else {
      return {
        error: true,
        message: planExamRes.message,
      };
    }
  },
};
