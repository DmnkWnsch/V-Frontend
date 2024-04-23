// @ts-nocheck

/**
 * This file does only exist because we need a demo id for displaying data
 * Instead of a member id from a user account we use this demo id which
 * can be dynamically set while browsing the page
 */

import consts from "../consts";

export const getDemoMemberId = async () => {
  const demoIdReq = await fetch(consts.API_URL + "/demo", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const result = await demoIdReq.json();

  return result.data.member_id;
};

export const setNewDemoMemberId = async (newId) => {
  const newMemberId = {
    member_id: newId,
  };

  const demoIdReq = await fetch(consts.API_URL + "/demo", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMemberId),
  });

  const result = await demoIdReq.json();

  return result;
};
