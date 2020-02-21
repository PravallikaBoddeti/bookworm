import React from 'react';
import {Card, Button} from 'react-bootstrap';

const AddBookCtA = (props) => (
	<Card centered>
		<Card.Content textAlign = "center">
			<Card.Header>Add new book </Card.Header> 
			<Button name="plus circle" size="massive" />
		</Card.Content>
	</Card>
)

export default AddBookCtA;