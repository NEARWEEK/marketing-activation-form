import { alpha } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  account: {
    fontWeight: '700 !important',
    textAlign: 'left',
  },
  button: {
    fontSize: '14px !important',
    fontWeight: '600',
    borderRadius: '32px !important',
    maxWidth: 196,
    color: '#4c6ef5 !important',
    backgroundColor: '#edf2ff !important',
    '&:hover': {
      backgroundColor: '#dce6ff !important',
    },
  },
  signOutButton: {
    borderRadius: '32px !important',
    color: '#fff !important',
    backgroundColor: '#448aff !important',
    '&:hover': {
      backgroundColor: '#005Fff !important',
      color: '#fff !important',
    },
  },
  textWrapper: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  menu: {
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(6),
      minWidth: 280,
      color: 'rgb(55, 65, 81)',
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      },
    },
  },
});

export const useStyles = makeStyles(styles, { name: 'UserMenu' });
