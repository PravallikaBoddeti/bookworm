import React from 'react';
import { Alert, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { confirm } from '../../actions/auth';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class ConfirmationPage extends React.Component {

	state = {
		loading: true,
		success: false
	};

	componentDidMount(){
		this.props.confirm(this.props.match.params.token)
			.then(() => this.setState({ loading: false, success: true}))
			.catch(() => this.setState({ loading: false, success: false}))
	}

	render () {
		const { loading, success } = this.state;
			return (
				<div>
					<Modal show={loading}>
						<Modal.body>
							<h1> Validating your email...</h1>
						</Modal.body>
					</Modal>
					{ !loading && success && (
							<Alert variant = "success">
								<strong>Thank you. Your account has been verified. </strong>
								<Link to = "/dashboard">Go to your dashboard</Link>
							</Alert>
					)}

					{ !loading && success && (
							<Alert variant = "danger">
								<strong>Oops. Invalid token </strong>
							</Alert>
					)}
				</div>
			)
	}
}

ConfirmationPage.propTypes = {
	confirm: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			token: PropTypes.string.isRequired
		}).isRequired
	}).isRequired
}

export default connect(null, {confirm})(ConfirmationPage);