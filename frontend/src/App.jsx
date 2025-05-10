import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import IndexPage from './pages/IndexPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import UploadTaskPage from './pages/UploadTaskPage';
import SingleTaskPage from './pages/SingleTaskPage';
import HandleTaskPage from './HandleTask';
import TasksCreatedPage from './pages/TasksCreatedPage';
import TasksVistedPage from './pages/TasksVisitedPage';
import RoleProtectedRoute from './RoleProtectedRoute';
import HandleTaskEdit from './HandleTaskEdit';
import NotFound from './NotFound';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />}></Route>
          <Route path={'/register'} element={<RegisterPage />}></Route>
          <Route path={'/profile'} element={<ProfilePage />}></Route>
          <Route path={'/login'} element={<LoginPage />}></Route>
          <Route path={'/about'} element={<AboutPage />}></Route>
          <Route
            path={'/upload'}
            element={
              <RoleProtectedRoute>
                <UploadTaskPage />
              </RoleProtectedRoute>
            }
          ></Route>
          <Route path={'/task/:taskId'} element={<SingleTaskPage />}></Route>
          <Route path={'/task/:taskId/do'} element={<HandleTaskPage />}></Route>
          <Route
            path={'/task/:taskId/edit'}
            element={<HandleTaskEdit />}
          ></Route>

          <Route
            path={'/task/created/:userId'}
            element={
              <RoleProtectedRoute>
                <TasksCreatedPage />
              </RoleProtectedRoute>
            }
          ></Route>
          <Route
            path={'/task/visited/:userId'}
            element={<TasksVistedPage />}
          ></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
