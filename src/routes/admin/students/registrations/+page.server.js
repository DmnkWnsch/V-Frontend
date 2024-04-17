import consts from "../../../../consts";

/** @type {import('./$types').Actions} */
export const actions = {
  addRegistration: async ({ cookies, request }) => {
    const formData = await request.formData();

    const registration = {
      member_id: formData.get("id"),
      exam_plan_id: formData.get("planned_exam"),
      status: formData.get("status"),
      admin: true,
    };

    const registrationRequest = await fetch(consts.API_URL + "/registrations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registration),
    });

    const registrationResponse = await registrationRequest.json();
    if (registrationRequest.status == 201) {
      return {
        success: true,
        data: registrationResponse.data,
        reason: "REG_ADD",
      };
    } else {
      return {
        error: true,
        message: registrationResponse.message,
      };
    }
  },

  manageRegistration: async ({ cookies, request }) => {
    const formData = await request.formData();
    const action = formData.get("action");

    if (action === "delete") {
      const registration = {
        member_id: formData.get("id"),
        exam_plan_id: formData.get("exam_plan_id"),
        admin: true,
      };

      const deleteRegistrationRequest = await fetch(
        consts.API_URL + "/registrations",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registration),
        }
      );

      const deleteRegistrationResponse = await deleteRegistrationRequest.json();
      if (deleteRegistrationRequest.status == 200) {
        return {
          success: true,
          data: deleteRegistrationResponse.data,
          reason: "REG_DEL",
        };
      } else {
        return {
          error: true,
          message: deleteRegistrationResponse.message,
        };
      }
    } else if (action === "change_state") {
      const registration = {
        member_id: formData.get("id"),
        exam_plan_id: formData.get("exam_plan_id"),
        state: formData.get("new_state"),
      };

      const updateRegistrationRequest = await fetch(
        consts.API_URL + "/registrations",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registration),
        }
      );

      const updateRegistrationResponse = await updateRegistrationRequest.json();
      if (updateRegistrationRequest.status == 200) {
        return {
          success: true,
          data: updateRegistrationResponse.data,
          reason: "REG_UPD",
        };
      } else {
        return {
          error: true,
          message: updateRegistrationResponse.message,
        };
      }
    }
  },
};
