import React, { useEffect, useRef } from 'react'
import { Grid, Button, Paper, Card, CardContent, InputLabel } from "@material-ui/core";
import FormInput from '../CustomTextField'
const Input = ({ index }) => {
    return (
        <Card style={{ width: 300 }}>
            <CardContent>
                <FormInput name={`name.[${ index }]`} label='Name' />
                <FormInput name={'email.[' + index + ']'} label='Email' type='email' />
                <FormInput name={`deadline.[${ index }]`} label='Deadline' />
            </CardContent>
        </Card>
    )
};

const StudentInfor = () => {
    const [inputList, setInputList] = React.useState([<Input key={0} index={0} />]);
    const EndRef = useRef(null)

    const scrollToBottom = () => {
        EndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [inputList]);
    const onAddBtnClick = event => {
        if (inputList.length < 5)
            setInputList(inputList.concat(<Input key={inputList.length} index={inputList.length} />));
    };
    return (
        <Grid item container xs={12}>
            <InputLabel >Candidate Information</InputLabel>

            <Grid item xs={11} style={{ overflow: 'auto' }}>
                <Paper style={{ maxHeight: 200, display: 'inline-flex' }}>
                    {inputList}
                    <div ref={EndRef} />
                </Paper>
            </Grid>
            <Grid item xs={1} >
                <Button style={{ height: '100%', minWidth: 'auto' }} variant="contained" color="primary" onClick={onAddBtnClick}>+</Button>
            </Grid>
        </Grid>
    )
}

export default StudentInfor
