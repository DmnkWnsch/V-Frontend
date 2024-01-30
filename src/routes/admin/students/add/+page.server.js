import consts from "../../../../consts";

/** @type {import('./$types').Actions} */
export const actions = {
  addStudent: async ({ cookies, request }) => {
    const data = await request.formData();

    const newStudent = {
      name: data.get("first_name"),
      last_name: data.get("last_name"),
      role: data.get("role"),
    };

    const addStudentReq = await fetch(consts.API_URL + "/members/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    });
    const addStudentRes = await addStudentReq.json();
    const studentData = addStudentRes.data;

    if (addStudentReq.status == 201) {
      return {
        success: true,
        last_name: studentData.lastName,
        first_name: studentData.name,
        id: studentData.id,
      };
    } else {
      return { error: true, message: addStudentRes.message };
    }
  },
};
