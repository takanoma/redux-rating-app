import React from 'react';
import Router from "./Router";
import {Header} from "./components/Header";
import "./assets/reset.css";
import "./assets/style.css";
import "./locales/i18n";
import Loading from "./components/UIkit/Loading";

const App = () => {
    return(
        <Loading>
            <Header />
            <main className="c-main">
                <Router />
            </main>
        </Loading>
    )
}

export default App