import { MagnifyingGlass } from "phosphor-react";
import * as S from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../contexts";
import { useContextSelector } from "use-context-selector";

/*
UTILIZAÇÃO DO MEMO

* Por que um componente renderiza?
  - Hooks Changed (mudou estado, contexto, reducer);
  - Props Changed (mudou propriedade);
  - Parent rendered (componente pai renderizou);
  
* Qual o fluxo de renderização?
  1. O React cria o HTML da interface daquele componente
  2. Compara a versão do HTML recriada com a versão anterior
  3. SE mudou alguma coisa, ele reescreve o HTML na tela

* Memo: 
  0. Hooks Changed, Props Changed (deep comparison).
  0.1 Comparar a versão anterior dos Hooks e props.
  0.2 SE mudou algo, ele permite a nova renderização e segue normalmente a sequência acima.  
*/

const searchFormSchema = z.object({
  query: z.string(),
});

type TSearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TSearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: TSearchFormInputs) {
    await fetchTransactions(data.query);
  }

  return (
    <S.SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </S.SearchFormContainer>
  );
}
