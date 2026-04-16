import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const API_BASE = 'http://localhost:3000/api/v1';

const roleRank = {
  user: 1,
  manager: 2,
  admin: 3,
};

const canCreate = (role) => roleRank[role] >= roleRank.manager;
const canUpdate = (role) => roleRank[role] >= roleRank.manager;
const canDelete = (role) => roleRank[role] >= roleRank.admin;

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [newDish, setNewDish] = useState({
    name: '',
    price: 100,
    category: 'Main Course',
  });
  const [editingDish, setEditingDish] = useState(null);
  const [userRole, setUserRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = useMemo(() => localStorage.getItem('token'), []);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const decodedRole = decoded.role;
      const storedRole = localStorage.getItem('role');
      setUserRole(decodedRole || storedRole || 'user');
    } catch {
      setUserRole(localStorage.getItem('role') || 'user');
    }
  }, [navigate, token]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/dishes`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load dishes');
      }

      setItems(data);
    } catch (err) {
      setError(err.message || 'Could not load dishes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE}/dishes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newDish.name,
          price: Number(newDish.price),
          category: newDish.category,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create dish');
      }

      setNewDish({ name: '', price: 100, category: 'Main Course' });
      fetchData();
    } catch (err) {
      setError(err.message || 'Could not create dish.');
    }
  };

  const handleStartEdit = (item) => {
    setEditingDish({
      _id: item._id,
      name: item.name,
      price: item.price,
      category: item.category,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingDish?._id) {
      return;
    }

    setError('');

    try {
      const response = await fetch(`${API_BASE}/dishes/${editingDish._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editingDish.name,
          price: Number(editingDish.price),
          category: editingDish.category,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update dish');
      }

      setEditingDish(null);
      fetchData();
    } catch (err) {
      setError(err.message || 'Could not update dish.');
    }
  };

  const handleDelete = async (id) => {
    setError('');

    try {
      const response = await fetch(`${API_BASE}/dishes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete dish');
      }

      fetchData();
    } catch (err) {
      setError(err.message || 'Could not delete dish.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <main className="page-shell dashboard-shell">
      <section className="dashboard-header">
        <div>
          <h1>Dish Dashboard</h1>
          <p className="subtitle">
            Signed in as <strong>{localStorage.getItem('userName') || 'User'}</strong> ({userRole})
          </p>
        </div>
        <button className="secondary-btn" onClick={handleLogout}>
          Log Out
        </button>
      </section>

      {error ? <p className="error-text panel">{error}</p> : null}

      {canCreate(userRole) && (
        <section className="panel">
          <h2>Create Dish</h2>
          <form className="form-inline" onSubmit={handleCreate}>
            <input
              value={newDish.name}
              placeholder="Dish name"
              onChange={(e) => setNewDish((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
            <input
              type="number"
              min="0"
              max="1000"
              value={newDish.price}
              onChange={(e) => setNewDish((prev) => ({ ...prev, price: e.target.value }))}
              required
            />
            <select
              value={newDish.category}
              onChange={(e) => setNewDish((prev) => ({ ...prev, category: e.target.value }))}
            >
              <option>Starter</option>
              <option>Main Course</option>
              <option>Dessert</option>
              <option>Beverage</option>
            </select>
            <button type="submit">Add Item</button>
          </form>
        </section>
      )}

      {canUpdate(userRole) && editingDish && (
        <section className="panel">
          <h2>Update Dish</h2>
          <form className="form-inline" onSubmit={handleUpdate}>
            <input
              value={editingDish.name}
              onChange={(e) => setEditingDish((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
            <input
              type="number"
              min="0"
              max="1000"
              value={editingDish.price}
              onChange={(e) => setEditingDish((prev) => ({ ...prev, price: e.target.value }))}
              required
            />
            <select
              value={editingDish.category}
              onChange={(e) => setEditingDish((prev) => ({ ...prev, category: e.target.value }))}
            >
              <option>Starter</option>
              <option>Main Course</option>
              <option>Dessert</option>
              <option>Beverage</option>
            </select>
            <button type="submit">Save</button>
            <button type="button" className="ghost-btn" onClick={() => setEditingDish(null)}>
              Cancel
            </button>
          </form>
        </section>
      )}

      <section className="panel">
        <h2>Menu Items</h2>
        {loading ? <p>Loading dishes...</p> : null}

        <ul className="dish-list">
          {items.map((item) => (
            <li key={item._id}>
              <div>
                <strong>{item.name}</strong>
                <p>
                  {item.category} · ${Number(item.price || 0).toFixed(2)}
                </p>
              </div>
              <div className="actions">
                {canUpdate(userRole) ? (
                  <button className="secondary-btn" onClick={() => handleStartEdit(item)}>
                    Update
                  </button>
                ) : null}

                {canDelete(userRole) ? (
                  <button className="danger-btn" onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
