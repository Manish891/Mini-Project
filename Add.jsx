import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Add.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWallet, faReceipt } from "@fortawesome/free-solid-svg-icons";

const Add = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);

    // Update transactions when new data is passed from AddIncome page
    useEffect(() => {
        if (location.state?.newTransaction) {
            setTransactions((prev) => [...prev, location.state.newTransaction]);
        }
    }, [location.state]);

    return (
        <div className="add-container">
            <div className="add-form">
                <h1>Add</h1>
                <div className="buttons">
                    <button className="income" onClick={() => navigate('/income')}>
                        <FontAwesomeIcon icon={faWallet} className="icon" /> Add Income
                    </button>
                    <button className="expense">
                        <FontAwesomeIcon icon={faReceipt} className="icon" /> Add Expense
                    </button>
                </div>
                <h3>Last Added</h3>
                <div className="transactions">
                    {transactions.length > 0 ? (
                        transactions.map((ts, index) => (
                            <div key={index} className="transaction-item">
                                <div>
                                    <p className="transaction-name">{ts.name}</p>
                                    <p className="transaction-date">{ts.date}</p>
                                </div>
                                <p className={`transaction-amount ${ts.color}`}>{ts.amount}</p>
                            </div>
                        ))
                    ) : (
                        <p>No transactions added yet.</p>
                    )}
                    <button className="add-button">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Add;
