import { CloseButton, Col} from 'react-bootstrap';
import "../css/modal.css"

export const Modalito = ({children, isOpen, closeModal}) => {
    const StopPropagation = (e) => e.stopPropagation();
    return (
        <Col className={`modalito ${isOpen && 'isOpen'} p-5`} onClick={closeModal}>
            <Col className='modalito-container' onClick={StopPropagation}>
            <CloseButton className='modalito-close' onClick={closeModal} style={{marginLeft:'auto', marginRight:'10px'}}/>
                {children}
            </Col>
        </Col>
    )
}
