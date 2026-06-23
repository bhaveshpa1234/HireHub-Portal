import { useEffect, useState } from "react";

import api, { getApiError } from "../api";
import CollegeSidebar from "./Collegesidebar";

const CollegeDashboard = () => {
  const [state, setState] = useState({
    jobs: [],
    applications: [],
    students: [],
    error: "",
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [jobsResponse, applicationsResponse, studentsResponse] = await Promise.all([
          api.get("/jobs"),
          api.get("/applications/received"),
          api.get("/users?role=student"),
        ]);
        setState({
          jobs: jobsResponse.data,
          applications: applicationsResponse.data,
          students: studentsResponse.data,
          error: "",
        });
      } catch (requestError) {
        setState((current) => ({
          ...current,
          error: getApiError(requestError, "Unable to load admin dashboard."),
        }));
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="college-container">
      <CollegeSidebar />
      <main className="college-main-content">
        <div className="dashboard-header">
          <h1>College Dashboard</h1>
        </div>
        {state.error && <p className="resume-message error">{state.error}</p>}
        <div className="dashboard-body">
          <div className="report-cards">
            <div className="report-card">
              <div className="report-info">
                <h3>Total Jobs</h3>
                <p>{state.jobs.length}</p>
              </div>
            </div>
            <div className="report-card">
              <div className="report-info">
                <h3>Pending Approvals</h3>
                <p>{state.jobs.filter((job) => job.status === "pending").length}</p>
              </div>
            </div>
            <div className="report-card">
              <div className="report-info">
                <h3>Applications</h3>
                <p>{state.applications.length}</p>
              </div>
            </div>
            <div className="report-card">
              <div className="report-info">
                <h3>Students</h3>
                <p>{state.students.length}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollegeDashboard;
