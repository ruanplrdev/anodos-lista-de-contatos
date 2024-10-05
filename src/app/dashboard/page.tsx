"use client"
import { useState } from 'react';
import Head from 'next/head';
// import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/solid'; // Ícones do Heroicons

const initialContacts = [
  { id: 1, name: 'João Silva', phone: '11 98765-4321', email: 'joao@example.com', address: 'Rua Exemplo, 123' },
  { id: 2, name: 'Maria Souza', phone: '21 91234-5678', email: 'maria@example.com', address: 'Av. Principal, 456' },
];

export default function Dashboard() {
  const [contacts, setContacts] = useState(initialContacts);

  // Função para deletar contato
  const deleteContact = (id:number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - Contatos</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-8">Admin Dashboard - Contatos</h1>

          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-medium">Lista de Contatos</h2>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center">
              {/* <PlusIcon className="h-5 w-5 mr-2" /> */}
              Novo Contato
            </button>
          </div>

          <div className="overflow-x-auto">
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
                      <button className="text-blue-600 hover:text-blue-900 flex items-center mr-4">
                        {/* <PencilIcon className="h-5 w-5 mr-1" /> */}
                        Editar
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 flex items-center"
                        onClick={() => deleteContact(contact.id)}
                      >
                        {/* <TrashIcon className="h-5 w-5 mr-1" /> */}
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
