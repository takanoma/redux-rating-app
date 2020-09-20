import React from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    "button" :{
        backgroundColor: "#E1E5FF",
        color: "#000",
        fontSize: 16,
        height: 48,
        marginBottom: 16,
        marginLeft: 12,
        width: 256,
        "&:hover" : {
            backgroundColor: "#BCC5FC"
        }
    }
})

const SecondaryButton = (props) => {
    const classes = useStyles()

    return (
        <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
            {props.label}
        </Button>
    );
};

export default SecondaryButton

