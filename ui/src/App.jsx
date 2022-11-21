/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Routes, Route } from 'react-router-dom';

import Header from "./components/Header/Header";
import CreateBountyProposal
  from "./pages/CreateBountyProposal/CreateBountyProposal";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import MarketingRequestForm
  from "./pages/MarketingRequestForm/MarketingRequestForm";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

const App = ({ history }) => {
  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<WelcomePage history={history} />} />
        <Route path="marketing-request-form" element={<MarketingRequestForm />} />
        <Route path="create-bounty-proposal" element={<CreateBountyProposal />} />
        <Route path="error" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
