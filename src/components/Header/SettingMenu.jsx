import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const SettingMenu = (props) => {

    return (
        <>
            <IconButton
                aria-label="Menu Items"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => props.handleDrawerToggle(e)}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
        </>
    );
};
export default SettingMenu;