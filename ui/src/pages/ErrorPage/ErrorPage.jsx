/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable id-length */
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";

// eslint-disable-next-line import/extensions
import { useStyles } from "./ErrorPage.styles";

const ErrorPage = () => {
  const classes = useStyles();

  return (
    <>
      <Box sx={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#fff' }}>
        <Box className={classes.errorBox}>
          <Box display="flex" justifyContent="center">
            <Box className={classes.textBlock}>
              <Box className={classes.errorIcon}>
                <Box component="h2" sx={{ fontWeight: [400], fontSize: 36, m: 0 }}>
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                </Box>
              </Box>
              <Box className={classes.errorTitle}>
                <Box component="h2" sx={{ fontWeight: [400], fontSize: 36, m: 0 }}>
                  Oops! Something went wrong.
                </Box>
              </Box>
              <Box className={classes.errorDescription}>
                <Box component="h2" sx={{ fontWeight: [400], fontSize: 20, m: 0 }}>
                  Please try again later.
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ErrorPage;
