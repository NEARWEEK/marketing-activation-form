/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line import/extensions
import Header from "../../components/Header/Header";

// eslint-disable-next-line import/extensions
import { useStyles } from './MarketingRequestForm.styles';

const MarketingRequestForm = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.title}>MarketingRequestForm</div>
    </>
  );
};

export default MarketingRequestForm;
