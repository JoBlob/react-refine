import "./App.css";
import { Authenticated, Refine } from "@refinedev/core";
import { dataProvider } from "./providers/data-provider";
import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";
import { authProvider } from "./providers/auth-provider";
import { Login } from "./pages/login";
import { Header } from "./components/header";

function App() {
  return (
    <Refine dataProvider={dataProvider} authProvider={authProvider}>
      <Header />
      <Authenticated key="protected" fallback={<Login />}>
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  );
}

export default App;
