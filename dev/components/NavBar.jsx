import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import {ThemeConsumer} from '../contexts/theme';

const activeStyle = {
    color: '#225a8f',
};

export default function NavBar() {
    return (
        <ThemeConsumer>
            {/* destructures the values from value obj) */}
            {({theme, toggleTheme}) => (
                <nav className="nav-bar">
                    <ul className="nav-bar--list">
                        <li>
                            <NavLink
                                exact
                                to="/"
                                className="nav-link"
                                activeStyle={activeStyle}
                            >
                                Top
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                exact
                                to="/news"
                                className="nav-link"
                                activeStyle={activeStyle}
                            >
                                New
                            </NavLink>
                        </li>
                    </ul>

                    <button
                        onClick={toggleTheme}
                        className="btn-toggle-theme">
                        {theme == 'light' ? '🔦' : '💡'}
                    </button>
                </nav>
            )}
        </ThemeConsumer>
    )
}