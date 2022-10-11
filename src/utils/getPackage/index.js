import Request from "../Request"

export default async function getPackage(userId) {
    try {
        //const res = await Request.put(`/packages/update/${'userId'}/packageId`)
        const res = await Request.get(`/packages/${userId}`)
        return res
      } catch (error) {
        if (error) {
          console.log(error)
        }
      }
}