import Request from "../Request"

export default async function getPackage() {
    try {
        //const res = await Request.put(`/packages/update/${'userId'}/packageId`)
        const res = await Request.get(`/packages/${'625f23cbd90c78c0d95507c6'}`)
        console.log(res)
        return res
      } catch (error) {
        if (error?.response?.status === 401) {
          console.log(error)
        }
      }
}