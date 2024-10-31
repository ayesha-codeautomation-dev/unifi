import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSites } from "../features/unifiSlice";
import '../css/LoginPage.css';

const SitesDropdown = () => {
  const dispatch = useDispatch();
  const sites = useSelector((state) => state.unifi.sites);
  const session = useSelector((state) => state.unifi.session);
  const controllerUrl = useSelector((state) => state.unifi.controllerUrl); // Get controllerUrl from Redux

  useEffect(() => {
    if (session && controllerUrl) {
      dispatch(fetchSites());
    }
  }, [session, controllerUrl, dispatch]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-header">Sites</h2>
        <select className="select">
          {sites.map((site) => (
            <option key={site.id} value={site.id}>
              {site.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SitesDropdown;
