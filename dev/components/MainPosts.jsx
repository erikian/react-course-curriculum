import React, {Component} from 'react';
import Loading from './Loading.jsx';
import Posts from './Posts.jsx';
import {fetchMainPosts} from '../utils/api.js';

export default class MainPosts extends Component {
    state = {
        loading: true,
        type: this.props.type,
    };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.type !== this.props.type) {
            this.setState({
                loading: true,
                type: this.props.type,
            });

            this.fetchData();
        }
    }

    fetchData() {
        const {type} = this.props;

        // uses the cached data directly if available
        if(this.state[type] != undefined) {
            this.setState({
                loading: false,
            })
        }

        else {
            fetchMainPosts(type)
                .then(posts => {
                    this.setState({
                        // saves the fetched in state for caching purposes
                        [type]: posts,
                        loading: false,
                    })
                })
        }
    }

    render() {
        const {loading, type} = this.state;

        if(loading) {
            return (<Loading />)
        }

        const posts = this.state[type];

        return(
            <div className="main-new">
                <Posts posts={posts} />
            </div>
        )
    }
}


MainPosts.defaultProps = {
    type: 'top'
}