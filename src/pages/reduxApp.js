import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { SectionProductRedux } from '../components/SectionProductRedux';
import { Provider } from "react-redux";
import store from '../store/reduxStore';

export const ReduxApp = () => {

    return <>
        <Provider store={store}>
            <Row>
                <Col className='col-12 text-center'>
                    <h2>App Redux React-Redux / Product</h2>
                </Col>
                <SectionProductRedux />
            </Row>
        </Provider>
    </>
};
