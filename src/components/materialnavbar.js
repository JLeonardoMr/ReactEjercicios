import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { ListGroup, Offcanvas } from 'react-bootstrap';
import { NavLink } from "react-router-dom"
import { useModal } from '../hooks/useModal';
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom"
import "../css/navbar.css";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const OffCanvas = ({ isState, isClose }) => {
    let array = ["ReduxToolkit","Calculadora",'Lenguaje','Contador','Dashboard', 'Users', 'Modal', 'MusicSearch', "Select", 'ContacForm', 'Work', 'Productos','ReduxApp', 'About']
    //     <Route path="/" element={<Home/>}/>
    //     <Route path="/modals" element={<Modals />} />
    //     <Route path="/*" element={<Error404/>}/>
    //   </Routes>
    //   {/* <MusicSearch/> */}
    //   {/* <SectionForm /> */}
    //   {/* <SelectNested/> */}
    //   {/* <ContacForm/> */}
    return (
        <Offcanvas show={isState} onHide={isClose} className={'offCanvas'}>
            <Offcanvas.Header closeButton className={'offCanvas-header'}>
                <Offcanvas.Title className={'offCanvas-header_title'}>Pages</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ListGroup variant="flush" className={'offCanvas-group'}>
                    <ListGroup.Item className={'offCanvas-group_list py-0'}>
                        <NavLink
                            exact='true'
                            to={'/'}
                            className={(navData) => navData.isActive
                                ? "NavLinkActive"
                                : "NavLink"}
                        >
                            <h6>Home</h6>
                        </NavLink>
                    </ListGroup.Item>
                    <ListGroup.Item className={'offCanvas-group_list py-0'}>
                        <NavLink
                            exact='true'
                            to={'/login'}
                            className={(navData) => navData.isActive
                                ? "NavLinkActive"
                                : "NavLink"}
                        >
                            <h6>Login</h6>
                        </NavLink>
                    </ListGroup.Item>
                    {array.map(el => <ListGroup.Item
                        key={`${el}`}
                        className={'offCanvas-group_list py-0'}
                    >
                        <NavLink
                            exact='true'
                            to={`/${el}`}
                            className={(navData) => navData.isActive
                                ? "NavLinkActive"
                                : "NavLink"}
                        >
                            <h6>{el}</h6>
                        </NavLink>
                    </ListGroup.Item>)}
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default function SearchAppBar() {
    const [state, open, close] = useModal(false);
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" >
                    <Toolbar >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={open}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Ejercicios en React.JS
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
                <OffCanvas isClose={close} isState={state} />
            </Box>
            <Container fluid>
                <Outlet />
            </Container>
        </>
    );
}

