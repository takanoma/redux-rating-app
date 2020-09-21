import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
    root: {
        height: 15
    },
    formControl: {
        textAlign: "left"
    },
});

const HeaderSelectBox = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FormControl variant="standard" className={classes.formControl}>
                <Select className={classes.item}
                    value={props.value}
                    onChange={(e) => props.select(e.target.value)}
                    label={props.label}
                >
                    {props.options.map((value) => {
                        return <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    )
}

export default HeaderSelectBox