import makeStyles from '@mui/styles/makeStyles';

const styles = () => ({
  widget: {
    '& iframe': {
      borderRadius: '0 !important',
    }
  },
});

export const useStyles = makeStyles(styles, { name: 'MarketingRequestForm' });
