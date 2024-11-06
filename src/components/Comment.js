import React, { useState } from 'react';

const Comment = ({ comment, index, onEditComment, onDeleteComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);

  const handleSave = () => {
    onEditComment(index, editedComment); // Llama a la función de edición
    setIsEditing(false); // Cierra el modo de edición
  };

  return (
    <div className="button-group">
      {isEditing ? (
        <div>
          <textarea
            value={editedComment.text}
            onChange={(e) => setEditedComment({ ...editedComment, text: e.target.value })}
          ></textarea>
          <input
            type="text"
            value={editedComment.author}
            onChange={(e) => setEditedComment({ ...editedComment, author: e.target.value })}
          />
          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <>
          <p>{comment.text}</p>
          <small>Autor: {comment.author}</small>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={() => onDeleteComment(index)}>Eliminar</button>
        </>
      )}
    </div>
  );
};

export default Comment;
