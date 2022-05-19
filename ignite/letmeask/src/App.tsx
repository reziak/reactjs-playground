import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthContextProvider } from './contexts/AuthContext';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';
import { NotFound } from './pages/404';

const App = () => {
  return (
    <BrowserRouter >
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/">
            <Route index element={<Navigate to="/rooms/new" />}/>
            <Route path="new" element={<NewRoom />} />
            <Route path=":id" element={<Room />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
