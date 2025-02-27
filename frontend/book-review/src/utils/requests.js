import axios from "axios";
import { fireNotification, getHeaderDetails } from "../utils";
import { 
    ACTION_SUCCESSFUL_MESSAGE, 
    RESOURCE_NOT_FOUND_MESSAGE, 
    NOTIF_SUCCESS, NOTIF_ERROR, GET
 } from "./constants.js";

const requestTypeMapper = {
    post: axios.post,
    get: axios.get,
    patch: axios.patch,
    put: axios.put,
    delete: axios.delete
}

export const notificationHandler = (response, successMessage, errorMessage) => {
    switch (response?.status){
        case 200:
            fireNotification(NOTIF_SUCCESS, successMessage || ACTION_SUCCESSFUL_MESSAGE);
            break;
        case 201:
            fireNotification(NOTIF_SUCCESS, successMessage || ACTION_SUCCESSFUL_MESSAGE);
            break;
        case 204:
            fireNotification(NOTIF_SUCCESS, successMessage || ACTION_SUCCESSFUL_MESSAGE);
            break;
        case 400:
            fireNotification(NOTIF_ERROR, errorMessage || response?.message)
            break;      
        case 401:
            fireNotification(NOTIF_ERROR, errorMessage || response?.message);
            break;
        case 403:
            fireNotification('error', 'Error', errorMessage || response?.message);
            break;
        case 404:
            fireNotification('error', 'Error', RESOURCE_NOT_FOUND_MESSAGE);
            break;
        default:
            

    }
} 

// Make a function to centralize all backend requests
export const makeRequest =  async (url, method, data, authenticated=false, notify=true, isFormData=false, sucessMessage, errorMessage, fieldErrorHandler) => {
    let headerDetails;
    const request = requestTypeMapper[method];
    let response;
    headerDetails = getHeaderDetails(isFormData);

    if (authenticated && headerDetails.headers.Authorization === "Bearer undefined") {
        return;
    }

    authenticated?  headerDetails = getHeaderDetails(isFormData): headerDetails = null;

    try {
        if (method === GET || method === 'delete') {
            response = await request(url, headerDetails);
        
        }
         else {
            response = await request(url, data, headerDetails);

        }
        notify && notificationHandler(response, response.message, errorMessage);
        return response.data;
    } catch (error) {
        console.log(error)
        notify && notificationHandler(error?.response, response?.message);
        
        fieldErrorHandler && error.response?.message || (fieldErrorHandler && fieldErrorHandler(error?.response?.message))

        if (error?.response?.status === 401) {
            logout();
        }
    }
}
