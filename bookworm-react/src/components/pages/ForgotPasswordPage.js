import React from 'react';
import {Alert} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {resetPasswordRequest} from '../../actions/auth';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';

class ForgotPasswordPage extends React.Component {
	state = {
		success: false
	}

	submit = data => 
		this.props
		.resetPasswordRequest(data)
		.then(() => this.setState ({success:true}))

	render(){
		return(
			<div>
				{this.state.success ? (
					<Alert>Email has been sent</Alert>
				) : (
					<ForgotPasswordForm submit = {this.submit} />
				)}
			</div>
		)
	}
}

ForgotPasswordPage.propTypes = {
	resetPasswordRequest: PropTypes.func.isRequired
}

export default connect(null, {resetPasswordRequest})(ForgotPasswordPage);