import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  errorBox: {
    alignItems: 'center',
    flex: 'auto',
    maxWidth: 800,
    marginTop: 30,
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: "#444"
  },
  errorIcon: {
    textAlign: "center",
  },
  textBlock: {
    textAlign: "center",
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    alignItems: 'center',
  },
  errorTitle: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  errorDescription: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
});

export const useStyles = makeStyles(styles, { name: 'WelcomePage' });
