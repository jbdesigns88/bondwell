const BACKEND_API = process.env.BACKEND_API_URL || "http://localhost:3000"
const ENDPOINTS =  {
    USERS:{
        CREATE:`${BACKEND_API}/users`
    }

}



export default ENDPOINTS;