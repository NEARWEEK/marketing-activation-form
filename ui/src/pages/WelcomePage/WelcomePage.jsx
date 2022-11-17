/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable id-length */
import { Box, Button } from "@mui/material";
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router';

import Header from "../../components/Header/Header";
import { routes } from "../../config/routes";
import Logo from '../../images/logo.png';

// eslint-disable-next-line import/extensions
import { useStyles } from './WelcomePage.styles';

const { marketingRequestForm } = routes;

const WelcomePage = () => {
  const onConnectWallet = useStoreActions((actions) => actions.onConnectWallet);
  const wallet = useStoreState((state) => state.entities.wallet);
  const navigate = useNavigate();
  const classes = useStyles();

  const handleWelcomeButton = () => {
    if (wallet.isSignedIn()) {
      navigate(marketingRequestForm);
    } else {
      onConnectWallet();
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#fff' }}>
        <Box className={classes.welcomeBox}>
          <Box className={classes.welcomeLogo}>
            <img src={Logo} alt="Logo" width="100%" />
          </Box>
          <Box display="flex" justifyContent="center">
            <Box className={classes.textBlock}>
              <Box className={classes.title}>
                <Box component="h2" sx={{ fontWeight: [400], fontSize: 36, m: 0 }}>
                  Welcome to the NEAR Ecosystem Marketing<br/>
                  Request Form.
                </Box>
              </Box>
              <Box className={classes.description}>
                <Box component="h2" sx={{ fontWeight: [400], fontSize: 20, m: 0 }}>
                  This form allows you to introduce your project to the promotional channels in<br/>
                  the NEAR ecosystem. Request marketing support at least 14 days before preferred<br/>
                  publication date.
                </Box>
              </Box>
              <Box display="flex" sx={{ paddingRight: 2, paddingLeft: 2, mt: 4 }}>
                <Button
                  sx={{
                    borderRadius: 3,
                    p: '12px 37px',
                  }}
                  variant="contained"
                  onClick={handleWelcomeButton}
                  disableElevation
                >
                  <Box style={{ fontWeight: [700] }}>
                    {wallet.isSignedIn() ? 'Apply Today' : 'Connect wallet'}
                  </Box>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default WelcomePage;
