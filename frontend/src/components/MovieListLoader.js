import React from 'react';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

const MovieListLoader = () => {
    return (
        <>
            { Array.from({ length: 8 }).map((_, index) => (
            <Col key={index} className='mb-3'>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://via.placeholder.com/150"  />
                    <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                    </Card.Body>
                </Card>
            </Col>
        ))}
        </>
    )
}

export default MovieListLoader