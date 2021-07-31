import React, { useState, useEffect } from 'react'
import useStyles from './Styles'
import { Button, Grid } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar';
import axios from 'axios'
import Form from './Form'
import Loading from '../common/Loading'


const CreateTest = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchOption = async () => {
            setLoading(true)
            const result = await axios.get('/template')
                .then(res => res.data)
                .catch(err => console.log(err))
            setLoading(false)
            setOptions(result)
        }
        fetchOption()
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (<>
        <main >
            <Toolbar />
            <Loading open={loading} />
            <main className={classes.layout}>
                <Grid container spacing={2} >
                    <Grid item container fullWidth>
                        <Button variant="contained" color="primary" onClick={handleClickOpen} >Add New Test +</Button>
                        {open && <Form handleClose={handleClose} options={options} setOptions={setOptions} />}
                    </Grid>
                </Grid>
            </main>
        </main>
    </>)
}

export default CreateTest
