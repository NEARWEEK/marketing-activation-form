/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable id-length */
import { Box } from "@mui/material";

// eslint-disable-next-line import/extensions
import { useStyles } from './CompletePage.styles';

const CompletePage = () => {
  const classes = useStyles();

  return (
    <>
      <Box sx={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#fff' }}>
        <Box className={classes.completeBox}>
          <Box display="flex" justifyContent="center">
            <Box className={classes.textBlock}>
              <Box className={classes.completeTitle}>
                <Box component="h2" sx={{ fontWeight: [400], fontSize: 36, m: 0 }}>
                  Your application for the creation of a DAO has been submitted and will be considered.
                  <br/>Thank you!
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CompletePage;
