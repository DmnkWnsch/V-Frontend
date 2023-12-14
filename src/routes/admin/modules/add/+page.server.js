import consts from "../../../../consts";

/** @type {import('./$types').Actions} */
export const actions = {
  saveModule: async ({ cookies, request }) => {
    const data = await request.formData();
    console.log(data);

    /**
     * Handling the request for adding the module to the database
     */
    let moduleData = {
      id: data.get("moduleid"),
      name: data.get("modulename"),
      credits: data.get("credits"),
    };

    const moduleReq = await fetch(consts.API_URL + "/modules/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(moduleData),
    });
    const moduleRes = await moduleReq.json();
    console.log(moduleRes);
    if (moduleReq.status != 201) {
      return { error: true, message: moduleRes.message };
    }

    /**
     * Handling the request for adding the exams to the database
     */
    let examTypeId = 1;
    while (data.has("examtype" + examTypeId)) {
      let examsData = {
        module_id: moduleData.id,
        type: data.get("examtype" + examTypeId),
      };

      const examReq = await fetch(consts.API_URL + "/exams/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examsData),
      });
      const examRes = await examReq.json();
      if (examReq.status != 201) {
        return { error: true, message: examRes.message };
      }
      console.log(examRes);

      examTypeId = examTypeId + 1;
    }

    /**
     * Handling the request for adding the different modules types for
     * the four courses to the database
     */
    consts.courses.forEach(async (course) => {
      let typeData = {
        course_id: course.id,
        module_id: moduleData.id,
        type: data.get("moduletype_" + course.shortName),
        planned_semester: data.get("plannedsemester_" + course.shortName),
      };

      const typeReq = await fetch(consts.API_URL + "/module-types/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(typeData),
      });
      const typeRes = await typeReq.json();
      if (typeReq.status != 201) {
        return { error: true, message: typeRes.message };
      }
      console.log(typeRes);
    });

    return { success: true, id: moduleData.id, name: moduleData.name };
  },
};
