import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { getCommentsFromServer, updateCommentInServer, deleteCommentFromServer } from '../api';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getCommentsFromServer(postId);
      setComments(comments);
    };

    fetchComments();
  }, [postId]);

  // Función para editar un comentario
  const handleEditComment = async (index, updatedComment) => {
    await updateCommentInServer(postId, index, updatedComment);
    const updatedComments = await getCommentsFromServer(postId);
    setComments(updatedComments); // Refresca el estado con los comentarios actualizados
  };

  // Función para eliminar un comentario
  const handleDeleteComment = async (index) => {
    await deleteCommentFromServer(postId, index);
    const updatedComments = await getCommentsFromServer(postId);
    setComments(updatedComments); // Refresca el estado después de la eliminación
  };

  return (
    <div className="comment-list">
      {comments.map((comment, index) => (
        <Comment
          key={index}
          comment={comment}
          index={index}
          onEditComment={handleEditComment}
          onDeleteComment={handleDeleteComment}
        />
      ))}
    </div>
  );
};

export default CommentList;
