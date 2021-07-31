import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'
const CustomTextField = ({ name, label, ...rest }) => {
    const { control } = useFormContext();
    return (
        <Grid item xs={12} >
            <Controller
                as={TextField}
                control={control}
                fullWidth
                name={name}
                label={label}
                required
                {...rest}
            />
        </Grid>
    )
}

export default CustomTextField
