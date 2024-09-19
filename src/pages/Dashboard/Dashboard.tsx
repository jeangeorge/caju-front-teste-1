import { LoadingSpinner } from "~/components";

import { Columns, SearchBar } from "./components";

import * as S from "./Dashboard.styles";

import useDashboardPage from "./useDashboardPage";

const DashboardPage = () => {
  const {
    error,
    loading,
    registrations,
    onRefresh,
    onSearch,
    onDeleteRegistration,
    onUpdateRegistration,
  } = useDashboardPage();

  if (error) {
    return (
      <S.Container>
        <h2>
          Ocorreu um erro ao buscar os registros, por favor tente novamente.
        </h2>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <SearchBar onSearch={onSearch} onRefresh={onRefresh} />

      {loading ? (
        <S.LoadingSpinnerContainer>
          <LoadingSpinner />
        </S.LoadingSpinnerContainer>
      ) : (
        <Columns
          registrations={registrations}
          onDeleteRegistration={onDeleteRegistration}
          onUpdateRegistration={onUpdateRegistration}
        />
      )}
    </S.Container>
  );
};

export default DashboardPage;
