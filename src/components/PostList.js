import React, { useState } from 'react';
import categories from '../Categories';

const PostList = ({ posts }) => {
    const [selectedCategory, setSelectedCategory] = useState(0); // 0 para mostrar todas

    const filteredPosts = selectedCategory === 0
        ? posts
        : posts.filter((post) => post.category === selectedCategory);

    return (
        <div>
            <h2>Listado de Blogs</h2>

            <label>Filtrar por categoría:</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(Number(e.target.value))}>
                <option value={0}>Todas</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <div>
                {filteredPosts.map((post, index) => (
                    <div key={index} className="post">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <small>Categoría: {categories.find(cat => cat.id === post.category)?.name}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;