import { httpClient } from '@/lib/httpClient';
import { CreateOrderPayload, BackendOrder } from '../types/checkout.types';

export const checkoutService = {
  createOrder: async (payload: CreateOrderPayload): Promise<BackendOrder> => {
    const response = await httpClient.post('/orders', payload);
    const order: BackendOrder = response.data?.data || response.data;
    return order;
  },

  getOrderById: async (id: string): Promise<BackendOrder> => {
    const response = await httpClient.get(`/orders/${id}`);
    const order: BackendOrder = response.data?.data || response.data;
    return order;
  },
};
