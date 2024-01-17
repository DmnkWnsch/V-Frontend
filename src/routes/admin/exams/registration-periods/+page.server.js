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
      savePeriod(data);
    } else if (action === "delete") {
      deletePeriod(data);
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
};
