/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useStoreState } from 'easy-peasy';
import { Routes, Route } from 'react-router-dom';

import { Error } from './components/general/Error/Error';
import CreateBountyProposal
  from "./pages/CreateBountyProposal/CreateBountyProposal";
import Header from "./components/Header/Header";
import MarketingRequestForm
  from "./pages/MarketingRequestForm/MarketingRequestForm";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

const App = ({ history }) => {
  const isError = useStoreState((store) => store.error.isError);

  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<WelcomePage history={history} />} />
        <Route path="marketing-request-form" element={<MarketingRequestForm />} />
        <Route path="create-bounty-proposal" element={<CreateBountyProposal />} />
      </Routes>
      {isError && <Error isError={isError} />}
    </>
  );
};

export default App;
