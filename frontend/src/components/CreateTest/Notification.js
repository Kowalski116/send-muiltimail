import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Notification = ({ notify, setNotify }) => {
    const handleClose = (event, reason) => {
        setNotify({
            ...notify, isOpen: false
        })
    }
    return (
        <div>
            <Snackbar open={notify.isOpen} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={notify.type}>
                    {notify.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Notification
