import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  welcomeBox: {
    alignItems: 'center',
    flex: 'auto',
    maxWidth: 800,
    margin: '0 auto',
  },
  welcomeLogo: {
    maxWidth: 600,
    margin: '0 auto',
  },
  textBlock: {
    textAlign: "center",
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    alignItems: 'center',
  },
  title: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  description: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
});

export const useStyles = makeStyles(styles, { name: 'WelcomePage' });
