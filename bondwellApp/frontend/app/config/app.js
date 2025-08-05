const BACKEND_API = process.env.BACKEND_API_URL || "https://backend-dot-bondwell-441003.ue.r.appspot.com"
const ENDPOINTS =  {
    USERS:{
        CREATE:`${BACKEND_API}/api/v1/users`
    }

}



export default ENDPOINTS;