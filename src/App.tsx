import { Bounce, ToastContainer } from 'react-toastify';
import './App.scss';
import Header from './components/Header';
import TableUser from './components/TableUser';

function App() {
  return (
    <>
      <Header />

      <TableUser />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default App;
