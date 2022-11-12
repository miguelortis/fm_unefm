const civilStatusEnum = Object.freeze({
	UNMARRIED: 'SOLTERO/A',
	MARRIED: 'CASADO/A',
	DIVORCED: 'DIVORCIADO/A',
	WIDOWER: 'VIUDO/A',
	OTHER: 'OTRO'
})
const categoryEnum = Object.freeze({
	TEACHER: 'DOCENTE',
	ADMINISTRATIVE: 'ADMINISTRATIVO',
	WORKMAN: 'OBRERO'
})
const personalTypeEnum = Object.freeze({
	PERMANENT: 'FIJO',
	HIRED: 'CONTRATADO'
})
const genderTypeEnum = Object.freeze({
	MALE: 'MASCULINO',
	FEMALE: 'FEMENINO'
})
const relationshipEnum = Object.freeze({
	FATHER: 'PADRE',
	MOTHER: 'MADRE',
	SONS: 'HIJO/A',
	SPOUSE: 'CONYUGE'
})

export {
  civilStatusEnum,
  categoryEnum,
  personalTypeEnum,
  genderTypeEnum,
  relationshipEnum,
}