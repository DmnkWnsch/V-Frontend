// @ts-nocheck
import consts from "../../../../consts";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const regPeriodsReq = await fetch(consts.API_URL + "/registration-periods", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const regPeriodsRes = await regPeriodsReq.json();

  return {
    periods: regPeriodsRes,
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  editPeriod: async ({ cookies, request }) => {
    const data = await request.formData();
    const action = data.get("action");
    if (action === "save") {
      return await savePeriod(data);
    } else if (action === "delete") {
      return await deletePeriod(data);
    }
  },
  addPeriod: async ({ cookies, request }) => {
    const data = await request.formData();

    const periodData = {
      name: data.get("period_name"),
      start_date: data.get("start_date"),
      end_date: data.get("end_date"),
    };

    const addPeriodReq = await fetch(
      consts.API_URL + "/registration-periods/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(periodData),
      }
    );

    const addPeriodRes = await addPeriodReq.json();
    if (addPeriodReq.status == 200) {
      return {
        success: true,
        reason: "add",
        data: addPeriodRes.data,
      };
    } else {
      return {
        error: true,
        message: addPeriodRes.message,
      };
    }
  },
};

const savePeriod = async (formData) => {
  const periodId = formData.get("id");

  const periodData = {
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date"),
  };

  const savePeriodReq = await fetch(
    consts.API_URL + "/registration-periods/" + periodId,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(periodData),
    }
  );

  const savePeriodRes = await savePeriodReq.json();
  if (savePeriodReq.status == 200) {
    return {
      success: true,
      reason: "save",
      data: savePeriodRes.data,
    };
  } else {
    return {
      error: true,
      message: savePeriodRes.message,
    };
  }
};

const deletePeriod = async (formData) => {
  const periodId = formData.get("id");

  const deletePeriodReq = await fetch(
    consts.API_URL + "/registration-periods/" + periodId,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const deletePeriodRes = await deletePeriodReq.json();
  if (deletePeriodReq.status == 200) {
    return {
      success: true,
      reason: "delete",
      data: deletePeriodRes.data,
    };
  } else {
    return {
      error: true,
      message: deletePeriodRes.message,
    };
  }
};
