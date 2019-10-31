import React from 'react';
import PostMeta from './PostMeta.jsx';

export default function Posts({posts}) {
        return(
            <ul className="list-posts">
                {posts.map(post => (
                    <li key={post.id} className="post">
                        <h2 title={post.title} className="post-title">
                            <a className="post-link" href={post.url}>{post.title}</a>
                        </h2>

                        <PostMeta post={post} displayCommentCount />
                    </li>
                ))}
            </ul>
        )
}