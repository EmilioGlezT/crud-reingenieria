import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "@/api";
import { useState,useEffect } from "react";
interface Client {
  id: number;
  name: string;
  email: string;
  phone: number;
  address: string;
}
function ClientDetailsView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: client, mutate } = useSWR<Client>(`/client/${id}`, fetcher);
  const [formData, setFormData] = useState<Partial<Client>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (client) {
      setFormData({
        ...client,
        id: client.id 
      });
    }
  }, [client]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    console.log("FORM DATA", formData)
    try {
      const updatePayload = {
        id: Number(id),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      };


      const response = await fetch(`http://localhost:3000/client/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      });

      console.log("respuesta", response)
      if (!response.ok) {
        throw new Error("Error actualizando Cliente");
      }

      const updatedProduct = await response.json();
      mutate(updatedProduct, false);
      navigate("/clients");
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de eliminar este Cliente?")) return;

    try {
      const response = await fetch(`http://localhost:3000/client/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error eliminando Cliente");
      }

      navigate("/clients");
      // mutate("/product");
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  if (!client) return <div>Cargando...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Detalle del Cliente</h1>
      
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-2">Nombre</label>
          <input
            type="text"
            defaultValue={client.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Descripción</label>
          <input
            type="email"
            defaultValue={client.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Phone</label>
          <input
            type="text"
            defaultValue={client.phone}
            onChange={(e) => setFormData({...formData, phone: Number(e.target.value)})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Address</label>
          <input
            type="text"
            defaultValue={client.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting ? "Actualizando..." : "Actualizar cliente"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Eliminar Cliente
          </button>
        </div>

        {error && <div className="text-red-500 mt-4">{error}</div>}
      </form>
    </div>
  );
}

export default ClientDetailsView