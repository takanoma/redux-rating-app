import React from 'react';
import TextField from "@material-ui/core/TextField";

const TextInput = (props) => {
    return (
        <TextField
            error={props.hasError}
            fullWidth={props.fullWidth}
            variant={props.variant}
            label={props.label}
            margin="dense"
            InputProps={{
                readOnly: props.variant === "filled",
            }}
            multiline={props.multiline}
            required={props.required}
            rows={props.rows}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
            disabled={props.disabled}
            helperText={props.helperText}
        />
    )
}

export default TextInput