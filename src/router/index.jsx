import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '@/components/organisms/Layout';

// Lazy load all page components
const HomePage = lazy(() => import('@/components/pages/HomePage'));
const ProductsPage = lazy(() => import('@/components/pages/ProductsPage'));
const CategoryPage = lazy(() => import('@/components/pages/CategoryPage'));
const ProductDetailPage = lazy(() => import('@/components/pages/ProductDetailPage'));
const SearchPage = lazy(() => import('@/components/pages/SearchPage'));
const CartPage = lazy(() => import('@/components/pages/CartPage'));
const WishlistPage = lazy(() => import('@/components/pages/WishlistPage'));
const NotFound = lazy(() => import('@/components/pages/NotFound'));

// Suspense fallback component
const SuspenseFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  </div>
);

// Wrap each lazy component in Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<SuspenseFallback />}>
    <Component />
  </Suspense>
);

// Define main routes array
const mainRoutes = [
  {
    path: "",
    index: true,
    element: withSuspense(HomePage)
  },
  {
    path: "products",
    element: withSuspense(ProductsPage)
  },
  {
    path: "category/:category",
    element: withSuspense(CategoryPage)
  },
  {
    path: "product/:id",
    element: withSuspense(ProductDetailPage)
  },
  {
    path: "search",
    element: withSuspense(SearchPage)
  },
  {
    path: "cart",
    element: withSuspense(CartPage)
  },
  {
    path: "wishlist",
    element: withSuspense(WishlistPage)
  },
  {
    path: "sale",
    element: withSuspense(ProductsPage)
  },
  {
    path: "*",
    element: withSuspense(NotFound)
  }
];

// Create routes array with Layout as parent
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [...mainRoutes]
  }
];

export const router = createBrowserRouter(routes);