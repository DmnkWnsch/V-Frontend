// @ts-nocheck
const formatDate = (/** @type {Date} */ date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const monthString = month < 10 ? "0" + month : month;
  const dayString = day < 10 ? "0" + day : day;
  return `${dayString}.${monthString}.${year}`;
};

const getNameByRegistrationState = (state) => {
  switch (state.toLowerCase()) {
    case "allowed":
      return "Zugelassen";
    case "conditional":
      return "Vorbehalt";
  }
};

const getColorByRegistrationState = (state) => {
  switch (state.toLowerCase()) {
    case "allowed":
      return "bg-success";
    case "conditional":
      return "bg-warning";
  }
};

const getExamShortNameByType = (type) => {
  switch (type) {
    case "WRITTEN":
      return "Schriftlich";
    case "ORAL":
      return "Mündlich";
    case "SEMINAR_PAPER":
      return "Hausarbeit";
    case "TASKS":
      return "PVL";
    case "LABORATORY":
      return "Praktikum";
  }
};

const getExamColorBadge = (type) => {
  switch (type) {
    case "WRITTEN":
      return "bg-primary";
    case "ORAL":
      return "bg-success";
    case "SEMINAR_PAPER":
      return "bg-warning";
    case "TASKS":
      return "bg-info";
    case "LABORATORY":
      return "bg-secondary";
  }
};

const getMinForDatePicker = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const monthString = month < 10 ? "0" + month : month;
  const dayString = day < 10 ? "0" + day : day;
  return `${year}-${monthString}-${dayString}`;
};

export default {
  formatDate,
  getNameByRegistrationState,
  getColorByRegistrationState,
  getMinForDatePicker,
  getExamShortNameByType,
  getExamColorBadge,
};
