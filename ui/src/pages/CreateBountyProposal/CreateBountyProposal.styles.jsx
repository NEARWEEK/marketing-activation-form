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
});

export const useStyles = makeStyles(styles, { name: 'CreateBountyProposal' });
