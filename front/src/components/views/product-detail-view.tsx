import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "@/api";
import { useState,useEffect } from "react";
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}
function ProductDetailsView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, mutate } = useSWR<Product>(`/product/${id}`, fetcher);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        id: product.id 
      });
    }
  }, [product]);  

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {

      const updatePayload = {
        id: Number(id),
        name: formData.name,
        description: formData.description,
        price: Number(formData.price)
      };
      console.log("UPDATE PAYLOAD", updatePayload)
      const response = await fetch(`http://localhost:3000/product/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      });

      
      if (!response.ok) {
        throw new Error("Error actualizando producto");
      }

      const updatedProduct = await response.json();
      mutate(updatedProduct, false);
      navigate("/products");
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      const response = await fetch(`http://localhost:3000/product/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error eliminando producto");
      }

      navigate("/products");
      // mutate("/product");
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Detalle del Producto</h1>
      
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-2">Nombre</label>
          <input
            type="text"
            defaultValue={product.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Descripción</label>
          <input
            type="text"
            defaultValue={product.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Precio</label>
          <input
            type="number"
            defaultValue={product.price}
            onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* <div>
          <label className="block mb-2">Stock</label>
          <input
            type="number"
            defaultValue={product.stock}
            onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
            className="w-full p-2 border rounded"
          />
        </div> */}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting ? "Actualizando..." : "Actualizar Producto"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Eliminar Producto
          </button>
        </div>

        {error && <div className="text-red-500 mt-4">{error}</div>}
      </form>
    </div>
  );
}

export default ProductDetailsView