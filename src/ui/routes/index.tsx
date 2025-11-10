import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '@/App';

// 创建路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  // 可以在这里添加更多路由
  // {
  //   path: '/about',
  //   element: <About />,
  // },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
