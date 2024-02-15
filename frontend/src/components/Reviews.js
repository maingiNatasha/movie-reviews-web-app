import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { FaCircleUser } from "react-icons/fa6";

const Reviews = ({ movie, user, deleteReview, id }) => {
    return (
        <div className='p-3' id='reviews'>
            {movie.reviews && movie.reviews.length > 0 ? (
                movie.reviews.map((review, index) => (
                <div key={index}>
                    <div className='p-3'>
                        <h5 style={{ fontWeight: 'bold' }}><FaCircleUser size={40} className='me-3' /> {review.name}</h5>
                        <strong>reviewed on {moment(review.date).format("Do MMMM YYYY")}</strong>
                        <p className='mb-3'>{review.review}</p>
                        { user && user.id === review.user_id &&
                        <Row>
                            <Col>
                                <Link to={`/movies/${id}/review`} state={{ currentReview: review }}>
                                    Edit
                                </Link>
                            </Col>
                            <Col>
                                <Button variant='link' onClick={() => deleteReview(review._id, index)}>Delete</Button>
                            </Col>
                        </Row> }
                    </div>
                </div>
            ))
            ) : (
                <p>No reviews are currently available for this movie</p>
            )}
        </div>
    )
}

export default Reviews