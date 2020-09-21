import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import {push} from "connected-react-router";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../reducks/user/operations";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {getRoleId} from "../../reducks/user/selectors";
import {ROLE_USER} from "../../const/code";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
        drawer: {
            position: "relative",
            top: 100
        },
        drawerPaper: {
            width: 250
        }
}));

const ClosableDrawer = (props) => {
    const { container } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state  => state);
    const roleId = getRoleId(selector);

    const selectMenu = (event, path) => {
        dispatch(push(path));
        props.onClose(event, false);
    };

    const [t, i18n] = useTranslation();
    const menus = []
    menus.push({func: selectMenu, label: t('ClosableDrawer.notifications'),    icon: <NotificationsActiveIcon/>, id: "register", value: "/"});
    if (roleId !== ROLE_USER) {
        menus.push({func: selectMenu, label: t('ClosableDrawer.users'),    icon: <PeopleIcon/>,   id: "users",  value: "/users"});
    }

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant="temporary"
                anchor={"right"}
                open={props.open}
                onClose={(e) => props.onClose(e)}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <div

                    onClose={(e) => props.onClose(e)}
                    onKeyDown={(e) => props.onClose(e)}
                >
                    <List>
                        {menus.map(menu => (
                                <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                                    <ListItemIcon>
                                        {menu.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={menu.label} />
                                </ListItem>
                        ))}
                        <ListItem button key="logout" onClick={(e) => {
                            dispatch(signOut())
                            props.onClose(e, false)
                        }}>
                            <ListItemIcon>
                                <ExitToAppIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t('ClosableDrawer.logout')}/>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </nav>
    );
}

export default ClosableDrawer