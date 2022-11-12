
const calculateAge = (dateBirt)=>{
  const today = new Date()
  const birthday = new Date(dateBirt)
  let age = today.getFullYear() - birthday.getFullYear()
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return age
}
export default calculateAge