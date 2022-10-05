import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import { SummaryCard, SummaryContainer } from "./styles";

import { TransactionsContext } from '../../contexts/TransactionsContext';
import { priceFormatter } from '../../utils/formatter';
import { useContext } from 'react';

export function Summary() {
  const { transactions } = useContext(TransactionsContext);
  
  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      acc.incomes += transaction.price;
      acc.total += transaction.price;
    } else {
      acc.outcomes += transaction.price;
      acc.total -= transaction.price;
    }
    
    return acc;
  }, {
    incomes: 0,
    outcomes: 0,
    total: 0,
  });

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color={"#00b37e"} />
        </header>

        <strong>{priceFormatter.format(summary.incomes)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color={"#f75a68"} />
        </header>

        <strong>{priceFormatter.format(summary.outcomes)}</strong>
      </SummaryCard>

      <SummaryCard variant='green'>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color={"#fff"} />
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
