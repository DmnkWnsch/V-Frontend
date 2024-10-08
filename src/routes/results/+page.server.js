// @ts-nocheck
import consts from "../../consts";
import util from "../../util";
import { getDemoMemberId, setNewDemoMemberId } from "../demo";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const demoId = await getDemoMemberId();

  const memberResReq = await fetch(
    consts.API_URL + "/members/" + demoId + "/results",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let memberResRes = await memberResReq.json();
  let exams_passed = memberResRes.filter((item) => item["status"] == "PASSED");
  let overall_result = (
    exams_passed.reduce((total, next) => total + parseFloat(next["grade"]), 0) /
    exams_passed.length
  ).toFixed(2);
  let total_points = 0;
  // append more exam information
  let memberResCourseModulesRes = [];
  for (let i = 0; i < consts.courses.length; i++) {
    const memberResCourseModulesReq = await fetch(
      consts.API_URL + "/courses/" + consts.courses[i]["id"] + "/modules",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    memberResCourseModulesRes.push(...(await memberResCourseModulesReq.json()));
  }

  // iterate over results and append missing information
  for (let i = 0; i < memberResRes.length; i++) {
    // add module data
    const memberResultModuleReq = await fetch(
      consts.API_URL + "/modules/" + memberResRes[i]["module_id"],
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let memberResultModuleRes = await memberResultModuleReq.json();
    memberResultModuleRes = memberResultModuleRes[0];
    // add exam data
    const memberResultExamReq = await fetch(
      consts.API_URL + "/modules/" + memberResRes[i]["module_id"] + "/exams",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let memberResultExamRes = await memberResultExamReq.json();
    memberResultExamRes = memberResultExamRes.filter(function (el) {
      return el["id"] == memberResRes[i]["exam_id"];
    })[0];

    let course_information = memberResCourseModulesRes.filter(
      (item) => item["module_id"] == memberResultModuleRes["id"]
    );

    memberResRes[i] = {
      name: memberResultModuleRes["name"],
      tags:
        typeof memberResultExamRes === "undefined"
          ? ""
          : [memberResultExamRes["type"]],
      points: memberResultModuleRes["credits"],
      id: memberResultModuleRes["id"],
      status: memberResRes[i]["status"],
      type: course_information[0]["type"],
      planned_semester: course_information[0]["planned_semester"],
      course_id: course_information
        .filter((item) => ["BASE", "FIELD_MODULE"].includes(item["type"]))
        .map((obj) => obj["course_id"]),
      sub_exams: [
        {
          name: memberResultModuleRes["name"],
          type:
            typeof memberResultExamRes === "undefined"
              ? ""
              : memberResultExamRes["type"],
          result: memberResRes[i]["grade"],
          try: memberResRes[i]["try"],
          points: memberResultModuleRes["credits"],
          date: "07.02.2023",
          exam_content:
            typeof memberResultExamRes === "undefined"
              ? ""
              : consts.getExamTypeName(memberResultExamRes["type"]),
          semester: memberResRes[i]["term"],
        },
      ],
    };

    if (
      memberResRes[i]["status"] == "PASSED" &&
      memberResRes[i]["tags"][0] != "TASKS"
    ) {
      total_points += memberResultModuleRes["credits"];
    }
  }

  // group subexams
  // Create a mapping of objects based on their "id" values
  const groupedById = memberResRes.reduce((accumulator, currentValue) => {
    const id = currentValue.id;

    // If the id is already present in the accumulator, push the current object's sub_exams and tags to the existing entry
    if (accumulator[id]) {
      accumulator[id].sub_exams.push(...currentValue.sub_exams);
      accumulator[id].tags = [
        ...new Set([...accumulator[id].tags, ...currentValue.tags]),
      ];
    } else {
      // If the id is not present, create a new object with the current value's sub_exams and tags
      accumulator[id] = {
        ...currentValue,
        sub_exams: [...currentValue.sub_exams],
        tags: [...currentValue.tags],
      };
    }

    return accumulator;
  }, {});

  memberResRes = Object.values(groupedById);

  if (isNaN(overall_result)) {
    overall_result = "-";
  }

  return {
    results: memberResRes,
    overall_result: overall_result,
    total_points: total_points,
    demoId: demoId,
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  manageDemoId: async ({ cookies, request }) => {
    const formData = await request.formData();
    const newDemoId = formData.get("demo_id");

    await setNewDemoMemberId(newDemoId);
  },
};
