/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable id-length */
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

// eslint-disable-next-line import/extensions
import { useStyles } from './CreateBountyProposal.styles';

const CreateBountyProposal = () => {
  const classes = useStyles();
  const mailto = 'joep@nearweek.com';

  return (
    <>
      <Box sx={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#fff' }}>
        <Box className={classes.bountyBox}>
          <Box display="flex" justifyContent="center">
            <Box className={classes.textBlock}>
              <Box className={classes.thankYouScreensTitle}>
                <Box component="h2" sx={{ fontWeight: [400], fontSize: 36, m: 0 }}>
                  Thank you for filling in the form.<br/>
                  The form input will be sent to the promotional channels in NEAR&apos;s ecosystem.
                </Box>
              </Box>
              <Box className={classes.thankYouScreensDescription}>
                <Box component="h2" sx={{ fontWeight: [400], fontSize: 20, m: 0 }}>
                  If you have any further questions, feel free to reach out to&nbsp;
                  <Link
                    to='#'
                    onClick={(event) => {
                      event.preventDefault();
                      window.location.href = `mailto:${mailto}`;
                    }}
                  >
                    {mailto}
                  </Link>.
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateBountyProposal;
