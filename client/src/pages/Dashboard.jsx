import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(''); // Assuming logic for category input
    const [notes, setNotes] = useState('');
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await api.get('/api/expenses');
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses", error);
            if (error.response && error.response.status === 401) {
                logout();
                navigate('/login');
            }
        }
    };

    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                title,
                amount,
                notes,
                category_id: category ? parseInt(category) : null
            };
            await api.post('/api/expenses', payload);
            setTitle('');
            setAmount('');
            setCategory('');
            setNotes('');
            fetchExpenses();
        } catch (error) {
            console.error("Error adding expense", error);
            alert("Error adding expense: " + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/expenses/${id}`);
            fetchExpenses();
        } catch (error) {
            console.error("Error deleting expense", error);
        }
    };

    // Simple category input for now, ideally this would be a select dropdown from categories table

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Add Expense</h2>
                <form onSubmit={handleAddExpense} className="flex gap-4 flex-wrap">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Category ID (e.g. 1)"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
                </form>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">My Expenses</h2>
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id} className="border p-4 mb-2 rounded flex justify-between items-center bg-white shadow-sm">
                            <div>
                                <p className="font-bold">{expense.title}</p>
                                <p className="text-gray-600">${expense.amount}</p>
                            </div>
                            <button onClick={() => handleDelete(expense.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
