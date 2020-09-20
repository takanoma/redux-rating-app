import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles({
    root: {
        height: "5px"
    },
    formControl: {
        minWidth: 500,
        width: "100%",
        textAlign: "left"
    },
});

const SelectBox = (props) => {

    const classes = useStyles();

    return (
        <div>
            <div className={classes.root} />
            <FormControl variant="outlined" disabled={props.disabled} required={props.required} className={classes.formControl} error={props.error}>
                <InputLabel className={classes.label}>{props.label}</InputLabel>
                <Select className={classes.item}
                    value={props.value}
                    onChange={(e) => props.select(e.target.value)}
                    label={props.label}
                >
                    {props.options.map((value) => {
                        return <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
                    })}
                </Select>
                <FormHelperText>{props.helperText}</FormHelperText>
            </FormControl>
        </div>
    )
}

export default SelectBox