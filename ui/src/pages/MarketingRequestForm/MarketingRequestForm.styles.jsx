import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
});

export const useStyles = makeStyles(styles, { name: 'MarketingRequestForm' });
