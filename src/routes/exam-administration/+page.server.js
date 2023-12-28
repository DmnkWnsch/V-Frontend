import consts from "../../consts";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

  const memberResReq = await fetch(consts.API_URL + "/members/100000/results", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let memberResRes = await memberResReq.json();
  let overall_result = memberResRes.reduce((total, next) => total + next["grade"], 0) / memberResRes.length;
  // iterate over results and append missing information
  for ( let i = 0 ; i < memberResRes.length ; i++ ) {
    // add module data
    const memberResultModuleReq = await fetch(consts.API_URL + "/modules/" + memberResRes[i]["module_id"], {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let memberResultModuleRes = await memberResultModuleReq.json();
    memberResultModuleRes = memberResultModuleRes[0];
    // add exam data
    const memberResultExamReq = await fetch(consts.API_URL + "/exams", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let memberResultExamRes = await memberResultExamReq.json();
    memberResultExamRes = memberResultExamRes.filter(function (el) {
      return  el["id"] == memberResRes[i]["exam_id"];
    })[0];
    let exam_types = {
      "WRITTEN" : "schriftlich",
      "TASKS"   : "PVL",
      "OPAL"    : "online"
    };

    memberResRes[i] = {
      "name"		:	memberResultModuleRes["name"],
      "tags"		:	[ exam_types[ memberResultExamRes["type"] ] ],
      "points"	:	memberResultModuleRes["credits"],
      "id"		  : memberResultModuleRes["id"],
      "sub_exams"	:	[
        {
          "name"			:	"",
          "type"			:	"Schriftliche Prüfung",
          "result"		:	memberResRes[i]["grade"],
          "points"		:	memberResultModuleRes["credits"],
          "date"			:	"07.02.2023",
          "exam_content"	:	exam_types[ memberResultExamRes["type"] ],
          "semester"		:	"Wintersemester 2022",
          "examiners"		:	"Max Mustermann, Hermann Mann, Christian Franz"
        }
      ]
    };
  }
  return {
    results: memberResRes,
    overall_result : overall_result
  };
}