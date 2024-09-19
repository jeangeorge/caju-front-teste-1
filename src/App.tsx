import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ConfirmationModal, Header } from "~/components";
import { ConfirmationModalProvider } from "~/contexts";
import Router from "~/router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <ConfirmationModalProvider>
        <Router />
        <ConfirmationModal />
        <ToastContainer />
      </ConfirmationModalProvider>
    </QueryClientProvider>
  );
}

export default App;
