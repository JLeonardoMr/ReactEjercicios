import {createContext} from "react"

const GetAPI = createContext({
    async apiData(url) {
        try {
            let res = await fetch(url);
            if (!res.ok) {
                // eslint-disable-next-line no-throw-literal
                throw res
            }
            let json = await res.json();
            return json
        } catch (err) {
            return err

        }
    }
})

export default GetAPI;