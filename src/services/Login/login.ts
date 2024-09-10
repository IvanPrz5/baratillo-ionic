
import { Credentials } from "@/interface/Login/Credentials";
import { API_URL } from "../config";
// import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core'
import axios from "axios";

export async function loginService(credentials: Credentials){

    /* const option : HttpOptions = {
        url: API_URL + "/login",
        headers: {
            'Content-Type': 'application/json',
        },
        data: credentials
    }
    
    return CapacitorHttp.post(option).then(( response: HttpResponse ) => {
        return response.data;
    }) */
    
    return await axios.post(API_URL + "/login", credentials)
    .then((response) => response.data)    
}
