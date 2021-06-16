import { useState } from "react";
import "./AddTransaction.css";
import axios from "axios";

export default function AddTransaction({ addTransaction }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    description: "",
    category: "",
    amount: "",
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      setIsProcessing(true);
      const res = await axios.post("http://localhost:3001/bank/transactions", {
        transaction: form,
      });
      const validRes = res.data;
      if (validRes) {
        addTransaction(validRes.transaction);
      }
    } catch (e) {
      setError(e);
    }
    setIsProcessing(false);
    setForm({
      description: "",
      category: "",
      amount: "",
    });
  };
  return (
    <div className="AddTransaction">
      <h2>Add Transaction</h2>
      <div className="form">
        <div className="fields">
          <div className="field">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter a description..."
              onChange={handleChange}
              value={form.description}
            />
          </div>
          <div className="field">
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter a category..."
              onChange={handleChange}
              value={form.category}
            />
          </div>
          <div className="field" style={{ flex: 0.5 }}>
            <label>Amount (cents)</label>
            <input
              type="number"
              name="amount"
              onChange={handleChange}
              value={form.amount}
            />
          </div>

          <button
            className="btn add-transaction"
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
