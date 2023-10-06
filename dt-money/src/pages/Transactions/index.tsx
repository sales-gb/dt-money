import { Header, SearchForm, Summary } from "../../components";
import * as S from "./styles";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <S.TransactionsContainer>
        <SearchForm />

        <S.TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <S.PriceHighLight variant="income">
                  R$ 12.000,00
                </S.PriceHighLight>
              </td>
              <td>Venda</td>
              <td>13/04/2023</td>
            </tr>
            <tr>
              <td width="50%">Méqui</td>
              <td>
                <S.PriceHighLight variant="outcome">
                  - R$ 59,00
                </S.PriceHighLight>
              </td>
              <td>Alimentação</td>
              <td>09/04/2023</td>
            </tr>
          </tbody>
        </S.TransactionsTable>
      </S.TransactionsContainer>
    </div>
  );
}
