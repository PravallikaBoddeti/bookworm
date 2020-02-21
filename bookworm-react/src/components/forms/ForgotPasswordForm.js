import React from 'react';
import { Form, Button, FormGroup, FormLabel, FormControl, Alert } from 'react-bootstrap';
import InlineError from '../messages/InlineError';
import isEmail from 'validator/lib/isEmail';
import PropTypes from 'prop-types';

class ForgotPasswordForm extends React.Component {
	state = {
		data: {
			email: '',
			password: ''
		},
		loading: false,
		errors: {}
	}

	onChange = (e) =>
		this.setState({
			...this.state,
			data: {...this.state.data, [e.target.name]: e.target.value }
		})

	onSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({errors});
		if (Object.keys(errors).length === 0) {
			this.setState({loading:true});
			this.props
				.submit(this.state.data)
				.catch(err => 
					this.setState({ errors: err.response.data.errors, loading: false}))
		}
	}

	validate = data => {
		const errors = {};
		if(!isEmail(data.email)) errors.email = "Invalid email";
		return errors;
	}

	render(){
		const {data, loading, errors} = this.state ;

		return (
			<Form onSubmit = {this.onSubmit} loading = {loading}>	
				{!!errors.global && (
					<Alert variant="danger"> {errors.global} </Alert> )}
				<FormGroup controlId="email">
					<FormLabel>Email</FormLabel>
					<FormControl
						type = "email"
						name = "email"
						placeholder = "example@example.com"
						value = {data.email}
						onChange = {this.onChange}
						isInvalid = {!!errors.email}
					/>
					{errors.email && <InlineError text={errors.email} />}
				</FormGroup>
				<Button primary type="submit">ForgotPassword</Button>
			</Form>
		)
	}
}

ForgotPasswordForm.propTypes = {
	submit: PropTypes.func.isRequired 
}

export default ForgotPasswordForm;