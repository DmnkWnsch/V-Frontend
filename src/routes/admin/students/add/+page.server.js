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
  },
};
