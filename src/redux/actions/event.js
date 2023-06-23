import axios from "axios"
import { server } from "../../server"


export const createEvent = (newForm) => async(dispatch) => {
    try {
        dispatch({
            type: "eventCreateRequest",
        })

        const config = {headers: {"Content-Type": "multipart/form-data"} };
        const { data } = await axios.post(`${server}/event/create-event`, newForm, config)

        dispatch({
            type: "eventCreateSuccess",
            payload: data.event
        });

    } catch (error) {
        dispatch({
            type: "eventCreateFail",
            payload: error.response.data.message
        });        
    }
}


// Get all events shop
export const getAllEventsShop = (id) => async(dispatch) => {
    try {
        dispatch({
            type:"getAllEventsShopRequest"
        });

        const { data } = await axios.get(`${server}/event/get-all-events-shop/${id}`)
        dispatch({
            type: "getAllEventsShopSuccess",
            payload: data.events
        })
    } catch (error) {
        dispatch({
            type: "getAllEventsShopFail",
            payload: error.response.data.message
        })
    }
}

// Delete a event
export const deleteEvent = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "deleteEventRequest"
        });

        const { data } = await axios.delete(`${server}/event/delete-shop-event/${id}`, {
            withCredentials: true
        })

        dispatch({
            type:"deleteEventSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "deleteEventFail",
            payload: error.response.data.message
        })
    }
}

// Get all events 
export const getAllEvents = () => async(dispatch) => {
    try {
        dispatch({
            type:"getAllEventsRequest"
        });

        const { data } = await axios.get(`${server}/event/get-all-events`)
        dispatch({
            type: "getAllEventsSuccess",
            payload: data.events
        })
    } catch (error) {
        dispatch({
            type: "getAllEventsFail",
            payload: error.response.data.message
        })
    }
}