//BlogPost.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, saveCommentToServer, updatePostInServer, deletePostFromServer, updateCommentInServer, deleteCommentFromServer } from '../api';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedPost, setEditedPost] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPostById(parseInt(postId));
      setPost(post);
      setEditedPost({ title: post.title, content: post.content });
    };

    fetchPost();
  }, [postId]);

  const addComment = async (postId, comment) => {
    await saveCommentToServer(parseInt(postId), comment);
    const updatedPost = await getPostById(parseInt(postId));
    setPost(updatedPost);
  };

  const handleEditPost = () => {
    setIsEditingPost(true);
  };

const handleSavePost = async () => {
  await updatePostInServer(parseInt(postId), editedPost);
  const updatedPost = await getPostById(parseInt(postId));
  setPost(updatedPost);
  setIsEditingPost(false);
};

  const handleDeletePost = async () => {
    await deletePostFromServer(parseInt(postId));
    navigate('/');
  };

  const handleEditComment = async (index, updatedComment) => {
    await updateCommentInServer(parseInt(postId), index, updatedComment);
    const updatedPost = await getPostById(parseInt(postId));
    setPost(updatedPost);
  };

  const handleDeleteComment = async (index) => {
    await deleteCommentFromServer(parseInt(postId), index);
    const updatedPost = await getPostById(parseInt(postId));
    setPost(updatedPost);
  };

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="blog-post">
      {isEditingPost ? (
        <div>
          <input
            type="text"
            value={editedPost.title}
            onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
          />
          <textarea
            value={editedPost.content}
            onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
          ></textarea>
          <button onClick={handleSavePost}>Guardar Cambios</button>
          <button onClick={() => setIsEditingPost(false)}>Cancelar</button>
        </div>
      ) : (
        <>
          <h1>{post.title}</h1>
          <p>{post.content}</p><br></br>
          <button onClick={handleEditPost}>Editar Publicación</button>
          <button onClick={handleDeletePost}>Eliminar Publicación</button>
        </>
      )}
      <CommentForm postId={parseInt(postId)} addComment={addComment} />
      <CommentList postId={parseInt(postId)} onEditComment={handleEditComment} onDeleteComment={handleDeleteComment} />
    </div>
  );
};

export default BlogPost;
