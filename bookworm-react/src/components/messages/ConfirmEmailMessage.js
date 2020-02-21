import React from 'react';
import { Alert } from 'react-bootstrap';

const ConfirmEmailMessage = (props) => (
	<Alert variant="info">
		<Alert.Heading> Please verify your email </Alert.Heading>
	</Alert>
);

export default ConfirmEmailMessage;