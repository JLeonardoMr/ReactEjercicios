import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { productAdd, productClear, productDelete, productOneDelete, productShow } from '../action/reduxAction';
import { useModal } from '../hooks/useModal';
import { ModalProduct } from './Modal';

export const SectionProductRedux = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [isOpenModal, openModal, closeModal] = useModal(false);
    const { products, cart, active } = state.shoppingRedux;
    const MINIMO = products.length;
    const MAXIMO = 20 >= MINIMO ? MINIMO : 20;
    let { search } = useLocation();
    let query = new URLSearchParams(search);
    let start = parseInt(query.get('inicio')) || 1;
    let end = parseInt(query.get('fin')) || MAXIMO;
    let navigator = useNavigate();
    // console.log("query:", query, "search:", search, "start:", start, "end", end, "products", products.length);
    const handlePrev = (e) => {
        if (end === 30) {
            navigator({ search: `?inicio=${start - MAXIMO}&fin=${MAXIMO}` });
        } else if (start !== 1) navigator({ search: `?inicio=${start - MAXIMO}&fin=${end - MAXIMO}` });
    };
    const handleNext = (e) => {
        (end + 20) > products.length
            ? navigator({ search: `?inicio=${start + MAXIMO}&fin=${products.length}` })
            : navigator({ search: `?inicio=${start + MAXIMO}&fin=${end + MAXIMO}` })
    };
    return <>
        <Col className='row'>
            <Col className='row col-8'>
                <h3>Product's</h3>
                {
                    products.map((el, key) => (key >= (start - 1) && key <= (end - 1))
                        ? <Col className='row card-body col-6 text-center' key={el.id}>
                            <h6>{el.title}</h6>
                            <Col className='col-12'>
                                <Button
                                    className='mx-1'
                                    size="sm"
                                    onClick={() => dispatch(productAdd(el))}
                                >
                                    Add Cart
                                </Button>
                                <Button
                                    className='mx-1'
                                    size="sm"
                                    onClick={() => { dispatch(productShow(el)); openModal(); }}
                                >
                                    Show Product
                                </Button>
                            </Col>
                        </Col>
                        : null
                    )
                }
                <Col>
                    {
                        (start > 2) && (<Button className='mx-1' size="sm" onClick={handlePrev}>atras</Button>)
                    }
                    {
                        (products.length > end) && (<Button className='mx-1' size="sm" onClick={handleNext}>adelante</Button>)
                    }
                </Col>
            </Col>
            <Col>
                <h3> {cart.length !== 0 ? `Cart Item's: ${cart.length}` : null}</h3>
                {
                    cart.map(el => <Col className='card-body text-center' key={el.id}>
                        <h6>{el.title}</h6>
                        <p>Cantidad: {el.quantity}</p>
                        <Col className='col-12'>
                            <Button
                                className='mx-1'
                                size='sm'
                                onClick={() => dispatch(productOneDelete(el.id))}
                            >
                                Delete One
                            </Button>
                            <Button
                                className='mx-1'
                                size='sm'
                                onClick={() => dispatch(productDelete(el.id))}
                            >
                                Delete All
                            </Button>
                        </Col>
                    </Col>)
                }
                <Col className='col-12'>
                    {
                        cart.length > 0
                            ? <Button
                                className='mx-1'
                                size='sm'
                                onClick={() => dispatch(productClear())}
                            >
                                Clear Cart
                            </Button>
                            : null
                    }

                </Col>
            </Col>
        </Col>
        <ModalProduct isOpen={isOpenModal} closeModal={closeModal}>
            <h3>Product {active.id}</h3>
            <p>{active.title}</p>
        </ModalProduct>
    </>;
};
