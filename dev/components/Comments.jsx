import React, {Component} from 'react';
import Loading from './Loading.jsx';
import PostMeta from './PostMeta.jsx';
import {fetchItem, fetchComments} from '../utils/api.js';
import {ThemeConsumer} from '../contexts/theme';
import queryString from 'query-string';
import {Link} from 'react-router-dom';

export default class Comments extends Component {
    state = {
        comments: [],
        error: false,
        loading: true,
        post: [],
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const {search} = this.props.location,
            postID = queryString.parse(search).id;

        fetchItem(postID)
            .then(post => {
                console.log(post)
                const {kids} = post;

                if(kids) {
                    fetchComments(kids.slice(0,50))
                        .then(comments => {
                            console.log(comments)
                            this.setState({
                                comments,
                                loading: false,
                                post,
                            })
                        })
                }

                // no comments
                else {
                    this.setState({
                        error: true,
                        loading: false,
                        post,
                    })
                }
            })
    }

    render() {
        const {error, loading} = this.state;

        if(loading) {
            return (<Loading />)
        }

        const {comments, post} = this.state,
              {title, url} = post;

        return(

           <ThemeConsumer>
                {({theme}) => (
                    <div className="user">
                        <div className="user-info">
                            <h1 className="header header--comments">
                                <Link to={url} title={title} text={title}>
                                    {title}
                                </Link>
                            </h1>

                            <div className="meta">
                                <PostMeta post={post} displayCommentCount />
                            </div>

                            {Object.keys(comments).length
                                ? <ul className="comments">
                                    {comments.map((comment) => (
                                        <li className={`comment comment--${theme}`} key={comment.id}>
                                            <div className="post-meta">
                                                <PostMeta post={comment} />
                                            </div>

                                            <div className="comment-content user-generated" dangerouslySetInnerHTML={{__html: comment.text}}></div>
                                        </li>
                                    ))}
                                </ul>

                                : <p>This post has no comments yet.</p>
                            }
                        </div>
                   </div>
                )}
            </ThemeConsumer>
        )
    }
}