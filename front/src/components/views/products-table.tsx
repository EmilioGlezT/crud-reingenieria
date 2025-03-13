import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";
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
  const { data: products, error, isLoading } = useSWR<Product[]>("/product", fetcher);

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

  console.log("✅ Productos recibidos:", products);

  return (
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
  );
}

export default ProductsTableView;
