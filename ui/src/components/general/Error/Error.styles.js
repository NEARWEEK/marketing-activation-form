import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 360,
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    borderRadius: 8,
    padding: theme.spacing(2),
  },
  header: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 900,
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export const useStyles = makeStyles(styles, { name: 'Error' });
