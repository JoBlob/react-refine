import "./App.css";
import { Refine } from "@refinedev/core";
import { dataProvider } from "./providers/data-provider";
import { ShowProduct } from "./products/show";
import { EditProduct } from "./products/edit";
import { ListProducts } from "./products/list";
import { CreateProduct } from "./products/create";

function App() {
  return (
    <Refine dataProvider={dataProvider}>
      <ListProducts />
      {/* <CreateProduct />
      <ShowProduct />
      <EditProduct />
       */}
    </Refine>
  );
}

export default App;
