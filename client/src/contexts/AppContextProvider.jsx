import { useState } from "react";
import AppContext from "./AppContext.js";

const AppContextProvider = (props) => {

    const [images, setImages] = useState([]);

    const values = { images, setImages};

    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;