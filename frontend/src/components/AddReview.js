import React, { useState } from 'react';
import movieDataService from '../services/movies.js';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useSnackbar } from "notistack";
//import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const AddReview = ({ user }) => {
    const { id } = useParams();
    const location = useLocation();
    let editing = false;
    let initialReviewState = "";
    const { enqueueSnackbar } = useSnackbar();
    //const navigate = useNavigate();

    console.log("Location state:", location.state);
    console.log("Location Current Review:", location.state?.currentReview);


    if(location.state && location.state.currentReview) {
        editing = true;
        initialReviewState = location.state.currentReview.review;
    }

    const [review, setReview] = useState(initialReviewState);
    const [submitted, setSubmitted] = useState(false);

    const onChangeReview = (e) => {
        const review = e.target.value;
        setReview(review);
    };

    const saveReview = () => {
        var data = {
            review: review,
            name: user.name,
            user_id: user.id,
            movie_id: id
        };

        if (editing) {
            // Get existing review id
            data.review_id = location.state.currentReview._id;

            movieDataService.updateReview(data)
                            .then(response => {
                                setSubmitted(true);
                                console.log(response.data);
                                enqueueSnackbar('Review edited Successfully', { variant: 'success' });
                                //navigate(`/movies/${id}`);
                            })
                            .catch (error => {
                                console.log(error);
                                enqueueSnackbar('An error occurred while submitting your edited review', { variant: 'error' });
                            });
        }
        else {
            movieDataService.createReview(data)
                        .then(response => {
                            setSubmitted(true);
                            console.log(response);
                            enqueueSnackbar('Review submitted Successfully', { variant: 'success' });
                            //navigate(`/movies/${id}`);
                        })
                        .catch(error => {
                            console.error(error);
                            enqueueSnackbar('An error occurred while submitting your review', { variant: 'error' });
                        });
        }
    };

    return (
        <div>
            <Container className='my-3 py-3' style={{ maxWidth: '70%' }}>
                {submitted ? (
                    <div>
                        <h4>Review submitted successfully!</h4>
                        <Link to={`/movies/${id}`}>Back to Movie</Link>
                    </div>
                ) : (
                    <Form>
                        <Form.Group>
                            <Form.Label style={{ fontWeight: 'bold' }}>{editing ? "Edit" : "Create"} Review</Form.Label>
                            <Form.Control type='text' required value={review} onChange={onChangeReview} />
                            <Button className='my-3'  variant="dark" onClick={saveReview}>Submit</Button>
                        </Form.Group>
                    </Form>
                )}
            </Container>
        </div>
    );
}

export default AddReview;