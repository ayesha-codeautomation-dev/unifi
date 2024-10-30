import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSites } from "../features/unifiSlice";

const SitesDropdown = () => {
  const dispatch = useDispatch();
  const sites = useSelector((state) => state.unifi.sites);
  const session = useSelector((state) => state.unifi.session);

  useEffect(() => {
    if (session) {
      dispatch(fetchSites("https://unifi.netviva.co.uk:8443"));
    }
  }, [session, dispatch]);

  return (
    <div>
      <h2>Sites</h2>
      <select>
        {sites.map((site) => (
          <option key={site.id} value={site.id}>
            {site.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SitesDropdown;
