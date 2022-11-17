import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  container: {
    maxWidth: 280,
    width: '100%',
    maxHeight: 208,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5),
    marginLeft: 16,
    marginRight: 16,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loader: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: '#ccc',
  },
  img: {
    width: 72,
    height: 72,
  },
  formHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: '20px !important',
    fontWeight: '700 !important',
  },
});

export const useStyles = makeStyles(styles, { name: 'Loader' });
