import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import BookList from './pages/BookList/BookList';
import BookDetail from './pages/BookDetail/BookDetail';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import MyBooks from './pages/MyBooks/MyBooks';
import NavBar from './components/NavBar';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

const PrivateHome = () => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/books" /> : <Home />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<PrivateHome />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-books" element={<MyBooks />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
