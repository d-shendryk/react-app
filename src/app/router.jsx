import { createBrowserRouter } from "react-router-dom";
import Shop from "../pages/shop";
import Inventory from "../pages/inventory";
import Order from "../pages/order";
import Layout from "../layouts/layout";
import InventoryEdit from "../pages/inventoryEdit";
import InventoryAdd from "../pages/InventoryAdd";
import ProtectedRoute from "../components/protectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Shop />,
      },
      {
        path: "/inventory",
        element: (
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/inventory/add",
        element: (
          <ProtectedRoute>
            <InventoryAdd />
          </ProtectedRoute>
        ),
      },
      {
        path: "/inventory/:itemId",
        element: (
          <ProtectedRoute>
            <InventoryEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order",
        element: <Order />,
      },
    ],
  },
]);

export default router;
