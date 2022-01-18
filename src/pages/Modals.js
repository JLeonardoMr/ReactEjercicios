import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { useModal } from '../hooks/useModal';
import { Modalito } from '../components/Modal';


export const Modals = () => {
    const [isOpenModal1, openModal1, closeModal1] = useModal(false);
    const [isOpenModal2, openModal2, closeModal2] = useModal(false);
    return (
        <Row>
            <Col className=''>
                <h2>NOJodA</h2>
                <Button onClick={openModal1}>erga</Button>
                <Modalito isOpen={isOpenModal1} closeModal={closeModal1}>
                    <h3>Modal 1</h3>
                    <p>merguevo nojoda</p>
                    <img src="https://placeimg.com/400/400/animal" alt="animal" />
                </Modalito>
                <Button onClick={openModal2}>erga x 2</Button>
                <Modalito isOpen={isOpenModal2} closeModal={closeModal2}>
                    <h3>Modal 2</h3>
                    <p>chupa concha</p>
                    <img src="https://placeimg.com/400/400/nature" alt="nature" />
                </Modalito>
            </Col>
        </Row>
    )
}
