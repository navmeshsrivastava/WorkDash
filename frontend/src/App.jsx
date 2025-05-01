import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import IndexPage from './pages/IndexPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />}></Route>
          <Route path={'/register'} element={<RegisterPage />}></Route>
          <Route path={'/profile'} element={<ProfilePage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
