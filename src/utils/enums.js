const civilStatusEnum = Object.freeze({
  UNMARRIED: "SOLTERO/A",
  MARRIED: "CASADO/A",
  DIVORCED: "DIVORCIADO/A",
  WIDOWER: "VIUDO/A",
  OTHER: "OTRO",
});
const categoryEnum = Object.freeze({
  TEACHER: "DOCENTE",
  ADMINISTRATIVE: "ADMINISTRATIVO",
  WORKMAN: "OBRERO",
});
const personalTypeEnum = Object.freeze({
  PERMANENT: "FIJO",
  HIRED: "CONTRATADO",
});
const genderTypeEnum = Object.freeze({
  MALE: "MASCULINO",
  FEMALE: "FEMENINO",
});
const relationshipEnum = Object.freeze({
  FATHER: "PADRE",
  MOTHER: "MADRE",
  SONS: "HIJO/A",
  SPOUSE: "CONYUGE",
});
const sidebarOptionsKeyEnum = Object.freeze({
  INICIO: 1,
  PERFIL: 2,
  FAMILIARES: 3,
  ROLES: 5,
  CONSULTAS: 6,
  LABORATORIO: 7,
  //LABORATORIO: 7,
});

export {
  civilStatusEnum,
  categoryEnum,
  personalTypeEnum,
  genderTypeEnum,
  relationshipEnum,
};
