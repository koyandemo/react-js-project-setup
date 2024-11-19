import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/auth/sign-in';
import Home from '../pages/dashboard/home';
import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';
import {
  AgentIcon,
  CategoryIcon,
  ContentLibraryIcon,
  DashboardIcon,
  FeatureIcon,
  FeedbackIcon,
  OrderIcon,
  ProductIcon,
  ReceiveIcon,
  SubscriptionIcon,
  UserIcon,
} from './appIcon';
import FeedBackListPage from '../pages/dashboard/feedback';
import UserListPage from '@/pages/dashboard/user';
import SubscriptionListPage from '@/pages/dashboard/subscription';
import ContentLibraryListPage from '@/pages/dashboard/contentLibrary';
import ContentLibraryCreatePage from '@/pages/dashboard/contentLibrary/new/page';
import FeatureListPage from '@/pages/dashboard/feature';
import AgentListPage from '@/pages/dashboard/agent';
import CategoryListPage from '@/pages/dashboard/category';
import ProductListPage from '@/pages/dashboard/product';
import OrderListPage from '@/pages/dashboard/order';
import ReceiveListPage from '@/pages/dashboard/receive';
import SkuListPage from '@/pages/dashboard/sku';
import ProductCreatePage from '@/pages/dashboard/product/new/page';
import CategoryCreatePage from '@/pages/dashboard/category/new/page';
import ProductEditPage from '@/pages/dashboard/product/edit/page';
import CategoryEditPage from '@/pages/dashboard/category/edit/page';
import SkuCreatePage from '@/pages/dashboard/sku/new/page';
import SkuEditPage from '@/pages/dashboard/sku/edit/page';
import VariationListPage from '@/pages/dashboard/variation';
import VariationCreatePage from '@/pages/dashboard/variation/edit/page';
import VariationEditPage from '@/pages/dashboard/variation/edit/page';

export const menuItems = [
  {
    icon: <DashboardIcon />,
    label: 'Dashboard',
    route: '/',
    group: 'dashboard',
  },
  {
    icon: <FeedbackIcon />,
    label: 'Feedback',
    route: '/feedbacks',
    group: 'feedback',
  },
  {
    icon: <UserIcon />,
    label: 'User',
    route: '/users',
    group: 'user',
  },
  {
    icon: <ContentLibraryIcon />,
    label: 'Content Library',
    route: '/content-library',
    group: 'content-library',
  },
  {
    icon: <SubscriptionIcon />,
    label: 'Subscription',
    route: '/subscriptions',
    group: 'subscription',
  },
  {
    icon: <FeatureIcon />,
    label: 'Features',
    route: '/features',
    group: 'features',
  },
  {
    icon: <AgentIcon />,
    label: 'Agent',
    route: '/agent',
    group: 'agent',
  },
  {
    icon: <CategoryIcon />,
    label: 'Category',
    route: '/category',
    group: 'category',
  },
  {
    icon: <ProductIcon />,
    label: 'Product',
    route: '/product',
    group: 'product',
  },
  {
    icon: <ProductIcon />,
    label: 'Sku',
    route: '/sku',
    group: 'sku',
  },
  {
    icon: <ProductIcon />,
    label: 'Variation',
    route: '/variation',
    group: 'variation',
  },
  {
    icon: <OrderIcon />,
    label: 'Order',
    route: '/order',
    group: 'order',
  },
  {
    icon: <ReceiveIcon />,
    label: 'Receive',
    route: '/receive',
    group: 'receive',
  },
];

const dashboardRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/feedbacks',
    element: <FeedBackListPage />,
  },
  {
    path: '/users',
    element: <UserListPage />,
  },
  {
    path: '/subscriptions',
    element: <SubscriptionListPage />,
  },
  {
    path: '/content-library',
    element: <ContentLibraryListPage />,
  },
  {
    path: '/content-library/new',
    element: <ContentLibraryCreatePage />,
  },
  {
    path: '/features',
    element: <FeatureListPage />,
  },
  {
    path: '/agent',
    element: <AgentListPage />,
  },
  {
    path: '/category',
    element: <CategoryListPage />,
  },
  {
    path : '/category/create',
    element : <CategoryCreatePage />
  },
  {
    path : '/category/edit/:id',
    element : <CategoryEditPage />
  },
  {
    path: '/product',
    element: <ProductListPage />,
  },
  {
    path: '/product/create',
    element: <ProductCreatePage />,
  },
  {
    path: '/product/edit/:id',
    element: <ProductEditPage />,
  },
  {
    path: '/variation',
    element: <VariationListPage />,
  },
  {
    path: '/variation/create',
    element: <VariationCreatePage />,
  },
  {
    path: '/variation/edit/:id',
    element: <VariationEditPage />,
  },
  {
    path: '/sku',
    element: <SkuListPage />,
  },
  {
    path: '/sku/create',
    element: <SkuCreatePage />,
  },
  {
    path: '/sku/edit/:id',
    element: <SkuEditPage />,
  },
  {
    path: '/order',
    element: <OrderListPage />,
  },
  {
    path: '/receive',
    element: <ReceiveListPage />,
  },
];

const authRoutes = [
  {
    path: '/sign-in',
    element: <LoginPage />,
  },
];

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: dashboardRoutes,
  },
  { path: '/sign-in', element: <AuthLayout />, children: authRoutes },
]);
