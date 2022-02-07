import React, { useEffect, useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../hooks/useModal';
import { useLocation, useNavigate } from 'react-router';
import {  } from '../reducer/reduxToolkitSlice';
import { ModalProduct } from './Modal';
import { deleteItemCart, deleteItemToCart, fetchCart, fetchProduct, setItemToCart } from '../action/reduxToolkitAction';

export const SectionProductReduxApi = () => {
    const [showProduct, setShowProduct] = useState({});
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProduct("http://localhost:5000/products/"))
        dispatch(fetchCart("http://localhost:5000/cart/"))
    }, [dispatch]);

    const stateProduct = useSelector(state => state.product);
    const loading = stateProduct.loading ?? true;
    const loadingCart = stateProduct.loadingCart ?? true;
    const productList = stateProduct.productList ?? [];
    const error = stateProduct.error ?? {};
    const cart = stateProduct.cartList ?? []
    const [isOpenModal, openModal, closeModal] = useModal(false);
    const MINIMO = productList.length
    const MAXIMO = 20 >= MINIMO ? MINIMO : 20;
    let { search } = useLocation();
    let query = new URLSearchParams(search);
    let start = parseInt(query.get('inicio')) || 1;
    let end = parseInt(query.get('fin')) || MAXIMO;
    let navigator = useNavigate();
    const handlePrev = () => {
        if (end === MINIMO) {
            navigator({ search: `?inicio=${start - MAXIMO}&fin=${start.toString().slice(0, -1) + "0"}` });
        } else if (start !== 1) navigator({ search: `?inicio=${start - MAXIMO}&fin=${end - MAXIMO}` });
    };
    const handleNext = () => {
        (end + 20) > MINIMO
            ? navigator({ search: `?inicio=${start + MAXIMO}&fin=${MINIMO}` })
            : navigator({ search: `?inicio=${start + MAXIMO}&fin=${end + MAXIMO}` })
    };

    return <>
        <Col className='row'>
            <Col className='row col-8'>
                {loading ? <h2>loading...</h2> : null}
                {error.ok && <h2>{error.status + " " + error.statusText}</h2>}
                {
                    productList.map((el, key) => (key >= (start - 1) && key <= (end - 1))
                        ? <Col className='my-2 col-6 text-center' key={el.id}>
                            <h6>{el.title}</h6>
                            <Col className='col-12'>
                                <Button
                                    className='mx-1'
                                    size="sm"
                                    onClick={() => dispatch(setItemToCart(el))}
                                >
                                    Add Cart
                                </Button>
                                <Button
                                    className='mx-1'
                                    size="sm"
                                    onClick={() => { setShowProduct(el); openModal(); }}
                                >
                                    Show Product
                                </Button>
                            </Col>
                        </Col>
                        : null
                    )
                }
                <Col className='my-2 col-12 text-center'>
                    {
                        (start > 2) && (<Button className='mx-1' size="sm" onClick={handlePrev}>atras</Button>)
                    }
                    {
                        (productList.length > end) && (<Button className='mx-1' size="sm" onClick={handleNext}>adelante</Button>)
                    }
                </Col>
            </Col>
            <Col>
                <h3> {cart.length !== 0 ? `Cart Item's: ${cart.length}` : null}</h3>
                {loadingCart && <h2>Loading...</h2>}
                {cart.length !== 0
                    ? cart.map(el => <Col className='card-body text-center' key={el.id}>
                        <h6>{el.title}</h6>
                        <p>Cantidad: {el.quantity}</p>
                        <Col className='col-12'>
                            <Button
                                className='mx-1'
                                size='sm'
                                onClick={() => dispatch(deleteItemToCart(el))}
                            >
                                Delete One
                            </Button>
                            <Button
                                className='mx-1'
                                size='sm'
                                onClick={() => dispatch(deleteItemCart(el))}
                            >
                                Delete All
                            </Button>
                        </Col>
                    </Col>)
                    : null
                }
            </Col>
        </Col>
        <ModalProduct isOpen={isOpenModal} closeModal={closeModal}>
            <h3>Product {showProduct.id||""}</h3>
            <p>{showProduct.title||""}</p>
        </ModalProduct>
    </>;
};