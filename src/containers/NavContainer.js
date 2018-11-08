import { connect } from 'react-redux';
import Nav from '../components/Nav.js'

const mapStateToProps = state => {
  return {
    view: state.view,
  };
};

const mapDispatchToProps = dispatch => {
    return {
        handleClick: event => {
            console.log(event.target.name);
        },
    }
  };


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);