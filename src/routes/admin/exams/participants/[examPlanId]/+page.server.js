import consts from "../../../../../consts";

/** @type {import('../list/[examPlanId]/$types').PageServerLoad} */
export async function load({ params }) {
  const examPlanId = params.examPlanId;

  const regs = await fetch(
    consts.API_URL + "/planned-exams/" + examPlanId + "/registrations",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const examiners = await fetch(
    consts.API_URL + "/planned-exams/" + examPlanId + "/examiners",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const examinersRes = await examiners.json();

  const response = await regs.json();
  let examInfo;

  if (response.data.length > 0) {
    const examId = response.data[0].exam_id;
    const examReq = await fetch(consts.API_URL + "/exams/" + examId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    examInfo = await examReq.json();
  }

  return {
    registrations: response.data,
    examInfo: examInfo.data[0],
    examiners: examinersRes,
  };
}
