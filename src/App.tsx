import "./App.css";
import { Authenticated, Refine } from "@refinedev/core";
import { dataProvider } from "./providers/data-provider";
import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";
import { authProvider } from "./providers/auth-provider";
import { Login } from "./pages/login";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";

import { RefineThemes, ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <BrowserRouter>
      {/* We're using Refine's Blue theme here. You can use other variants or create your own theme without constraints. */}
      <ThemeProvider theme={RefineThemes.GreenDark}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <Refine
          dataProvider={dataProvider}
          authProvider={authProvider}
          routerProvider={routerProvider}
          resources={[
            {
              name: "protected-products",
              list: "/products",
              show: "/products/:id",
              edit: "/products/:id/edit",
              create: "/products/create",
              meta: { label: "Products" },
            },
          ]}
        >
          <Routes>
            <Route
              element={
                // We're wrapping our routes with the `<Authenticated />` component
                // We're omitting the `fallback` prop to redirect users to the login page if they are not authenticated.
                // If the user is authenticated, we'll render the `<Header />` component and the `<Outlet />` component to render the inner routes.
                <Authenticated
                  key="authenticated-routes"
                  redirectOnFail="/login"
                >
                  <ThemedLayoutV2
                    Title={(props) => (
                      <ThemedTitleV2 {...props} text="Event Builder" />
                    )}
                  >
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route
                index
                // We're also replacing the <Navigate /> component with the <NavigateToResource /> component.
                // It's tailored version of the <Navigate /> component that will redirect to the resource's list route.
                element={<NavigateToResource resource="protected-products" />}
              />
              <Route path="/products">
                <Route index element={<ListProducts />} />
                <Route path=":id" element={<ShowProduct />} />
                <Route path=":id/edit" element={<EditProduct />} />
                <Route path="create" element={<CreateProduct />} />
              </Route>
            </Route>
            <Route
              element={
                <Authenticated key="auth-pages" fallback={<Outlet />}>
                  <NavigateToResource resource="protected-products" />
                </Authenticated>
              }
            >
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Refine>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
