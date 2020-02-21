import React from 'react';
import { Dropdown, DropdownButton,Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Gravatar from 'react-gravatar';
import * as actions from '../../actions/auth';

const TopNavigation = ({user, logout}) => (
	<Container>
	<Dropdown show>
  	<Dropdown.Header as={Link} to="/dashboard">	Dashboard 
  	</Dropdown.Header>

  	<DropdownButton align="Right">
  		<Gravatar email = {(user.email)}/>
 			<Dropdown.Item onClick={() => logout()}> Logout </Dropdown.Item>
 		</DropdownButton>
	</Dropdown>
	</Container>
);

TopNavigation.propTypes = {
	user: PropTypes.shape({
		email: PropTypes.string.isRequired
	}).isRequired,
	logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, {logout: actions.logout})(TopNavigation);