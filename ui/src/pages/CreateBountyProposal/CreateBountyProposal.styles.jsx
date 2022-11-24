import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  bountyBox: {
    alignItems: 'center',
    flex: 'auto',
    maxWidth: 800,
    marginTop: 30,
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textBlock: {
    textAlign: "center",
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    alignItems: 'center',
  },
  thankYouScreensTitle: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  thankYouScreensDescription: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  form: {
    width: '50%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  inputGroup: {
    marginBottom: '24px !important',
    textAlign: 'left',
    '& .MuiDivider-root::before': {
      width: '0 !important',
    },
  },
});

export const useStyles = makeStyles(styles, { name: 'CreateBountyProposal' });
