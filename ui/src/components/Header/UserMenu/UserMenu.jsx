/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable id-length */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Menu } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useStoreActions } from 'easy-peasy';
import { useState } from 'react';

import NearLogo from '../../../images/near_logo.jpg';

import { useStyles } from './UserMenu.styles';

const UserMenu = ({ history, accountId }) => {
  const onDisconnect = useStoreActions((actions) => actions.onDisconnect);

  const handleDisconnectWallet = () => {
    onDisconnect(history);
  };

  const classes = useStyles();
  const [anchorElement, setAnchorElement] = useState(null);

  const isOpen = Boolean(anchorElement);

  const handleClick = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <>
      <Button
        id="menu-button"
        aria-controls={isOpen ? 'menu-button' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        variant="contained"
        disableElevation
        className={classes.button}
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
      >
        <span className={classes.textWrapper}>
          {accountId}
        </span>
      </Button>
      <Menu
        className={classes.menu}
        id="user-menu"
        elevation={0}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
        anchorElement={anchorElement}
        open={isOpen}
        onClose={handleClose}
        color="inherit"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ p: 2 }}
        >
          <Box
            component="img"
            src={NearLogo}
            alt={'Near'}
            sx={{ width: '72px', height: '72px', mb: 2 }}
          />
          <Typography component="h5" sx={{ fontWeight: [700] }}>
            {accountId}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ p: 2 }}>
          <Button
            className={classes.signOutButton}
            onClick={handleDisconnectWallet}
            sx={{
              fontWeight: [600],
              borderRadius: 3,
              width: 1,
              backgroundColor: '#F2E7FE',
              border: 0,
            }}
          >
            Sign Out
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default UserMenu;
