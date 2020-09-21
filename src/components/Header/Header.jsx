import React, {useState, useCallback} from 'react';
import {makeStyles}                   from "@material-ui/styles";
import AppBar                         from '@material-ui/core/AppBar';
import Toolbar                        from '@material-ui/core/Toolbar';
import {useDispatch, useSelector} from "react-redux";
import logo                           from "../../assets/img/icons/mylogo.png";
import {HeaderMenu, ClosableDrawer}   from "./index";
import {push}                         from "connected-react-router"
import {getIsSignedIn} from "../../reducks/user/selectors";
import {HeaderSelectBox} from "../UIkit";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuBar: {
        backgroundColor: "#fff",
        color: '#444',
    },
    toolbar: {
        margin: '0 auto',
        maxWidth: 1024,
        width: '100%'
    },
    iconButtons: {
        float: 'right'
    },
    logo: {
        cursor: 'pointer'
    },
    list: {
        float: 'left',
        paddingRight: 30,
        marginTop: 5
    },
    header: {
        margin: '0 0 0 auto'
    },
});

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const isSignedIn = getIsSignedIn(selector);
    const userName = selector.user.userName;

    const [sideBarOpen, setSideBarOpen] = useState(false),
          [language, setLanguage] = useState("ja");
    const [t, i18n] = useTranslation();

    const languages = [{"id": "ja", "name": "日本語"}, {"id": "en", "name": "ENGLISH"}];

    const handleDrawerToggle = useCallback((event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setSideBarOpen(!sideBarOpen)
    }, [setSideBarOpen, sideBarOpen ]);

    const inputLanguage = useCallback((event) => {
        setLanguage(event);
        i18n.changeLanguage(event);
    }, [setLanguage, i18n]);

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolbar}>
                    <img className={classes.logo}
                        alt="Logo" src={logo} width="180px"
                        onClick={() => dispatch(push('/'))} role="button"
                    />

                    <div className={classes.header}>
                        <div className={classes.list}>
                            <HeaderSelectBox
                                options={languages} select={inputLanguage} value={language}
                            />
                        </div>
                        {isSignedIn && (
                            <div className={classes.iconButtons}>
                                <span>{userName} 様</span>
                                <HeaderMenu handleDrawerToggle={handleDrawerToggle} />
                            </div>
                        )}
                    </div>
                </Toolbar>
            </AppBar>

            <ClosableDrawer open={sideBarOpen} onClose={handleDrawerToggle} />
        </div>
    );
}

export default Header