import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import Layout from "./containers/Layout";
import Header from "./components/Header";
import LocalStorageSaver from "./containers/helpers/LocalStorageSaver";
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
