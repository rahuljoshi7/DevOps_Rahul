import React, { Fragment, useReducer } from "react";
import Routes from "./components";
import { LayoutContext, layoutState, layoutReducer } from "./components/shop";

function App() {
    const [data, dispatch] = useReducer(layoutReducer, layoutState);

    // ✅ Move console.log here
    console.log("Krutik change");

    return (
        <Fragment>
            <LayoutContext.Provider value={{ data, dispatch }}>
                <Routes />
            </LayoutContext.Provider>
        </Fragment>
    );
}

export default App;
