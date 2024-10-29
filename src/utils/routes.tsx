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
