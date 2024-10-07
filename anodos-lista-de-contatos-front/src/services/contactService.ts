// src/services/contactService.ts
import axiosInstance from "@/lib/axios";

export interface Contact {
    id?: number;
    name: string;
    phone: string;
    email: string;
    address: string;
}

export const getContacts = async (): Promise<Contact[]> => {
    const response = await axiosInstance.get('/contacts');
    return response.data;
};

export const createContact = async (contact: Contact): Promise<Contact> => {
    const response = await axiosInstance.post('/contacts', contact);
    return response.data;
};

export const updateContact = async (id: number, contact: Contact): Promise<Contact> => {
    const response = await axiosInstance.put(`/contacts/${id}`, contact);
    return response.data;
};

export const deleteContact = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/contacts/${id}`);
};
