import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import TransactionDetail from "../TransactionDetail/TransactionDetail";
import "./App.css";
import axios from "axios";

export default function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [filterInputValue, setFilterInputValue] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [transfers, setTransfers] = useState([]);

  useEffect(async () => {
    const getTransactions = async () => {
      setIsFetching(true);
      try {
        const res = await axios.get("http://localhost:3001/bank/transactions");
        const validRes = res.data;
        if (validRes) {
          setTransactions(validRes.transactions);
        }
      } catch (e) {
        setError(e);
      }
      setIsFetching(false);
    };

    const getTransfers = async () => {
      setIsFetching(true);
      try {
        const res = await axios.get("http://localhost:3001/bank/transfers");
        const validRes = res.data;
        if (validRes) {
          setTransfers(validRes.transfers);
        }
      } catch (e) {
        setError(e);
      }
      setIsFetching(false);
    };

    getTransactions();
    getTransfers();
  }, []);

  const addTransaction = (newTransaction) => {
    setTransactions((cur) => [...cur, newTransaction]);
  };

  const handleOnInputChange = (newText) => {
    setFilterInputValue(newText);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          handleOnInputChange={handleOnInputChange}
          filterInputValue={filterInputValue}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isFetching={isFetching}
                transactions={transactions}
                addTransaction={addTransaction}
                filterInputValue={filterInputValue}
              />
            }
          />
          <Route path="/:transactionId" element={<TransactionDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
