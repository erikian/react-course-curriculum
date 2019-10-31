// third-party components and utils
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// theme provider
import {ThemeProvider} from './contexts/theme';

// my components
import NavBar from './components/NavBar.jsx';
import Loading from './components/Loading.jsx';
import Comments from './components/Comments.jsx';

// css
import './less/main.less';

const MainPosts = React.lazy(() => import('./components/MainPosts.jsx'));
const User = React.lazy(() => import('./components/User.jsx'));

class App extends React.Component {
    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({theme}) => ({
                theme: theme == 'light' ? 'dark' : 'light',
            }));
        }
    };

    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={`main ${this.state.theme} content`}>
                        <NavBar />

                        <React.Suspense fallback={<Loading />}>
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    render={props => <MainPosts type='top' />}
                                />

                                <Route
                                    exact
                                    path="/news"
                                    render={props => <MainPosts type='new' />}
                                />

                                <Route
                                    exact
                                    path="/user"
                                    render={props => <User {...props} />}
                                />

                                <Route
                                    exact
                                    path="/post"
                                    render={props => <Comments {...props} />}
                                />
                                <Route render={() => <h1>404</h1>} />
                            </Switch>
                        </React.Suspense>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'));