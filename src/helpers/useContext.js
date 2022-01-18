import {createContext} from "react"

const GetAPI = createContext({
    async apiData(url) {
        try {
            let res = await fetch(url);
            if (!res.ok) throw res
            let json = await res.json();
            return json
        } catch (error) {
            return error
        }
    },
})

export default GetAPI;