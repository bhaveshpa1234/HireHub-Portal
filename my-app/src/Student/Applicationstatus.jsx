import { useEffect, useState } from "react";

import api, { getApiError } from "../api";
import Sidebar from "./Sidebar";

const ApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const { data } = await api.get("/applications/mine");
        setApplications(data);
      } catch (requestError) {
        setError(getApiError(requestError, "Unable to load applications."));
      }
    };

    loadApplications();
  }, []);

  const getBadge = (status) => {
    if (status === "pending") return "badge pending";
    if (status === "shortlisted") return "badge success";
    if (status === "rejected") return "badge danger";
    return "badge";
  };

  const filteredApps = applications
    .filter((app) => (filter === "All" ? true : app.status === filter.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === "company") return a.company_name.localeCompare(b.company_name);
      return 0;
    });

  return (
    <>
      <Sidebar />

      <div className="app-container">
        <h2 className="title">My Applications</h2>

        <div className="controls">
          <div>
            <label>Filter</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option>All</option>
              <option>pending</option>
              <option>shortlisted</option>
              <option>rejected</option>
            </select>
          </div>

          <div>
            <label>Sort</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Applied Date</option>
              <option value="company">Company</option>
            </select>
          </div>
        </div>

        {error && <p className="resume-message error">{error}</p>}

        {filteredApps.length === 0 ? (
          <p className="no-data">No applications found.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredApps.map((app) => (
                  <tr key={app.id}>
                    <td>{app.company_name}</td>
                    <td>{app.job_title}</td>
                    <td>{new Date(app.created_at).toLocaleDateString()}</td>
                    <td>
                      <span className={getBadge(app.status)}>{app.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicationStatus;
