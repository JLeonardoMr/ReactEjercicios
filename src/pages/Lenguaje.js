import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { HijosLenguajeFooter, HijosLenguajeHeader, HijosLenguajeMain } from '../components/HijosLenguaje';
import { ThemeContext } from '../hooks/useTheme';
import "../css/lenguaje.css"
import { ContentLenguaje, LenguajeContext } from '../hooks/useLenguaje';
export const Lenguaje = () => {
    const [theme, setTheme] = useState(false);
    const [lenguaje, setLenguaje] = useState();
    const textContent = ContentLenguaje;
    const changeTheme = (e) => {
        if (theme) {
            setTheme(false)
        } else {
            setTheme(true)
        }
    }
    const changeLenguaje = (e) => setLenguaje(e.target.value);
    return (
        <>
            <ThemeContext.Provider
                value={{
                    changeLenguaje,
                    changeTheme,
                    theme,
                }}
            >
                <LenguajeContext.Provider
                    value={{
                        lenguaje,
                        textContent
                    }}
                >
                    <Row className={theme ? 'DarkMod' : ''}>
                        <HijosLenguajeHeader />
                    </Row>
                    <Row className={theme ? 'DarkMod' : ''}>
                        <HijosLenguajeMain />
                    </Row>
                    <Row className={theme ? 'DarkMod' : ''}>
                        <HijosLenguajeFooter />
                    </Row>
                </LenguajeContext.Provider>
            </ThemeContext.Provider>
        </>
    )
};
