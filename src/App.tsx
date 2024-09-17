import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Router from "~/router";
import { ConfirmationModalProvider } from "~/contexts";

import { Header } from "./components/Header";
import { ConfirmationModal } from "./components/ConfirmationModal";

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
      </ConfirmationModalProvider>
    </QueryClientProvider>
  );
}

export default App;
