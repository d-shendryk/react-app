import { createBrowserRouter } from 'react-router-dom';
import { Shop } from '@pages/shop';
import { InventoryPage } from '@pages/inventory';
import { OrderPage } from '@pages/order';
import { Layout } from '@layouts/layout';
import { InventoryEditPage } from '@pages/inventoryEdit';
import { InventoryAddPage } from '@pages/inventoryAdd';
import { ProtectedRoute } from '@components/protectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Shop />,
      },
      {
        path: '/order',
        element: <OrderPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/inventory',
            element: <InventoryPage />,
          },
          {
            path: '/inventory/add',
            element: <InventoryAddPage />,
          },
          {
            path: '/inventory/:itemId',
            element: <InventoryEditPage />,
          },
        ],
      },
    ],
  },
]);
