import AddTransaction from "../AddTransaction/AddTransaction";
import BankActivity from "../BankActivity/BankActivity";
import "./Home.css";

export default function Home({
  transactions,
  addTransaction,
  isFetching,
  filterInputValue,
}) {
  const filteredTransactions =
    filterInputValue.length === 0
      ? transactions
      : transactions.filter((t) =>
          t.description.toLowerCase().includes(filterInputValue)
        );
  console.log(filteredTransactions, "THIS IS filteredTransactions in HOME.JS");
  return (
    <div>
      {isFetching ? (
        <div> fetching api </div>
      ) : (
        <div className="Home">
          <AddTransaction addTransaction={addTransaction} />
          <BankActivity transactions={filteredTransactions} />
        </div>
      )}
    </div>
  );
}
