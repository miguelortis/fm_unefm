import Request from "../Request"

export default async function getAllPackages() {
    try {
        const res = await Request.get('/packages')
        console.log(res)
        return res
        /* dispatch({
          type: 'SET_ PACKAGES',
          payload: data,
        }) */
      } catch (error) {
        if (error?.response?.status === 401) {
          console.log(error)
        }
      }
}