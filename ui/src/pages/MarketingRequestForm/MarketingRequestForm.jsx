/* eslint-disable react/react-in-jsx-scope */
import { Widget } from '@typeform/embed-react'

// eslint-disable-next-line import/extensions
import Header from "../../components/Header/Header";

// eslint-disable-next-line import/extensions
import { useStyles } from './MarketingRequestForm.styles';

const formId = process.env.REACT_APP_TYPEFORM_ID;

const MarketingRequestForm = () => {
  const classes = useStyles();
  const widgetContainerStyle = {
    width: '100%',
    height: '100%',
  }

  return (
    <>
      <Header />
      <div className={classes.widget}>
        <Widget
          id={formId}
          style={widgetContainerStyle}
          hideHeaders={true}
          opacity={0}
          autoFocus={true}
          autoResize={true}
          keepSession={true}
        />
      </div>
    </>
  );
};

export default MarketingRequestForm;
