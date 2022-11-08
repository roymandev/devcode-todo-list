import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const ItemList = lazy(() => import('@/pages/ItemList'));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/detail/:activityId" element={<ItemList />} />
      </Routes>
    </Suspense>
  );
}

export default App;
