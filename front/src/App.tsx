import { Route, Routes } from "react-router";
import MainLayout from "@/components/main-layout";
import Home from "@/components/views/home";
import ProductsTableView from "./components/views/products-table";
import ClientsTableView from "./components/views/clients-table";
import EmployeesTableView from "./components/views/employees-table";
import ProductDetailsView from "./components/views/product-detail-view";
import ClientDetailsView from "./components/views/clients-detail";
function App() {
  return (
    <Routes>
      <Route path="/">
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="/products" element={<ProductsTableView/>}>
            <Route path=":id" element={<ProductDetailsView />} />
          </Route> */}
          <Route path="products">
            <Route index element={<ProductsTableView />} />
            <Route path=":id" element={<ProductDetailsView />} />
          </Route>
          <Route path="/sales" element={<div>Sales</div>} />
          <Route path="/clients" element={<ClientsTableView />} />
          <Route path="/employees" element={<EmployeesTableView />} />
          <Route path="/shop" element={<div>Shop</div>} />
          <Route path="/inventory" element={<div>Inventory</div>} />

          <Route path="clients">
            <Route index element={<ClientsTableView />} />
            <Route path=":id" element={<ClientDetailsView />} />
          </Route>

        </Route>
      </Route>
    </Routes>
  );
}

export default App;
