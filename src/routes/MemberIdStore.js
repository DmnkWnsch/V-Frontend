// @ts-nocheck
export let storedMemberId = "100002";

export const setStoredMemberId = (memberId) => {
  console.log("new id: " + memberId);
  storedMemberId = memberId;
};
