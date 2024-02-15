import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Placeholder from 'react-bootstrap/Placeholder';
import Card from 'react-bootstrap/Card';

const MovieLoader = () => {
    return (
        <>
            <Row className='my-3 py-3'>
                <Col>
                    <Image src="https://via.placeholder.com/400" />
                </Col>
                <Col>
                    <Card>
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
                    <br></br>
                    <div className='my-3 p-3'>
                        <Placeholder animation='glow'>
                            <Placeholder xs={6}/>
                            <Placeholder xs={8}/>{' '}
                            <Placeholder xs={4}/>
                        </Placeholder>
                    </div>
                </Col>
            </Row>
            <div className='my-3 py-3'>
                <Placeholder animation='glow'>
                    <Placeholder xs={6}/>
                    <Placeholder xs={8}/>{' '}
                    <Placeholder xs={4}/>
                </Placeholder>
            </div>
        </>
    )
}

export default MovieLoader