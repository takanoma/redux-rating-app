import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        paddingRight: "40px"
    },

}));

const CheckboxLabel = (props) => {
    const classes = useStyles();

    return (
        <FormControlLabel className={classes.root}
            control={<Checkbox checked={props.checked} onChange={props.onChange} name={props.name} />}
            label={props.label}
        />
    );
}

export default CheckboxLabel