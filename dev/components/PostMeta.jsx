import React from 'react';
import {Link} from 'react-router-dom';

export default function Posts({post, displayCommentCount = false}) {

        return(
            <div className="post-meta">
                by <Link to={`/user?id=${post.by}`} title={`View all posts by ${post.by}`} className="post-meta--link">{post.by}</Link> on {new Date(post.time*1000).toLocaleString()}

                {displayCommentCount &&
                    <React.Fragment>
                        &nbsp;with <Link to={`/post?id=${post.id}`} title={"View all comments for this post"} className="post-meta--link">{post.descendants.toLocaleString()}</Link> comments
                    </React.Fragment>
                }
            </div>
        )
}