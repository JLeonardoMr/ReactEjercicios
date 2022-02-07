import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { SectionProductReduxApi } from '../components/SectionProductReduxToolkit';
import store from "../store/reduxToolkitStore"
export const ReduxToolkit = () => {
    //? Importo el store desde su archivo contenedor
    //? Paso el store por el Provider con react-redux
    return (
        <Provider store={store}>
            <Row>
                <Col className='col-12 text-center'>
                    <h2>Redux Toolkit / Product</h2>
                </Col>
                <SectionProductReduxApi />
            </Row>
        </Provider>
    )
};
