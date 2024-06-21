import axiosClient from './axiosClient';
import { Ticket } from '@acme/shared-models';

const ticketApi = {
  getAll(): Promise<Ticket[]> {
    const url = '/tickets';
    return axiosClient.get(url);
  },

  get(id: number) {
    const url = `/tickets/${id}`;
    return axiosClient.get(url);
  },

  add(data: Omit<Ticket, 'id'>): Promise<Ticket> {
    const url = `/tickets`;
    return axiosClient.post(url, data);
  },

  assignUserToTicket(ticketId: number, userId: number) {
    const url = `/tickets/${ticketId}/assign/${userId}`;
    return axiosClient.put(url);
  },

  unAssignUserFromTicket(ticketId: number) {
    const url = `/tickets/${ticketId}/unassign`;
    return axiosClient.put(url);
  },

  markTicketAsComplete(id: number) {
    const url = `/tickets/${id}/complete`;
    return axiosClient.put(url);
  },

  markTicketAsIncomplete(id: number) {
    const url = `/tickets/${id}/complete`;
    return axiosClient.delete(url);
  },
};

export default ticketApi;
