/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable id-length */
import { AppBar, Toolbar } from '@mui/material';
import Box from "@mui/material/Box";
import { useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';

import { routes } from "../../config/routes";
import Logo from '../../images/nearweek_logo.jpg';

import UserMenu from './UserMenu/UserMenu';

const Header = ({ history }) => {
  const wallet = useStoreState((state) => state.entities.wallet);
  const accountId = wallet?.getAccountId() || null;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        paddingRight: '16px',
        paddingLeft: '16px',
        backgroundColor: '#fff',
        color: '#000',
        borderBottom: '1px solid #ccc',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Link to={routes.welcome}>
          <Box
            component="img"
            sx={{
              height: 'auto',
              p: '4px 0',
            }}
            alt="NEARWEEK logo"
            src={Logo}
          />
        </Link>
        {accountId && <UserMenu history={history} accountId={accountId} />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
