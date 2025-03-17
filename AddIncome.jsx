import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "./AddIncome.css";
import { faL } from "@fortawesome/free-solid-svg-icons";

const AddIncome = () => {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [incomeTitle, setIncomeTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Salary");
   

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Income Data:", { date, incomeTitle, amount, category });
    // Reset form fields
    setDate(new Date());
    setIncomeTitle("");
    setAmount("");
    setCategory("Salary");
  };

  return (
    <div className="add-income-container">
      <h1 className="add-income-title">Add Income</h1>
      <form onSubmit={handleSubmit} className="add-income-form">
         <DatePicker
         value={date}
         onChange= {(newDate)=>{
          setDate(newDate);
          setIsOpen(false);
         }}
         dateFormat='dd/MM/yyyy'
         className="date-picker"
         onCalendarOpen={()=> setIsOpen(true)}
         onCalendarClose={()=> setIsOpen(false)}
         />
        {/* Income Title */}
        <div className="form-group">
          <label className="form-label">Income Title</label>
          <input
            type="text"
            placeholder="Remote Job"
            value={incomeTitle}
            onChange={(e) => setIncomeTitle(e.target.value)}
            required
            className="input-field"
          />
        </div>

        {/* Amount */}
        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            type="number"
            placeholder="$2500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="input-field"
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label className="form-label">Category</label>
          <div className="category-container">
            <button
              type="button"
              className={`category-btn ${category === "Salary" ? "active" : ""}`}
              onClick={() => setCategory("Salary")}
            >
              Salary
            </button>
            <button
              type="button"
              className={`category-btn ${category === "Discount" ? "active" : ""}`}
              onClick={() => setCategory("Discount")}
            >
              Discount
            </button>
            <button
              type="button"
              className={`category-btn ${category === "Other" ? "active" : ""}`}
              onClick={() => setCategory("Other")}
            >
              +
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-income-btn">
          Add Income
        </button>
      </form>
    </div>
  );
};

export default AddIncome;
