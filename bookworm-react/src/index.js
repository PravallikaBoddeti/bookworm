import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as serviceWorker from './serviceWorker';
import { userLoggedIn } from './actions/auth';
import decode from 'jwt-decode';

const store = createStore(
	rootReducer, 
	composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.bookwormJWT) {
	const payload = decode(localStorage.bookwormJWT);
	const user = { 
		token: localStorage.bookwormJWT, 
		email: payload.email,
		confirmed: payload.confirmed
	};
	store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Route component = {App}/>
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
