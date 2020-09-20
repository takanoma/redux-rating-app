import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import CheckboxLabel from "./CheckboxLabel";
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        borderBottom: "solid 1px",
        "&:hover": {
            borderBottom: "solid 2px"
        }
    },
    error: {
        display: 'flex',
        borderBottom: "solid 2px red"
    },
    formControl: {
        margin: theme.spacing(3),

    },
    formLabel: {
        textAlign: "left",
        position: "relative",
        right: "20px"
    },
    formGroup: {
        flexDirection: "row"
    }
}));

const CheckboxesGroup = (props) => {
    const classes = useStyles();

    return (
        <div className={props.error ? classes.error : classes.root}>
            <FormControl component="fieldset" className={classes.formControl} required={props.required} error={props.error}>
                <FormLabel className={classes.formLabel} component="legend">{props.label}</FormLabel>
                <FormGroup className={classes.formGroup}>
                    {
                        props.sections.length > 0 && props.sections.map(section  => (
                            <CheckboxLabel key={section.id} checked={section.checked} onChange={props.onChange} name={String(section.id)} label={section.name}/>
                        ))
                    }
                </FormGroup>
                <FormHelperText>{props.helperText}</FormHelperText>
            </FormControl>
        </div>
    );
}
export default CheckboxesGroup