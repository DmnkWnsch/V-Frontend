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
  let exams_passed = memberResRes.filter(item => item["status"] == "passed");
  let overall_result = exams_passed.reduce((total, next) => total + parseFloat(next["grade"]), 0) / exams_passed.length;
  let total_points = 0;
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
    let exam_types_short = {
      "WRITTEN" : "schriftlich",
      "TASKS"   : "PVL",
      "OPAL"    : "online"
    };
    let exam_types_long = {
      "WRITTEN" : "Schriftlich Prüfung",
      "TASKS"   : "Prüfungsvorleistung",
      "OPAL"    : "Onlineklausur"
    };

    memberResRes[i] = {
      "name"		:	memberResultModuleRes["name"],
      "tags"		:	( typeof memberResultExamRes === 'undefined' ) ? "" : [ exam_types_short[ memberResultExamRes["type"] ] ],
      "points"	:	memberResultModuleRes["credits"],
      "id"		  : memberResultModuleRes["id"],
      "status"  : memberResRes[i]["status"],
      "sub_exams"	:	[
        {
          "name"			:	"",
          "type"			:	( typeof memberResultExamRes === 'undefined' ) ? "" : exam_types_long[ memberResultExamRes["type"] ],
          "result"		:	memberResRes[i]["grade"],
          "points"		:	memberResultModuleRes["credits"],
          "date"			:	"07.02.2023",
          "exam_content"	:	( typeof memberResultExamRes === 'undefined' ) ? "" : exam_types_long[ memberResultExamRes["type"] ],
          "semester"		:	"Wintersemester 2022",
          "examiners"		:	"Max Mustermann, Hermann Mann, Christian Franz"
        }
      ]
    };

    if ( memberResRes[i]["status"] == "passed" ) {
      total_points += memberResultModuleRes["credits"];
    }
  }
  return {
    results: memberResRes,
    overall_result : overall_result,
    total_points  : total_points
  };
}