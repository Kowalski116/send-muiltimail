import React, { useState } from 'react'
import useStyles from "./Styles";
import Mail from '../Temple/Mail'
import { useForm, FormProvider } from 'react-hook-form'
import StudentInfor from "./CandidateInfor";
import { NativeSelect, Paper, Button, InputLabel, Grid } from '@material-ui/core'
import FormInput from '../CustomTextField'
import axios from 'axios'
import Notification from "./Notification";
import Loading from '../common/Loading'


const Form = ({ handleClose, options, setOptions }) => {
    const classes = useStyles();
    const methods = useForm();

    const [option, setOption] = useState(null);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [loading, setLoading] = useState(false)
    const handleChange = (event) => {
        if (event.target.value === '+') {
            setOption({ name: '', text: "" });
            return
        } else if (event.target.value === '') {
            setOption(null)
            return
        }
        const [temp] = options.filter(o => o._id === event.target.value)
        setOption({ ...temp });
    };

    const handleClose1 = () => {
        setOption('');;
    };



    const onSubmit = data => {
        setLoading(true)
        const [text] = options.filter(a => a._id === option._id)
        axios.post('/sendemail', { ...data, text: text.text })
            .then(res => {
                setNotify({ isOpen: true, message: "Gửi mail thành công", type: "success" })
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setNotify({ isOpen: true, message: "Gửi mail thất bại", type: "error" })
                setLoading(false)
            })
    };

    return (
        <Grid container spacing={2} >
            <Loading open={loading} />
            <Grid item xs={12} sm={5}>
                <Paper className={classes.paper}>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} >
                            <Grid container spacing={3}>
                                <FormInput name='subject' label='Subject' />
                                <StudentInfor />
                                <Grid item xs={12} sm={8}>
                                    <InputLabel style={{ minWidth: 400 }}>Send with Invitation (choose the template)</InputLabel>
                                    <NativeSelect
                                        value={option?._id}
                                        onChange={handleChange}
                                        style={{ minWidth: 300 }}
                                        name='template'
                                        displayEmpty
                                    >
                                        <option aria-label="None" value="" />
                                        {options.map((op, index) => <option key={op._id} value={op._id}>{op.name}</option>)}
                                        <option key={1} value='+'>Add New</option>
                                    </NativeSelect>
                                </Grid>

                            </Grid>
                            <br />
                            <div className={classes.buttons}>
                                <Button className={classes.button} variant="contained" onClick={handleClose}>Cancel</Button>
                                <Button className={classes.button} variant="contained" color="primary" type='submit'>Invite</Button>
                            </div>
                        </form>
                    </FormProvider>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={7}>
                {
                    option && <Mail handleClose1={handleClose1} data={option} setNotify={setNotify} setOptions={setOptions} />
                }
            </Grid>
            <Notification notify={notify} setNotify={setNotify} />
        </Grid>
    )
}

export default Form
