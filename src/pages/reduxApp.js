import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { SectionProductRedux } from '../components/SectionProductRedux';


export const ReduxApp = () => {

    return <>
            <Row>
                <Col className='col-12 text-center'>
                    <h1>App Redux / React-Redux Product</h1>
                </Col>
                <SectionProductRedux />
            </Row>
    </>

};
