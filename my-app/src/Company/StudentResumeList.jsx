import { useEffect, useState } from "react";

import api, { getApiError } from "../api";
import CompanySidebar from "./CompanySidebar";

const StudentResumeList = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const { data } = await api.get("/applications/received");
        setApplications(data);
      } catch (requestError) {
        setError(getApiError(requestError, "Unable to load student resumes."));
      }
    };

    loadApplications();
  }, []);

  console.log(applications);
  return (
    <div className="dashboard-container">
      <CompanySidebar />
      <main className="main-content">
        <div className="resume-list-container">
          <h2 className="dashboard-heading">Student Resume List</h2>
          {error && <p className="resume-message error">{error}</p>}
          <table className="resume-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>{application.student_name}</td>
                  <td>{application.student_email}</td>
                  <td>{application.job_title}</td>
                  <td>
                    {application.resume_url ? (
                      <a
                        className="btn-view"
                        href="#"
                        onClick={() => {
                          const url = `http://localhost:8000/${application.resume_url.replace("/company", "")}`;
                          console.log(url);
                          window.open(url, "_blank");
                        }}
                      >
                        View Resume
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default StudentResumeList;
