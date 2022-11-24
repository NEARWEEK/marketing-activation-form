/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable id-length */
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import * as Yup from 'yup';

import Input from '../../components/general/Input/Input';
import useDaoContract from "../../hooks/useDaoContract";

// eslint-disable-next-line import/extensions
import { useStyles } from './CreateBountyProposal.styles';

const CreateBountyProposal = () => {
  const classes = useStyles();
  const { isNearLoading, submitProposal } = useDaoContract();
  const mailto = 'joep@nearweek.com';
  const wallet = useStoreState((state) => state.entities?.wallet);
  const setTemporaryData = useStoreActions((actions) => actions.setTemporaryData);

  const validationSchema = Yup.object().shape({
    bounty_description: Yup.string().required('Bounty description is required'),
    bounty_amount: Yup
      .number()
      .min(1, 'Amount must be greater than or equal to 1 NEAR')
      .required()
      .typeError('The value must be a number'),
    bounty_times: Yup
      .number()
      .integer()
      .min(1, 'Value must be greater than or equal to 1')
      .required()
      .typeError('The value must be an integer'),
    bounty_max_deadline: Yup
      .number()
      .integer()
      .min(1, 'Value must be greater than or equal to 1')
      .required()
      .typeError('The value must be an integer'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const handleSubmitButton = (data) => {
    if (
      wallet?.isSignedIn() &&
      data.bounty_description &&
      data.bounty_amount &&
      data.bounty_times &&
      data.bounty_max_deadline
    ) {
      (async () => {
        await submitProposal(
          wallet,
          data.bounty_description,
          data.bounty_amount,
          data.bounty_times,
          data.bounty_max_deadline,
          setTemporaryData
        );
      })();
    }
  };

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
              <Box className={classes.thankYouScreensTitle}>
                <Box component="h2" sx={{ fontWeight: [400], fontSize: 36, m: 0, pt: 3 }}>
                  Now it is necessary to create an proposal to create a Bounty in the DAO<br/>
                  (Bond 1 NEAR).
                </Box>
              </Box>
              <Box className={classes.form}>
                <Box className={classes.inputGroup}>
                  <Input
                    id="bounty-description"
                    label={'Bounty description'}
                    name="bounty_description"
                    register={register}
                    errors={errors}
                  />
                </Box>
                <Box className={classes.inputGroup}>
                  <Input
                    id="bounty-amount"
                    label={'Bounty amount (NEAR)'}
                    name="bounty_amount"
                    type="number"
                    register={register}
                    errors={errors}
                  />
                </Box>
                <Box className={classes.inputGroup}>
                  <Input
                    id="bounty-times"
                    label={'Available Claims'}
                    name="bounty_times"
                    type="number"
                    register={register}
                    errors={errors}
                  />
                </Box>
                <Box className={classes.inputGroup}>
                  <Input
                    id="bounty-max-deadline"
                    label={'Days to Complete'}
                    name="bounty_max_deadline"
                    type="number"
                    register={register}
                    errors={errors}
                  />
                </Box>
              </Box>
              <Box display="flex" sx={{ paddingRight: 2, paddingLeft: 2, paddingBottom: 3 }}>
                <LoadingButton
                  sx={{
                    borderRadius: 3,
                    p: '12px 37px',
                  }}
                  disabled={isNearLoading}
                  loading={isNearLoading}
                  variant="contained"
                  onClick={handleSubmit(handleSubmitButton)}
                  disableElevation
                >
                  <Box style={{ fontWeight: [700] }}>
                    Continue
                  </Box>
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateBountyProposal;
