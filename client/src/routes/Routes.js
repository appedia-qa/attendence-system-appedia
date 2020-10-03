import PageNotFound from "../pages/Empty";
import Login from "../pages/Login/index";
import AdminDashboard from "../pages/AdminDashboard";
import AdminAddProduct from "../pages/AddEditProduct";
import productDiscription from "../pages/productDescription";

export const ProductPageEndPoint = "/";
export const CheckoutEndPoint = "/checkout";
export const ShopEndPoint = "/shop";

const Routes = [
  {
    path: "/login",
    name: "home",
    exact: true,
    component: Login,
  },
  {
    path: "/view",
    name: "productDiscription",
    exact: true,
    component: productDiscription,
  },
  {
    path: "/",
    name: "AdminDashboard",
    exact: true,
    component: AdminDashboard,
  },
  {
    path: "/product/:id",
    name: "AdminAddProduct",
    exact: true,
    component: AdminAddProduct,
  },
  {
    path: "/product",
    name: "AdminAddProduct",
    exact: true,
    component: AdminAddProduct,
  },
  {
    path: "/",
    name: "error",
    component: PageNotFound,
  },
];

export default Routes;
