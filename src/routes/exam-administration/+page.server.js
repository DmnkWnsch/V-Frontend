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
    // add module name
    const memberResultModuleReq = await fetch(consts.API_URL + "/modules/" + memberResRes[i]["module_id"], {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let memberResultModuleRes = await memberResultModuleReq.json();
    memberResultModuleRes = memberResultModuleRes[0];
    console.log(memberResultModuleRes);
    memberResRes[i] = {
      "name"		:	memberResultModuleRes["name"],
      "tags"		:	[ "schriftlich" , "PVL" ],
      "points"	:	memberResultModuleRes["credits"],
      "id"		  : memberResultModuleRes["id"],
      "sub_exams"	:	[
        {
          "name"			:	"Aufgabenkomplexe",
          "type"			:	"Prüfungsvorleistung",
          "result"		:	"bestanden",
          "points"		:	3,
          "date"			:	"Wintersemester 2023",
          "exam_content"	:	"Abgabe von Übungsaufgaben",
          "semester"		:	"Wintersemester 2022",
          "examiners"		:	"Max Mustermann, Hermann Mann, Christian Franz"
        },
        {
          "name"			:	"",
          "type"			:	"Schriftiliche Prüfung",
          "result"		:	1.0,
          "points"		:	6,
          "date"			:	"07.02.2023",
          "exam_content"	:	"schriftlich",
          "semester"		:	"Wintersemester 2022",
          "examiners"		:	"Max Mustermann, Hermann Mann, Christian Franz"
        }
      ]
    };
  }
  console.log("test");
  console.log(memberResRes[0]);
  return {
    results: memberResRes,
    overall_result : overall_result
  };
}