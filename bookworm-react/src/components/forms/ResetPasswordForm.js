import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Form, FormLabel, FormGroup, FormControl, Button} from 'react-bootstrap';
import InlineError from '../messages/InlineError';

class ResetPasswordForm extends React.Component{
	state = {
		data: {
			token: this.props.token,
			password: '',
			passwordConfirmation: ''
		},
		loading: false,
		errors: {}
	}

	onChange = (e) => {
		this.setState({
			...this.state,
			data: {...this.state.data,[e.target.name]: e.target.value}
		})
	}

	onSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({loading: true});
			this.props
				.submit(this.state.data)
				.catch(err => this.setState({errors: err.response.data.errors, loading: false}))
		}
	}

	validate = data => {
		const errors = {};
		if (!data.password) errors.password = "can't be blank";
		if (data.password !== data.passwordConfirmation) errors.password = "Password must be matched";
		return errors;
	}

	render(){
		const {errors, data, loading} = this.state;

		return (
			<Form onSubmit = {this.onSubmit} loading = {loading}>
			{!!errors.global && (
				<Alert variant="danger"> {errors.global} </Alert> )}
				<FormGroup controlId="password">
					<FormLabel>Password</FormLabel>
					<FormControl
						type = "password"
						name = "password"
						placeholder = "new password"
						value = {data.password}
						onChange = {this.onChange}
						isInvalid = {!!errors.password}
					/>
					{errors.password && <InlineError text={errors.password} />}
					</FormGroup>

					<FormGroup controlId="passwordConfirmation">
					<FormLabel>Confirm your Password</FormLabel>
					<FormControl
						type = "passwordConfirmation"
						name = "passwordConfirmation"
						placeholder = "type password again"
						value = {data.passwordConfirmation}
						onChange = {this.onChange}
						isInvalid = {!!errors.passwordConfirmation}
					/>
					{errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} />}
					</FormGroup>
					<Button primary> ResetPasswordForm </Button>
				</Form>
		)
	}
}

ResetPasswordForm.propTypes = {
	submit: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired
}

export default ResetPasswordForm;