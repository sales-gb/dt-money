import { useContext } from "react";
import { Header, SearchForm, Summary } from "../../components";
import { TransactionsContext } from "../../contexts";

import * as S from "./styles";
import { dateFormatter, priceFormatter } from "../../utils";

export function Transactions() {
  const { transactions } = useContext(TransactionsContext);

  return (
    <div>
      <Header />
      <Summary />

      <S.TransactionsContainer>
        <SearchForm />

        <S.TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <S.PriceHighLight variant={transaction.type}>
                      {transaction.type === "outcome" && "- "}
                      {priceFormatter.format(transaction.price)}
                    </S.PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </S.TransactionsTable>
      </S.TransactionsContainer>
    </div>
  );
}
