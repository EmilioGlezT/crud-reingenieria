import { Route, Routes } from "react-router";
import MainLayout from "@/components/main-layout";
import Home from "@/components/views/home";
import ProductsTableView from "./components/views/products-table";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<ProductsTableView/>}>
            <Route path=":id" element={<div>Product Detail</div>} />
          </Route>
          <Route path="/sales" element={<div>Sales</div>} />
          <Route path="/clients" element={<div>Clients</div>} />
          <Route path="/employees" element={<div>Employees</div>} />
          <Route path="/shop" element={<div>Shop</div>} />
          <Route path="/inventory" element={<div>Inventory</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
