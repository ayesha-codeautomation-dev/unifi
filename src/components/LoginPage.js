import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser, fetchSites } from "../features/unifiSlice";

const LoginPage = () => {
  const [controllerUrl, setControllerUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, sites } = useSelector((state) => state.unifi);

  const handleLogin = async () => {
    await dispatch(authenticateUser({ controllerUrl, username, password }));
    dispatch(fetchSites()); // Call fetchSites after login
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-header">Login to Your Network</h2>
        <input
          type="text"
          placeholder="UniFi URL"
          value={controllerUrl}
          onChange={(e) => setControllerUrl(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button  className="login-button" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="error-message">{error}</p>}
        {sites.length > 0 && (
          <select className="select">
            {sites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
