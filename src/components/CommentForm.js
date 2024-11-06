import React, { useState } from 'react';

const CommentForm = ({ postId, addComment }) => {
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { text: comment, author });
    setComment('');
    setAuthor('');
  };
  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Escribe tu comentario"
      ></textarea>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Tu nombre"
      />
      <button type="submit">Añadir Comentario</button>
    </form>
  );
};

export default CommentForm;
