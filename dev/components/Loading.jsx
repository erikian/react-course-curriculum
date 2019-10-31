import React, {Component} from 'react';
import PropTypes from 'prop-types';

const styles = {
    content: {
        fontSize: '35px',
        left: '0',
        marginTop: '20px',
        position: 'absolute',
        right: '0',
        textAlign: 'center',
    }
}

export default class Loading extends Component {
    state = {
        content: this.props.text,
    };

    componentDidMount() {
        const {speed, text} = this.props;

        this.interval = setInterval(() => {
            this.state.content == text + '...'
                ? this.setState({
                    content: text
                })

                : this.setState(({ content }) => ({
                    content: content + '.',
                }))
        }, speed)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <p style={styles.content}>
                {this.state.content}
            </p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300,
}
