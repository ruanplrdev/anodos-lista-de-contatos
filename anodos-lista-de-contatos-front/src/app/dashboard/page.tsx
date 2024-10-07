"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation"; 
import { removeAuthToken } from "@/utils/cookies"; 
import * as Yup from 'yup'; // Importa o Yup para validação
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  Contact
} from "@/services/contactService";

// Esquema de validação com Yup
const contactSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  phone: Yup.string().required('O telefone é obrigatório'),
  email: Yup.string().email('Email inválido').nullable(),
  address: Yup.string().nullable(),
});

export default function Dashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContact, setEditingContact] = useState<Contact | null>(null); 
  const [showEditModal, setShowEditModal] = useState(false); 
  const [showCreateModal, setShowCreateModal] = useState(false); 
  const [editedValues, setEditedValues] = useState<Contact>({ name: "", phone: "", email: "", address: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 
  const router = useRouter(); 

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contacts = await getContacts();
        setContacts(contacts);
      } catch (error) {
        setErrorMessage("Erro ao carregar contatos.");
      }
    };
    fetchContacts();
  }, []);

  const openEditModal = (contact: Contact) => {
    setEditingContact(contact);
    setEditedValues(contact);
    setShowEditModal(true);
    setErrorMessage(null);
  };

  const openCreateModal = () => {
    setEditedValues({ name: "", phone: "", email: "", address: "" });
    setShowCreateModal(true);
    setErrorMessage(null);
  };

  const saveChanges = async () => {
    try {
      // Valida os dados de edição usando Yup
      await contactSchema.validate(editedValues, { abortEarly: false });

      if (editingContact) {
        // Atualiza o contato no servidor
        await updateContact(editingContact.id!, editedValues);
  
        // Recarrega a lista de contatos
        const updatedContacts = await getContacts();
        setContacts(updatedContacts); // Atualiza o estado com os contatos mais recentes
  
        setShowEditModal(false);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.errors.join(', '));
      } else {
        setErrorMessage("Erro ao atualizar o contato.");
      }
    }
  };

  const handleCreateContact = async () => {
    try {
      // Valida os dados de criação usando Yup
      await contactSchema.validate(editedValues, { abortEarly: false });

      const newContact = await createContact(editedValues);
      setContacts([...contacts, newContact]);
      setShowCreateModal(false);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.errors.join(', '));
      } else {
        setErrorMessage("Erro ao criar o contato.");
      }
    }
  };

  const handleDeleteContact = async (id: number) => {
    try {
      await deleteContact(id);
      setContacts(contacts.filter((c) => c.id !== id));
    } catch (error) {
      setErrorMessage("Erro ao deletar o contato.");
    }
  };

  const handleLogout = () => {
    removeAuthToken(); 
    router.push("/login"); 
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - Contatos</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-3xl font-semibold">Admin Dashboard - Contatos</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded-md"
            >
              Logout
            </button>
          </div>

          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-medium">Lista de Contatos</h2>
            <button
              onClick={openCreateModal}
              className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
            >
              Novo Contato
            </button>
          </div>

          <div className="overflow-x-auto">
            {contacts.length === 0 ? ( 
              <p className="text-gray-500 text-center">Não há itens na lista.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end">
                        <button
                          className="text-blue-600 hover:text-blue-900 flex items-center mr-4"
                          onClick={() => openEditModal(contact)}
                        >
                          Editar
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 flex items-center"
                          onClick={() => handleDeleteContact(contact.id!)}
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal de edição */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Editar Contato</h2>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            <input
              type="text"
              value={editedValues.name}
              onChange={(e) => setEditedValues({ ...editedValues, name: e.target.value })}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Nome"
            />
            <input
              type="text"
              value={editedValues.phone}
              onChange={(e) => setEditedValues({ ...editedValues, phone: e.target.value })}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Telefone"
            />
            <input
              type="email"
              value={editedValues.email}
              onChange={(e) => setEditedValues({ ...editedValues, email: e.target.value })}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Email"
            />
            <input
              type="text"
              value={editedValues.address}
              onChange={(e) => setEditedValues({ ...editedValues, address: e.target.value })}
              className="mb-4 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Endereço"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={saveChanges}
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de criação */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Novo Contato</h2>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            <input
              type="text"
              value={editedValues.name}
              onChange={(e) => setEditedValues({ ...editedValues, name: e.target.value })}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Nome"
            />
            <input
              type="text"
              value={editedValues.phone}
              onChange={(e) => setEditedValues({ ...editedValues, phone: e.target.value })}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Telefone"
            />
            <input
              type="email"
              value={editedValues.email}
              onChange={(e) => setEditedValues({ ...editedValues, email: e.target.value })}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Email"
            />
            <input
              type="text"
              value={editedValues.address}
              onChange={(e) => setEditedValues({ ...editedValues, address: e.target.value })}
              className="mb-4 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Endereço"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateContact}
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para exibir erros */}
      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Erro</h2>
            <p className="text-red-600 mb-4">{errorMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setErrorMessage(null)}
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
