import { ArrowLeft, ArrowRight, Check, Eye, EyeOff } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const requestedDestination =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname ?? "/app";

  if (isAuthenticated) return <Navigate to={requestedDestination} replace />;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(requestedDestination, { replace: true });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-panel auth-brand-panel">
        <div className="auth-brand-top">
          <Brand />
        </div>
        <div className="auth-visual-copy">
          <h1>
            Research education and career options from one{" "}
            <em>clear workspace.</em>
          </h1>
          <p>
            Access scholarships, mentor contacts, university information, and
            practical skill resources stored in the platform database.
          </p>
          <div className="auth-benefits">
            <span>
              <Check /> Searchable scholarship information
            </span>
            <span>
              <Check /> University and mentor directories
            </span>
            <span>
              <Check /> Direct links to learning resources
            </span>
          </div>
        </div>
      </section>
      <section className="auth-panel auth-form-panel">
        <div className="auth-form-wrap">
          <Link className="auth-back-link" to="/">
            <ArrowLeft size={16} /> Back to home
          </Link>
          <div className="mobile-auth-brand">
            <Brand />
          </div>
          <div className="auth-heading">
            <span>Welcome back</span>
            <h2>Sign in to Career Compass</h2>
            <p>Open your education and career resource workspace.</p>
          </div>
          <form onSubmit={submit} className="auth-form">
            {error && <div className="form-error">{error}</div>}
            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              Password
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </label>
            <button
              className="button button-primary button-lg button-block"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign in <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
          <p className="auth-switch">
            New to Career Compass?{" "}
            <Link to="/register" state={location.state}>
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
