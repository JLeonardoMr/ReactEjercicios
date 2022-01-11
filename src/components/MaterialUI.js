import React from 'react';
import SearchAppBar from './hooks/materialnavbar';
import { Row } from "react-bootstrap";

// import ImgMediaCard from './hooks/materialcard';
// import TemporaryDrawer from './hooks/drawers';


export default function MaterialUI() {
    return (
        <Row>
            <SearchAppBar />
        </Row>
    )
}