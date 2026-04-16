import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:3000/api/v1';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role || 'user');
      localStorage.setItem('userName', data.name || '');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="auth-card">
        <h1>Welcome back</h1>
        <p className="subtitle">Sign in to manage dishes and permissions.</p>

        <form onSubmit={handleLogin} className="form-grid">
          <label>
            Email
            <input
              type="email"
              placeholder="chef@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error ? <p className="error-text">{error}</p> : null}

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Log In'}
          </button>
        </form>

        <p className="switch-link">
          No account yet? <Link to="/register">Create one</Link>
        </p>
      </section>
    </main>
  );
}
