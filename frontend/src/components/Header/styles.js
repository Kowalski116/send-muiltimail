import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "white"
  },
  avatar: {
    marginLeft: theme.spacing(2)
  },
  typography: {
    color: 'black'
  }
}));

export default useStyles