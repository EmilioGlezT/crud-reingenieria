import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR, { mutate } from "swr";
import { useState } from "react";

import { fetcher } from "@/api";

// ✅ Definir el tipo de producto
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

function ProductsTableView() {
  console.log("🚀 Cargando productos...");
  const { data: products, error, isLoading, mutate } = useSWR<Product[]>("/product", fetcher);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  if (isLoading) {
    console.log("⏳ Cargando productos...");
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("❌ Error al obtener productos:", error);
    return <div>❌ Error cargando productos</div>;
  }

  if (!products || products.length === 0) {
    console.log("⚠️ No hay productos en la base de datos.");
    return <div>No hay productos</div>;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    console.log(formData)
    try {
      const response = await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("RESPUESTA", response)
      if (!response.ok) {
        console.log(response)
        throw new Error("Error al registrar cliente");
      }

      const newClient = await response.json();
    
      mutate((prevClients) => [...(prevClients || []), newClient], false);
      // 2. Revalidación de datos desde el servidor
      // mutate("/clients");

      setFormData({ name: "", description: "", price: "", stock: "" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6 mt-50">
     
    {/* Formulario de Registro */}
    <div className="border p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Registrar Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Descripcion</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Precio</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting ? "Registrando..." : "Registrar Cliente"}
          </button>
          {submitError && <p className="text-red-500 mt-2">{submitError}</p>}
        </div>
      </form>
    </div>
    <Table>
      <TableCaption>Lista de Productos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead className="text-right">Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product: Product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell className="text-right">{product.stock}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}

export default ProductsTableView;
