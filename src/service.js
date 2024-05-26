import axios from 'axios';
import {DELIVERY_API_URL} from "./constant";


export const getAllDeliveries = async () => {
    try {
        console.log('DELIVERY_API_URL:', DELIVERY_API_URL)
        const response = await axios.get(`${DELIVERY_API_URL}/delivery/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching deliveries:', error);
        throw error;
    }
};

export const setDeliveryStatus = async (deliveryId, status) => {
    try {
        await axios.post(`${DELIVERY_API_URL}/delivery/${deliveryId}/status`, { status });
    } catch (error) {
        console.error('Error setting delivery status:', error);
        throw error;
    }
};
