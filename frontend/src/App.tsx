import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import Layout from "./conatiners/Layout";
import Header from "./components/Header";
import LocalStorageSaver from "./conatiners/helpers/LocalStorageSaver";
import { setupStore } from "./store/store";


export const store = setupStore();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Layout />
        <LocalStorageSaver />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
