import React from 'react';
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from './components/Navigation.js';
import AddReview from './components/AddReview.js';
import MoviesList from './components/MoviesList.js';
import Movie from './components/Movie.js';
import Login from './components/Login.js';

function App() {
	const[user, setUser] = React.useState(null);

    async function login(user = null) {
        setUser(user);
    }

    async function logout() {
        setUser(null);
    }

	return (
		<div className="App">
			<Navigation user={user} logout={logout} />
			<Routes>
				<Route path="/" element={<MoviesList />}></Route>
				<Route path="/movies" element={<MoviesList />}></Route>
				<Route path="/movies/:id/review" element={<AddReview user={user} />}></Route>
				<Route path="/movies/:id" element={<Movie user={user} />}></Route>
				<Route path="/login" element={<Login login={login} />}></Route>
			</Routes>
		</div>
	);
}

export default App;
