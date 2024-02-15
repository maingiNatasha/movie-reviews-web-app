import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const FilterSearch = ({ ratings, searchTitle, setSearchTitle, setSearchRating, findByRating, findByTitle }) => {

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const onChangeSearchRating = e => {
        const searchRating = e.target.value;
        setSearchRating(searchRating);
    };

    return (
        <Form className='py-3'>
            <Row className='align-items-end'>
                <Col xs={6} md={3} className='mb-3'>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Search by title' value={searchTitle} onChange={onChangeSearchTitle} />
                    </Form.Group>
                </Col>
                <Col xs={6} md={3} className='mb-3'>
                    <Button variant="dark" type='button' onClick={findByTitle}>Search</Button>
                </Col>
                <Col xs={6} md={3} className='mb-3'>
                    <Form.Group>
                        <Form.Control as={"select"} onChange={onChangeSearchRating}>
                            {ratings.map (rating => {
                                return (
                                    <option key={rating} value={rating}>{rating}</option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col xs={6} md={3} className='mb-3'>
                    <Button variant='dark' type='button' onClick={findByRating}>Search</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default FilterSearch;