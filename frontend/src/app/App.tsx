import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
      <CartDrawer />
    </CartProvider>
  );
}