import React, {useState, useEffect} from 'react'
import {
    Paper,
    Grid,
    Typography,
    Button,
    Card
} from '@material-ui/core'
import EditorMail from '../Editor/Editor'
import parse from 'html-react-parser'
import axios from 'axios'
import {useForm, FormProvider} from 'react-hook-form'
import FormInput from '../CustomTextField'
import useStyles from './styles'
import Loading from '../common/Loading'

const Mail = ({handleClose1, data, setNotify, setOptions}) => {
    const methods = useForm();
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState(data.text)
    const [originText, setOriginText] = useState('')

    const _id = data._id
    useEffect(() => {
        setText(data.text)
        setOriginText(data.text)
        methods.setValue('name', data.name)
    }, [data])
    const convert = (text) => {
        text = text.replace('$NAME$', `student's name`)
        text = text.replace('$SUBJECT$', 'subject')
        text = text.replace('$DEADLINE$', `test's deadline`)
        return text
    }

    const updateTemplate = data => {
        setLoading(true)
        axios.patch(`/template/${_id}`, {...data, text }).then(res => {
            const  updatedTemplate  = res.data
            setOptions(prev => prev.map(p => p._id === updatedTemplate._id ? updatedTemplate : p))
            setOriginText(text)
            setNotify({isOpen: true, message: "Cập nhật mẫu mail thành công", type: "success"})
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setNotify({isOpen: true, message: "Cập nhật mẫu email thất bại", type: "error"})
            setLoading(false)
        })
    }
    const onSubmit = data => {
        setLoading(true)
        axios.post('/template/add', {
            ...data,
            text
        }).then(res => {
            const  newTemplate  = res.data
            setNotify({isOpen: true, message: "Lưu mẫu email thành công", type: "success"})
            setLoading(false)
            setOptions(prev => ([...prev, newTemplate]))
            handleClose1()
        }).catch(err => {
            console.log(err)
            setNotify({isOpen: true, message: "Lưu mẫu email thất bại", type: "error"})
            setLoading(false)
        })

    };
    return (
        <Paper className={
                classes.paper
            }
            style={
                {borderTop: '5px solid #3f51b5'}
        }>
            
            <Loading open={loading} />
            <Typography className={
                    classes.typography
                }
                variant='h6'
                align='center'> {
                    data.name ? 'Update' : 'Add'
                } Email Template</Typography>
            <FormProvider { ...methods}>
                <form onSubmit={
                    data.name ? methods.handleSubmit(updateTemplate) : methods.handleSubmit(onSubmit)
                }>
                    <Grid container
                        spacing={1}>
                        <Grid item
                            xs={12}
                            sm={8}>
                            <FormInput name='name' label='Add a title' disabled={data.name}/>
                            <br/>
                            <EditorMail text={text}
                                setText={setText}/>
                        </Grid>
                        <Grid item
                            xs={12}
                            sm={4}>
                            <Paper variant="outlined" fullWidth
                                style={
                                    {height: '100%'}
                            }>
                                <Typography className={
                                        classes.typography
                                    }
                                    style={
                                        {
                                            borderBottom: '1px solid #e0e0e0',
                                            height: 48
                                        }
                                    }
                                    variant='subtitle2'
                                    align='center'>Use these components to personalize your message</Typography>
                                    <div className="warp">
                                        <Typography variant='subtitle2'>- $NAME$: student's name.</Typography>
                                        <Typography variant='subtitle2'>- $SUBJECT$: subject.</Typography>
                                        <Typography variant='subtitle2'>- $DEADLINE$: test's deadline.</Typography>
                                    </div>
                            </Paper>
                        </Grid>

                        <Grid item
                            xs={12}>
                            <Typography className={
                                    classes.typography
                                }
                                variant='h6'
                                align='center'>Your email will be looked like this...</Typography>
                            <Card variant="outlined" style={{ padding: "0 10px", height: 300, wordBreak: "break-word", overflowY:"auto"}}>
  
                                    {parse(convert(text))}
            
                            </Card>
                            <div className={
                                classes.buttons
                            }>
                                <Button className={
                                        classes.button
                                    }
                                    variant="contained"
                                    onClick={handleClose1}>Cancel</Button>
                                <Button className={
                                        classes.button
                                    }
                                    variant="contained"
                                    color="primary"
                                    type='submit'
                                    disabled = {originText === text}
                                    >
                                    {
                                    data.name ? 'Update' : 'Submit'
                                }</Button>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>


        </Paper>

    )
}

export default Mail
