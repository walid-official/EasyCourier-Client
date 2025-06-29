import apiClient from "@/utils/apiClient";
import { ORDER } from "./endpoints";


export const createOrders = async (values: any) => {
  try {
    const response = await apiClient.post(ORDER, values);
    return response.data;
  } catch (error) {
    console.error('Error Order post', error);
    throw error;
  }
};

// export const getOrders = async () => {
//     try{
//         const response = await apiClient.get(ORDER);
//         return response.data;
//     }catch(error){
//         console.error('Error Order Get', error);
//         throw error;
//     }
// };

export const getOrders = async () => {
  const response = await apiClient.get(ORDER);
  return response.data;
};


export const getOrderById = async (id: string) => {
     try{
         const response = await apiClient.get(`${ORDER}/${id}`);
         return response.data;
    }catch(error){
        console.error('Error Order Get by id', error);
        throw error;
    }
 
};

export const updateOrder = async ({ id, data }: { id: string; data: any }) => {
     try{
         const response = await apiClient.put(`${ORDER}/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Error Order update', error);
        throw error;
    }
 
};

export const deleteOrder = async (id: string) => {
     try{
        const response = await apiClient.delete(`${ORDER}/${id}`);
    return response.data;
    }catch(error){
        console.error('Error Order Delete', error);
        throw error;
    }
  
};