import React, {Component} from 'react';
import Loading from './Loading.jsx';
import Posts from './Posts.jsx';
import queryString from 'query-string';

import {fetchUser, fetchPosts} from '../utils/api.js'

export default class User extends Component {
    state = {
        loading: true,
        posts: [],
        user: {},
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const {search} = this.props.location,
            userID = queryString.parse(search).id;

        fetchUser(userID)
            .then(user => {
                console.log(user)
                const {submitted} = user;

                fetchPosts(submitted.slice(0,50))
                    .then(posts => {
                        console.log(posts)
                        this.setState({
                            loading: false,
                            posts,
                            user,
                        })
                    })
            })
    }

    render() {
        const {loading, user, posts} = this.state;

        if(loading) {
            return (<Loading />)
        }

        const {about, created, id, karma} = user;

        const aboutHTML = {
            __html: about
        }

        return (
            <div className="user">
                <div className="user-info">
                    <h1 className="header">{id}</h1>

                    <div className="meta user-meta">
                        joined <span className="user-meta--featured">{new Date(created*1000).toLocaleString()}</span> has <span className="user-meta--featured">{karma.toLocaleString()} karma{karma>1 && 's'}</span>
                    </div>

                    {aboutHTML.__html && <p className="user-generated" dangerouslySetInnerHTML={aboutHTML}></p>}

                </div>

                <div className="posts">
                    <h2>Posts</h2>

                    {posts && Object.keys(posts).length
                        ? <Posts posts={posts} />
                        : <p>This user hasn't posted yet.</p>
                    }
                </div>
            </div>
        )
    }
}