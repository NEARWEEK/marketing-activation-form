import { makeStyles } from '@mui/styles';

const styles = (theme) => ({
  input: {
    '& .MuiFilledInput-root': {
      fontWeight: 400,
      borderRadius: theme.spacing(1.5),
      borderBottom: 0,
      '& input': {
        paddingTop: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(3),
      },
    },
  },
});

export const useStyles = makeStyles(styles, { name: 'Input' });
