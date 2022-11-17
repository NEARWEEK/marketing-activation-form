/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useStoreState } from 'easy-peasy';
import { Routes, Route } from 'react-router-dom';

import { Error } from './components/general/Error/Error';
import MarketingRequestForm
  from "./pages/MarketingRequestForm/MarketingRequestForm";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

const App = ({ history }) => {
  const isError = useStoreState((store) => store.error.isError);

  return (
    <>
      <Routes>
        <Route index path="/" element={<WelcomePage history={history} />} />
        <Route path="marketing-request-form" element={<MarketingRequestForm />} />
      </Routes>
      {isError && <Error isError={isError} />}
    </>
  );
};

export default App;
