import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles'
import { Avatar } from '@material-ui/core'

const Header = () => {
    const classes = useStyles();
    return (
        <div>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                <Typography variant="h6" noWrap className={classes.typography} style={{ flex : 1}}>
                    Candidate Management
                </Typography>
                <Typography variant="h6" noWrap className={classes.typography}>Admin</Typography>
                <Avatar className={classes.avatar}>D</Avatar>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
