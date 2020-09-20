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

const useStyles = makeStyles((theme) => ({
        drawer: {
            position: "relative",
            top: 100
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: 256,
        },
        searchField: {
            alignItems: 'center',
            display: 'flex',
            marginLeft: 32
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

    const menus = []
    menus.push({func: selectMenu, label: "お知らせ",    icon: <NotificationsActiveIcon/>, id: "register", value: "/"});
    if (roleId !== ROLE_USER) {
        menus.push({func: selectMenu, label: "ユーザー一覧",    icon: <PeopleIcon/>,   id: "users",  value: "/users"});
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
                {/*Drawerを開いている際に、enter押下で閉じる*/}
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
                            <ListItemText primary={"Logout"}/>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </nav>
    );
}

export default ClosableDrawer