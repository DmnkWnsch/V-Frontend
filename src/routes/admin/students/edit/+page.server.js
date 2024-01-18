// @ts-nocheck
import consts from "../../../../consts";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const allStudentsReq = await fetch(consts.API_URL + "/members", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const allStudentsRes = await allStudentsReq.json();

  return {
    students: allStudentsRes,
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  editStudent: async ({ cookies, request }) => {
    const formData = await request.formData();
    const action = formData.get("action");
    if (action === "delete") {
      return await deleteStudent(formData);
    } else if (action === "save") {
      return await updateStudent(formData);
    }
  },
};

const updateStudent = async (formData) => {
  const studentId = formData.get("id");

  const studentData = {
    name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    role: formData.get("role"),
  };

  const updateStudentReq = await fetch(
    consts.API_URL + "/members/" + studentId,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    }
  );

  return { success: true, id: studentId };
};

const deleteStudent = async (formData) => {
  const studentId = formData.get("id");

  const deleteStudentReq = await fetch(
    consts.API_URL + "/members/" + studentId,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return { deleted: true, id: studentId };
};
