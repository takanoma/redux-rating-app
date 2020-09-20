import React, {useEffect, useState} from 'react';
import Router from "./Router";
import {Header} from "./components/Header";
import "./assets/reset.css";
import "./assets/style.css";
import { useTranslation } from 'react-i18next';
import "./locales/i18n";
import Loading from "./components/UIkit/Loading";

const App = () => {
    const [t, i18n] = useTranslation();
    const [lang, setLang] = useState('ja');
    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps
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