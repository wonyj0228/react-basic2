import Home from './routes/Home';
import Detail from './routes/Detail';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/movie',
    element: <Detail />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
