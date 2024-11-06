import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPostsFromServer } from '../api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState(''); // Estado para la categoría seleccionada

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const posts = await getPostsFromServer();
        setPosts(posts.sort((a, b) => b.id - a.id));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    window.addEventListener('focus', fetchPosts);
    window.addEventListener('storage', (e) => {
      if (e.key === 'posts') {
        fetchPosts();
      }
    });

    return () => {
      window.removeEventListener('focus', fetchPosts);
      window.removeEventListener('storage', fetchPosts);
    };
  }, []);

  const filteredPosts = categoryFilter
    ? posts.filter((post) => post.category === categoryFilter)
    : posts;

  return (
    <div className="home">
      <div className="home-header">
        <h1>Listado de Blogs</h1>
        <Link to="/crear-post" className="create-post-button">
          Crear Nuevo Post
        </Link>
      </div>

      <div className="category-filter">
        <label htmlFor="category">Filtrar por categoría:</label>
        <select
          id="category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Seleccione una categoría</option>
          <option value="Noticias">Noticias</option>
          <option value="Reseñas">Reseñas</option>
          <option value="Entrevistas">Entrevistas</option>
          <option value="Tecnología y Hardware">Tecnología y Hardware</option>
          <option value="eSports y Competencias">eSports y Competencias</option>
          <option value="Guías y Tutoriales">Guías y Tutoriales</option>
          <option value="Indie Games">Indie Games</option>
          {/* Agrega aquí más categorías */}
        </select>
      </div>

      {loading ? (
        <div className="home loading">
          <h2>Cargando posts...</h2>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="no-posts">
          <p>No hay posts disponibles en esta categoría.</p>
        </div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="post-preview">
              <Link to={`/post/${post.id}`} className="post-link">
                <h2>{post.title}</h2>
                <p className="post-excerpt">
                  {post.content.length > 100
                    ? `${post.content.substring(0, 100)}...`
                    : post.content}
                </p>
                <div className="post-meta">
                  <span className="post-category">{post.category}</span>
                  <span className="comments-count">
                  -{post.comments?.length ||0} Comentarios
                  </span>
                  <span className="read-more"> <br></br>Leer más →</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
