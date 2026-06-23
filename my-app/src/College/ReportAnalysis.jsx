import { useEffect, useState } from "react";

import api, { getApiError } from "../api";
import CollegeSidebar from "./Collegesidebar";

const ReportAnalysis = () => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReport = async () => {
      try {
        const [jobsResponse, applicationsResponse, feedbackResponse] = await Promise.all([
          api.get("/jobs"),
          api.get("/applications/received"),
          api.get("/communications/feedback"),
        ]);
        const jobs = jobsResponse.data;
        const applications = applicationsResponse.data;
        const feedback = feedbackResponse.data;
        setReport({
          approvedJobs: jobs.filter((job) => job.status === "approved").length,
          pendingJobs: jobs.filter((job) => job.status === "pending").length,
          totalApplications: applications.length,
          shortlisted: applications.filter((item) => item.status === "shortlisted").length,
          feedbackCount: feedback.length,
        });
      } catch (requestError) {
        setError(getApiError(requestError, "Unable to load report data."));
      }
    };

    loadReport();
  }, []);

  return (
    <div className="dashboard-container">
      <CollegeSidebar />
      <main className="main-content">
        <div className="report-analysis">
          <h2>Report Analysis</h2>
          <p>Monitor approvals, applications, and platform activity from one place.</p>
          {error && <p className="resume-message error">{error}</p>}
          {report && (
            <div className="report-cards">
              <div className="report-card">
                <div className="report-info">
                  <h3>Approved Jobs</h3>
                  <p>Total approved internships: {report.approvedJobs}</p>
                  <span className="status completed">Completed</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${Math.min(report.approvedJobs * 10, 100)}%` }} />
                </div>
              </div>

              <div className="report-card">
                <div className="report-info">
                  <h3>Pending Jobs</h3>
                  <p>Pending approvals: {report.pendingJobs}</p>
                  <span className="status pending">Pending</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${Math.min(report.pendingJobs * 10, 100)}%` }} />
                </div>
              </div>

              <div className="report-card">
                <div className="report-info">
                  <h3>Applications</h3>
                  <p>Total submitted applications: {report.totalApplications}</p>
                  <span className="status completed">Completed</span>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${Math.min(report.totalApplications * 10, 100)}%` }}
                  />
                </div>
              </div>

              <div className="report-card">
                <div className="report-info">
                  <h3>Shortlisted</h3>
                  <p>Total shortlisted candidates: {report.shortlisted}</p>
                  <span className="status in-progress">In Progress</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${Math.min(report.shortlisted * 10, 100)}%` }} />
                </div>
              </div>

              <div className="report-card">
                <div className="report-info">
                  <h3>Feedback Entries</h3>
                  <p>Total feedback records: {report.feedbackCount}</p>
                  <span className="status completed">Completed</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${Math.min(report.feedbackCount * 10, 100)}%` }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReportAnalysis;
