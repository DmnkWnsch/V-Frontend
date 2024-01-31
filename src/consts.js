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
  { type: "ORAL", name: "mündliche Prüfung" },
  { type: "SEMINAR_PAPER", name: "Hausarbeit" },
  { type: "TASKS", name: "Prüfungsvorleistung" },
  { type: "LABORATORY", name: "Praktikum" },
];

export default {
  API_URL,
  courses,
  EXAM_TYPES,
};
