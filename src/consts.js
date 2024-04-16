// @ts-nocheck
const API_URL = "http://85.209.49.177:3210";

const courses = [
  {
    id: 1,
    name: "Eingebettete Systeme",
    shortName: "embedded",
  },
  {
    id: 2,
    name: "Medieninformatik",
    shortName: "media",
  },
  {
    id: 3,
    name: "Verteilte Systeme",
    shortName: "distri",
  },
  {
    id: 4,
    name: "Computergraphik",
    shortName: "cg",
  },
];

const EXAM_TYPES = [
  { type: "WRITTEN", name: "Schriftliche Prüfung" },
  { type: "ORAL", name: "Mündliche Prüfung" },
  { type: "SEMINAR_PAPER", name: "Hausarbeit" },
  { type: "TASKS", name: "Prüfungsvorleistung" },
  { type: "LABORATORY", name: "Praktikum" },
];

const getExamTypeName = (type) => {
  let result = "";
  EXAM_TYPES.forEach((et) => {
    if (et.type == type) {
      result = et.name;
    }
  });

  return result;
};

export default {
  API_URL,
  courses,
  EXAM_TYPES,
  getExamTypeName,
};
