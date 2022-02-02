import { createContext, useContext } from "react";

export const LenguajeContext = createContext()
export const ContentLenguaje = {
    es: {
        button:"Apreta",
        p: "Hijo he la verga esto esta en español"
    },
    en: {
        button:"Squeeze",
        p: "Son, the hell, this is in English"
    },
    al: {
        button:"Quetschen",
        p: "Sohn, zum Teufel, das ist auf Deutsch"
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default () => useContext(LenguajeContext);