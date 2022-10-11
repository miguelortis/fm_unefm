import Request from "../Request"

export default async function getRate(currency) {
    try {
        const res = await Request.get(`/rates/${currency}`)
        return res
      } catch (error) {
        if (error) {
          console.log(error)
        }
      }
}