import { createContext, useContext } from "react";

export const ThemeContext = createContext()
// eslint-disable-next-line import/no-anonymous-default-export
export default () => useContext(ThemeContext);