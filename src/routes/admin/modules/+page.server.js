/** @type {import('./$types').Actions} */
export const actions = {
  saveModule: async ({ cookies, request }) => {
    const courses = ["embedded", "media", "distri", "cg"];
    const data = await request.formData();
    console.log(data);

    // Create the data that will be send to /modules/
    let moduleData = {
      id: data.get("moduleid"),
      name: data.get("modulename"),
      credits: data.get("credits"),
    };

    // Create the data that will be send to /exams/
    let examsData = {
      module_id: moduleData.id,
      type: data.get("examtype1"),
    };

    const examReq = await fetch("http://localhost:3210/exams/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(examsData),
    });
    const examRes = await examReq.json();
    console.log(examRes);

    let courseId = 1;
    courses.forEach(async (course) => {
      let typeData = {
        course_id: courseId,
        module_id: moduleData.id,
        type: data.get("moduletype_" + course),
        planned_semester: data.get("plannedsemester_" + course),
      };
      courseId++;

      const typeReq = await fetch("http://localhost:3210/module-types/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(typeData),
      });
      const typeRes = await typeReq.json();
      console.log(typeRes);
    });

    const moduleReq = await fetch("http://localhost:3210/modules/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(moduleData),
    });
    const moduleRes = await moduleReq.json();
    console.log(moduleRes);

    return { success: true, id: moduleData.id, name: moduleData.name };
  },
};
