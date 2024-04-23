// @ts-nocheck
import consts from "../../consts";
import { getDemoMemberId, setNewDemoMemberId } from "../demo";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const storedMemberId = await getDemoMemberId();

  const ModulesReq = await fetch(consts.API_URL + "/modules", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  /*const courseOneModulesReq = await fetch(consts.API_URL + "courses/1/modules" , {
                method: "GET",
                headers: { "Content-Type": "application/json",},});                      
        const courseTwoModulesReq = await fetch(consts.API_URL + "courses/2/modules" , {
                method: "GET",
                headers: { "Content-Type": "application/json",},});
        const courseThreeModulesReq = await fetch(consts.API_URL + "courses/3/modules" , {
                method: "GET",
                headers: { "Content-Type": "application/json",},});
        const courseFourModulesReq = await fetch(consts.API_URL + "courses/4/modules" , {
                method: "GET",
                headers: { "Content-Type": "application/json",},});*/
  const ModulesRes = await ModulesReq.json();
  /*const courseOneModulesRes = await courseOneModulesReq.json();
        const courseTwoModulesRes = await courseTwoModulesReq.json();
        const courseThreeModulesRes = await courseThreeModulesReq.json();
        const courseFourModulesRes = await courseFourModulesReq.json();*/

  const registrationsRequest = await fetch(
    consts.API_URL + "/members/" + storedMemberId + "/registrations",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const registrationsResponse = await registrationsRequest.json();

  const resultsRequest = await fetch(
    consts.API_URL + "/members/" + storedMemberId + "/results",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const resultsResponse = await resultsRequest.json();

  return {
    modules: ModulesRes,
    registrations: registrationsResponse.data,
    results: resultsResponse,
    demoId: storedMemberId,
    /*courseOneModules: courseOneModulesRes,
                courseTwoModules: courseTwoModulesRes,
                courseThreeModules: courseThreeModulesRes,
                courseFourModules: courseFourModulesRes,*/
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  manageDemoId: async ({ cookies, request }) => {
    const formData = await request.formData();
    const newDemoId = formData.get("demo_id");

    await setNewDemoMemberId(newDemoId);
  },

  register: async ({ cookies, request }) => {
    const formData = await request.formData();

    const registration = {
      member_id: formData.get("member"),
      exam_plan_id: formData.get("plan_id"),
    };

    const registrationRequest = await fetch(consts.API_URL + "/registrations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registration),
    });

    const registrationResponse = await registrationRequest.json();
    if (registrationRequest.status == 201) {
      return {
        success: true,
        data: registrationResponse.data,
        reason: "REG_SUC",
      };
    } else {
      return {
        error: true,
        message: registrationResponse.message,
      };
    }
  },
  unregister: async ({ cookies, request }) => {
    const formData = await request.formData();

    const registration = {
      member_id: formData.get("member"),
      exam_plan_id: formData.get("plan_id"),
    };

    const deleteRegistrationRequest = await fetch(
      consts.API_URL + "/registrations",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registration),
      }
    );

    const deleteRegistrationResponse = await deleteRegistrationRequest.json();
    if (deleteRegistrationRequest.status == 200) {
      return {
        success: true,
        data: deleteRegistrationResponse.data,
        reason: "UNREG_SUC",
      };
    } else {
      return {
        error: true,
        message: deleteRegistrationResponse.message,
      };
    }
  },
};
