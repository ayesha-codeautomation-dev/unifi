import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser, fetchSites } from "../features/unifiSlice";
import '../css/LoginPage.css';

const LoginPage = () => {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { session, sites, loading, error } = useSelector((state) => state.unifi);

  const handleLogin = async () => {
    await dispatch(authenticateUser({ controllerUrl: url, username, password }));
    if (!error) {
      dispatch(fetchSites());
    }
  };

  return (
    <div className="login-container">
    <div className="login-card">
      <h2 className="login-header">Login to Your Network</h2>
  
      <label className="label">UniFi URL</label>
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="input-field"
      />
  
      <label className="label">UniFi Username</label>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
  
      <label className="label">UniFi Password</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
  
      <button
        onClick={handleLogin}
        disabled={loading}
        className="login-button"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
  
      {error && <p className="error-message">{error}</p>}
    </div>
  
    {session && (
      <div className="sites-container">
        <label className="label">Sites</label>
        <select className="dropdown">
          <option>Available Sites</option>
          {sites.map((site, index) => (
            <option key={index} value={site.id}>
              {site.name}
            </option>
          ))}
        </select>
      </div>
    )}
  </div>
  
  );
};

export default LoginPage;
