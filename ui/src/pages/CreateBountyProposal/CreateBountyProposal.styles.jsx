import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  bountyBox: {
    alignItems: 'center',
    flex: 'auto',
    maxWidth: 800,
    marginTop: 20,
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textBlock: {
    width: '100%',
    textAlign: "center",
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    alignItems: 'center',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
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
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  formHeader: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  formTitle: {
    fontSize: '24px !important',
    fontWeight: [700],
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
