/* eslint-disable react/react-in-jsx-scope */
import { Widget } from '@typeform/embed-react'
import { useNavigate } from "react-router";

import { routes } from "../../config/routes";

// eslint-disable-next-line import/extensions
import { useStyles } from './MarketingRequestForm.styles';

const formId = process.env.REACT_APP_TYPEFORM_ID;
const demoMode = process.env.REACT_APP_TYPEFORM_DEMO_MODE === 'true';
const { createBountyProposal } = routes;

const MarketingRequestForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const widgetContainerStyle = {
    width: '100%',
    height: '100%',
  }

  const handleSubmitTypeform = (event) => {
    console.log(event.response_id)
    // eslint-disable-next-line no-warning-comments
    // TODO: sending response_id to backend
    navigate(createBountyProposal);
  };

  return (
    <>
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
          onSubmit={(event) => handleSubmitTypeform(event)}
        />
      </div>
    </>
  );
};

export default MarketingRequestForm;
