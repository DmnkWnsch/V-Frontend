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
  // append more exam information
  let memberResCourseModulesRes = [];
  for ( let i = 0 ; i < consts.courses.length ; i++ ) {
    const memberResCourseModulesReq = await fetch(consts.API_URL + "/courses/" + consts.courses[i]["id"] + "/modules", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    memberResCourseModulesRes.push(...await memberResCourseModulesReq.json());
  }

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
    const memberResultExamReq = await fetch(consts.API_URL + "/modules/" + memberResRes[i]["module_id"] + "/exams", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let memberResultExamRes = await memberResultExamReq.json();
    memberResultExamRes = memberResultExamRes.filter(function (el) {
      return  el["id"] == memberResRes[i]["exam_id"];
    })[0];

    let course_information = memberResCourseModulesRes.filter(item => item["module_id"] == memberResultModuleRes["id"] )[0];


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
      "name"		          :	memberResultModuleRes["name"],
      "tags"		          :	( typeof memberResultExamRes === 'undefined' ) ? "" : [ exam_types_short[ memberResultExamRes["type"] ] ],
      "points"	          :	memberResultModuleRes["credits"],
      "id"		            : memberResultModuleRes["id"],
      "status"            : memberResRes[i]["status"],
      "type"              : course_information["type"],
      "planned_semester"  : course_information["planned_semester"],
      "course_id"         : course_information["course_id"],
      "sub_exams"	:	[
        {
          "name"			:	memberResultModuleRes["name"],
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

  // group subexams
  // Create a mapping of objects based on their "id" values
  const groupedById = memberResRes.reduce((accumulator, currentValue) => {
    const id = currentValue.id;

    // If the id is already present in the accumulator, push the current object's sub_exams and tags to the existing entry
    if (accumulator[id]) {
      accumulator[id].sub_exams.push(...currentValue.sub_exams);
      accumulator[id].tags = [...new Set([...accumulator[id].tags, ...currentValue.tags])];
    } else {
      // If the id is not present, create a new object with the current value's sub_exams and tags
      accumulator[id] = {
        ...currentValue,
        sub_exams: [...currentValue.sub_exams],
        tags: [...currentValue.tags]
      };
    }

    return accumulator;
  }, {});

  memberResRes = Object.values(groupedById);

  return {
    results: memberResRes,
    overall_result : overall_result,
    total_points  : total_points
  };
}