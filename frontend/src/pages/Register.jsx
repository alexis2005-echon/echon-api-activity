import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:3000/api/v1';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role || form.role || 'user');
      localStorage.setItem('userName', data.name || form.name);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="auth-card">
        <h1>Create account</h1>
        <p className="subtitle">Register a user for the Dish Dashboard.</p>

        <form onSubmit={handleRegister} className="form-grid">
          <label>
            Name
            <input
              type="text"
              value={form.name}
              onChange={updateField('name')}
              placeholder="Chef Alex"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={updateField('email')}
              placeholder="chef@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={updateField('password')}
              placeholder="Minimum 6 characters"
              required
            />
          </label>

          <label>
            Role
            <select value={form.role} onChange={updateField('role')}>
              <option value="user">User (read only)</option>
              <option value="manager">Manager (create + update)</option>
              <option value="admin">Admin (create + update + delete)</option>
            </select>
          </label>

          <p className="hint-text">Current backend registration may enforce role=user unless role creation endpoints are added server-side.</p>

          {error ? <p className="error-text">{error}</p> : null}

          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>

        <p className="switch-link">
          Already registered? <Link to="/login">Back to login</Link>
        </p>
      </section>
    </main>
  );
}
