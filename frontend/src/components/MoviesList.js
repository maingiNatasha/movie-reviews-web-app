import React, { useCallback, useEffect, useState} from 'react';
import movieDataService from '../services/movies.js';
import { Link } from "react-router-dom";
import FilterSearch from './FilterSearch.js';
import Pagination from './Pagination.js';
import MovieListLoader from './MovieListLoader.js';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRating, setSearchRating] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setCurrentPage(0);
    }, [currentSearchMode]);

    const retrieveMovies = useCallback(() => {
        setCurrentSearchMode("");
        setIsLoading(true);
        movieDataService.getAll(currentPage)
                        .then(response => {
                            console.log(response.data);
                            setMovies(response.data.movies);
                            setCurrentPage(response.data.page);
                            setEntriesPerPage(response.data.entries_per_page);
                        })
                        .catch (error => {
                            console.log(error);
                        })
                        .finally(() =>{
                            setIsLoading(false);
                        });
    }, [currentPage]);

    const retrieveRatings = () => {
        movieDataService.getRatings()
                        .then(response => {
                            console.log(response.data);
                            setRatings(["All Ratings", ...response.data]);
                        })
                        .catch (error => {
                            console.log(error);
                        });
    };

    useEffect(() => {
        retrieveMovies();
        retrieveRatings();
    }, [retrieveMovies]);


    const find = useCallback((query, by) => {
        setIsLoading(true);
        movieDataService.find(query, by, currentPage)
                        .then(response => {
                            console.log(response.data);
                            setMovies(response.data.movies);
                        })
                        .catch (error => {
                            console.log(error);
                        })
                        .finally (() => {
                            setIsLoading(false);
                        })
    }, [currentPage]);

    const findByTitle = useCallback(() => {
        setCurrentSearchMode("findByTitle");
        find(searchTitle, "title");
    }, [searchTitle, find]);

    const findByRating = useCallback(() => {
        setCurrentSearchMode("findByRating");
        if (searchRating === "All Ratings") {
            retrieveMovies();
        }
        else {
            find(searchRating, "rated");
        };
    }, [retrieveMovies, searchRating, find]);

    const retrieveNextPage = useCallback(() => {
        if (currentSearchMode === "findByTitle") {
            findByTitle();
        }
        else if (currentSearchMode === "findByRating") {
            findByRating();
        }
        else {
            retrieveMovies();
        }
    }, [currentSearchMode, retrieveMovies, findByTitle, findByRating]);

    useEffect(() => {
        retrieveNextPage();
    }, [currentPage, retrieveNextPage]);


    return (
        <div className='App'>
            <Container className='py-3 px-3'>
                <FilterSearch ratings={ratings} searchTitle={searchTitle} setSearchTitle={setSearchTitle} setSearchRating={setSearchRating} findByRating={findByRating} findByTitle={findByTitle} />
                <Row>
                    {isLoading ? (
                        <MovieListLoader />
                    ) : (
                        movies.map((movie) => (
                            <Col key={movie._id} className='mb-3' xs={12} md={6} lg={3}>
                                <Card className='h-100' style={{ maxWidth: '20rem' }}>
                                    {movie.poster ? (
                                        <Card.Img src={movie.poster} className='card-img-top' style={{ height: '400px'}} onError={(e) => { e.target.src = "/images/no-poster.jpeg" }} />
                                    ) : (
                                        <Card.Img src="/images/no-poster.jpeg" className='card-img-top' style={{ height: '400px'}} />
                                    )}
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        {movie.rated ? (
                                            <Card.Text>Rating: {movie.rated}</Card.Text>
                                        ) : (
                                            <Card.Text>Rating: N/A</Card.Text>
                                        )}
                                        <Card.Text>{movie.plot ? movie.plot.slice(0, 100) : ''}...</Card.Text>
                                        <Link to={`/movies/${movie._id}`}>View Reviews</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
                <br></br>
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} entriesPerPage={entriesPerPage} />
            </Container>
        </div>
    );
}

export default MoviesList;