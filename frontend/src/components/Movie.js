import React, {useState, useEffect} from 'react';
import movieDataService from '../services/movies.js';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { useSnackbar } from "notistack";

import Reviews from './Reviews.js';
import MovieLoader from './MovieLoader.js';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { RiStarSFill } from "react-icons/ri";

const Movie = ({ user }) => {
    const { id } = useParams();
    const [movie, setMovie] = useState({id: null, title: "", rated: "", reviews: []});
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const getMovie = (id) => {
        setIsLoading(true);
        movieDataService.get(id)
                        .then(response => {
                            setMovie(response.data);
                            console.log(response.data);
                        })
                        .catch (error => {
                            console.log(error);
                        })
                        .finally(() => {
                            setIsLoading(false);
                        })
    };

    useEffect(() => {
        getMovie(id);
    }, [id]);

    const deleteReview = (reviewId, index) => {
        movieDataService.deleteReview(reviewId, user.id)
                        .then(response => {
                            console.log(response);
                            setMovie((movie) => {
                                // Update the reviews to remove the deleted review from movie reviews list
                                return {
                                    ...movie,
                                    reviews: movie.reviews.filter((_, reviewIndex) => reviewIndex!== index)
                                };
                            });
                            enqueueSnackbar('Review Deleted Successfully', { variant: 'success' });
                        })
                        .catch(error => {
                            console.log(error);
                            enqueueSnackbar('An error occurred while deleting the review', { variant: 'error' });
                        });
    };

    return (
        <div>
            <Container className='py-3'>
                {isLoading ? (
                    <MovieLoader />
                ) : (
                    <>
                        <Row className='my-3 py-3'>
                            <Col xs={12} md={6} lg={5} className='mb-3'>
                                {movie.poster ? (
                                    <Image src={movie.poster} onError={(e) => { e.target.src = "/images/no-poster.jpeg" }} fluid />
                                ) : (
                                    <Image src="/images/no-poster.jpeg" fluid />
                                )}
                            </Col>
                            <Col xs={12} md={6} lg={7} className='mb-3'>
                                <Card>
                                    <Card.Header as={"h5"} style={{ fontWeight: 'bold' }}>{movie.title}</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            {movie.fullplot ? movie.fullplot : movie.plot}
                                        </Card.Text>
                                        <Card.Text>
                                            <span style={{ fontWeight: 'bold' }}>Type:</span>
                                            <span className='ms-2'>{movie.type}</span>
                                        </Card.Text>
                                        <Card.Text>
                                            <span style={{ fontWeight: 'bold' }}>Countries:</span>
                                            <span className='ms-2'>{movie.countries?.join(', ')}</span>
                                        </Card.Text>
                                        <Card.Text>
                                            <span style={{ fontWeight: 'bold' }}>Genres:</span>
                                            <span className='ms-2'>{movie.genres?.join(', ')}</span>
                                        </Card.Text>
                                        <Card.Text>
                                            <span style={{ fontWeight: 'bold' }}>Cast:</span>
                                            <span className='ms-2'>{movie.cast?.join(', ')}</span>
                                        </Card.Text>
                                        <Card.Text>
                                            <span style={{ fontWeight: 'bold' }}>Directors:</span>
                                            <span className='ms-2'>{movie.directors?.join(', ')}</span>
                                        </Card.Text>
                                        <Card.Text>
                                            <span style={{ fontWeight: 'bold' }}>Release date:</span>
                                            <span className='ms-2'>{moment(movie.released).format("Do MMMM YYYY")}</span>
                                        </Card.Text>
                                        <Card.Text>
                                            <span style={{ fontWeight: 'bold' }}>Rated:</span>
                                            <span className='ms-2'>{movie.rated ? movie.rated : "N/A"}</span>
                                        </Card.Text>
                                        <Card.Text>
                                            <span style={{ fontWeight: 'bold' }}>Runtime:</span>
                                            <span className='ms-2'>{movie.runtime} mins</span>
                                        </Card.Text>
                                        <Card.Text>
                                            <Row>
                                                <Col>
                                                    <div>
                                                        <span style={{ fontWeight: 'bold' }}>IMDB:</span>
                                                        <span className='ms-2'>{movie.imdb?.rating}</span>
                                                        <span className='ms-1'><RiStarSFill /></span>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div>
                                                        <span style={{ fontWeight: 'bold' }}>Rotten Tomatoes:</span>
                                                        <span className='ms-2'>{movie.tomatoes?.viewer?.rating}</span>
                                                        <span className='ms-1'><RiStarSFill /></span>
                                                        <span className='ms-2'>(Viewers)</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                        { user &&
                                        <Link to={`/movies/${id}/review`}>
                                            Add Review
                                        </Link> }
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <div className='my-3'>
                            <div>
                                <h3 className='my-3' style={{ fontWeight: 'bold' }}>Reviews</h3>
                                <Reviews movie={movie} user={user} deleteReview={deleteReview} id={id} />
                            </div>
                        </div>
                    </>
                )}
            </Container>
        </div>
    );
}

export default Movie;