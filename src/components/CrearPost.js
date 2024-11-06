// CrearPost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { savePostToServer } from '../api';

const CrearPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(''); // Estado para la categoría
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      title,
      content,
      category, // Agregar la categoría al post
      comments: []
    };

    await savePostToServer(newPost);
    navigate('/');
  };

  return (
    <div className="crear-post">
      <h1>Crear Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          required
        /> 

        <label htmlFor="content">Contenido:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe el contenido del post..."
          required
        ></textarea>

        {/* Menú desplegable para seleccionar categoría */}
        <label htmlFor="category">Categoría:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Seleccione una categoría</option>
          <option value="Noticias">Noticias</option>
          <option value="Reseñas">Reseñas</option>
          <option value="Entrevistas">Entrevistas</option>
          <option value="Tecnología y Hardware">Tecnología y Hardware</option>
          <option value="eSports y Competencias">eSports y Competencias</option>
          <option value="Guías y Tutoriales">Guías y Tutoriales</option>
          <option value="Indie Games">Indie Games</option>
          {/* Agrega más categorías según sea necesario */}
        </select>

        <button type="submit">Guardar post</button>
      </form>
    </div>
  );
};

export default CrearPost;