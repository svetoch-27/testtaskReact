import PropTypes from 'prop-types';

function Welcome( { name}) {
    return <h1>Welcome, {name}</h1>
}

Welcome.propTypes = {
    // name: PropTypes.string.isRequired,
    name: PropTypes.string,
}

Welcome.defaultPrors = {
    name: 'name'    
}

export default Welcome;