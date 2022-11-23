/* eslint-disable react/react-in-jsx-scope */
import { Widget } from '@typeform/embed-react'
import { useStoreActions } from 'easy-peasy';
import { useEffect } from "react";
import { useNavigate } from "react-router";

import Loader from "../../components/general/Loader/Loader";
import { routes } from "../../config/routes";
import useAccountSignature from "../../hooks/useAccountSignature";
import useTypeform from "../../hooks/useTypeform";
import { sendingForm } from "../../services/apiService";

// eslint-disable-next-line import/extensions
import { useStyles } from './MarketingRequestForm.styles';

const demoMode = process.env.REACT_APP_TYPEFORM_DEMO_MODE === 'true';
const { createBountyProposal, errorPage } = routes;

const MarketingRequestForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const formId = useTypeform();
  const signature = useAccountSignature();
  const setMarketingFromId = useStoreActions((actions) => actions.setMarketingFromId);

  useEffect(() => {
    if (formId === '') {
      navigate(errorPage);
    }
  }, [formId]);

  const widgetContainerStyle = {
    width: '100%',
    height: '100%',
  }

  const handleSubmitTypeform = (event, id, sign) => {
    (async () => {
      try {
        console.log(event.response_id)
        const response = await sendingForm(id, 1, sign);
        if (response) {
          setMarketingFromId(response.id);
          navigate(createBountyProposal);
        } else {
          navigate(errorPage);
        }
      } catch (error) {
        console.log(error);
        navigate(errorPage);
      }
    })();
  };

  return (
    <>
      {
        formId && signature ?
          <div className={classes.widget}>
            <Widget
              id={formId}
              style={widgetContainerStyle}
              hideHeaders={true}
              opacity={0}
              autoFocus={true}
              autoResize={true}
              keepSession={true}
              enableSandbox={demoMode}
              onSubmit={(event) => handleSubmitTypeform(event, formId, signature)}
            />
          </div>
          : <Loader />
      }
    </>
  );
};

export default MarketingRequestForm;
