import React, { useReducer } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router'

const initialProcuctState = {
    products: [
        { id: 1, title: "Product #1" },
        { id: 2, title: "Product #2" },
        { id: 3, title: "Product #3" },
        { id: 4, title: "Product #4" },
        { id: 5, title: "Product #5" },
    ],
    cart: [
        { id: 1, title: "Product #1", quantity: 1 },
        { id: 2, title: "Product #2", quantity: 2 },
        { id: 3, title: "Product #3", quantity: 3 },
        { id: 4, title: "Product #4", quantity: 4 },
        { id: 5, title: "Product #5", quantity: 5 },
    ],
    active: { id: 2, title: "Product #2" }
}

const ProductReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
export const Productos = () => {
    const [productState, productDispatch] = useReducer(ProductReducer, initialProcuctState);
    const { products, cart, active } = productState

    const limite = 20;
    // products.length <= 20 ? limite = products.length: limite = 20;
    // console.log(limite,products.length,productState);

    // let location = useLocation()
    // console.log(location);
    let { search } = useLocation();
    let query = new URLSearchParams(search);
    // console.log(query);
    let start = parseInt(query.get('inicio')) || 1;
    let end = parseInt(query.get('fin')) || products.length <= 20 ? products.length : limite;
    console.log(start, end);
    let navigator = useNavigate();
    // console.log(navigator);

    const handlePrev = (e) => {
        if (start !== 1) {
            navigator({ search: `?inicio=${start - limite}&fin=${end - limite}` })
        }

    };
    const handleNext = (e) => {
        navigator({ search: `?inicio=${start + limite}&fin=${end + limite}` })
    };
    return (
        <Row>
            <Col>
                <h3>Productos</h3>
                <ul>
                    {
                        products.map(el => <li key={el.id} className='my-1'>
                            {el.title}
                            <Button className='mx-1'>Add cart</Button>
                            <Button className='mx-1'>Show product</Button>
                        </li>)
                    }
                </ul>
                <p>Mostrando productos del <b>{start}</b> al <b>{end}</b></p>
                {
                    (start > 2) && (<button onClick={handlePrev}>atras</button>)
                }
                {
                    (products.length > limite) && (<button onClick={handleNext}>adelante</button>)
                }
            </Col>
            <Col>
                <h3>Cart</h3>
                <ul>
                    {
                        cart.map(el=><li key={el.id} className='my-1'>
                            {el.title + " "} 
                            Cantidad: 
                            {" " + el.quantity}
                            <Button className='mx-1'>Remove from cart</Button>
                        </li>)
                    }
                </ul>
            </Col>
        </Row>
    )
}
