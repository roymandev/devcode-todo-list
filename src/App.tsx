import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import ItemList from '@/pages/ItemList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/detail/:activityId" element={<ItemList />} />
    </Routes>
  );
}

export default App;
