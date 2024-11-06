// Obtener todos los posts
export const getPostsFromServer = async () => {
  return JSON.parse(localStorage.getItem('posts')) || [];
};

// Obtener un post por su ID
export const getPostById = async (id) => {
  const posts = await getPostsFromServer();
  return posts.find((post) => post.id === id);
};

// Guardar un nuevo post en el servidor
export const savePostToServer = async (post) => {
  const posts = await getPostsFromServer();
  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));
};

// Actualizar un post en el servidor
export const updatePostInServer = async (id, updatedPostData) => {
  const posts = await getPostsFromServer();
  const updatedPosts = posts.map(post => {
    if (post.id === id) {
      return {
        ...post,
        ...updatedPostData
      };
    }
    return post;
  });
  localStorage.setItem('posts', JSON.stringify(updatedPosts));
};

// Eliminar un post
export const deletePostFromServer = async (id) => {
  const posts = await getPostsFromServer();
  const updatedPosts = posts.filter((post) => post.id !== id);
  localStorage.setItem('posts', JSON.stringify(updatedPosts));
};

// Guardar un nuevo comentario en el servidor
export const saveCommentToServer = async (postId, comment) => {
  const post = await getPostById(postId);
  if (post) {
    post.comments = post.comments || [];
    post.comments.push(comment);
    await updatePostInServer(postId, post);
  }
};

// Obtener todos los comentarios de un post
export const getCommentsFromServer = async (postId) => {
  const post = await getPostById(postId);
  return post ? post.comments || [] : [];
};

// Actualizar un comentario en el servidor
export const updateCommentInServer = async (postId, commentIndex, updatedComment) => {
  const post = await getPostById(postId);
  if (post && post.comments) {
    post.comments[commentIndex] = updatedComment;
    await updatePostInServer(postId, post);
  }
};

// Eliminar un comentario en el servidor
export const deleteCommentFromServer = async (postId, commentIndex) => {
  const post = await getPostById(postId);
  if (post && post.comments) {
    post.comments.splice(commentIndex, 1);
    await updatePostInServer(postId, post);
  }
};