import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrders, deleteOrder,
     getOrderById, getOrders, updateOrder }
      from "./apis";
import { toast } from "react-toastify";

 type OrderType = {
  _id: string;               
  sender: string; 
  deliveryMan?: string; 
  fromAddress: string;
  toAddress: string;
  parcelType: "Document" | "Package" | "Fragile" | "Other";
  weight: string;                 
  price: number;                   
  status: "Pending" | "Picked" | "Delivered";
  createdAt: string;               
  updatedAt: string;               
};


export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrders,
    onSuccess: () => {
      toast.success(" Order placed successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || " Failed to place order");
    },
  });
};

export const useGetOrders = () => {
  return useQuery<OrderType[], Error>({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};

export const useGetOrderById = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });
};

export const useUpdateOrder = () => {

  return useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      toast.success("✅ Order updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update order");
    },
  });
};


export const useDeleteOrder = () => {
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      toast.success("Order deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete order");
    },
  });
};