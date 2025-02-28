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

function ProductsTableView() {
  const { data, isLoading } = useSWR<Product[]>("product");
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  return (
    <Table>
      <TableCaption>Products</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {
            data.map((product, index) => (
              <div key={index}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
              </div>
            ))
          }
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default ProductsTableView;
