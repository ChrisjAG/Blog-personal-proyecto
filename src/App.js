// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CrearPost from './components/CrearPost';
import BlogPost from './components/BlogPost';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crear-post" element={<CrearPost />} />
          <Route path="/post/:postId" element={<BlogPost />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
