import { useState } from "react";

import CompanySidebar from "./CompanySidebar";

const Chat = () => {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [chat, setChat] = useState([]);

  const questions = [
    {
      q: "How can I post a new internship?",
      a: "Open the Post Internship page, fill the form, and submit it for admin approval.",
    },
    {
      q: "How do I view student resumes?",
      a: "Go to Student Resumes to view applicant profiles and uploaded resumes.",
    },
    {
      q: "How can I shortlist students?",
      a: "Use the Shortlist Students page and click the shortlist button on the student card.",
    },
    {
      q: "How do I send feedback?",
      a: "Open Feedback Status and add feedback for the selected application.",
    },
    {
      q: "Why is my internship not visible to students?",
      a: "Internships become visible only after admin approval.",
    },
  ];

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedQuestion(value);
    const selected = questions.find((item) => item.q === value);

    if (selected) {
      setChat((current) => [
        ...current,
        { type: "question", text: selected.q },
        { type: "answer", text: selected.a },
      ]);
    }
  };

  return (
    <div className="dashboard-container">
      <CompanySidebar />
      <main className="main-content">
        <h2>Messages</h2>

        <div className="dropdown-box">
          <select value={selectedQuestion} onChange={handleSelect}>
            <option value="">-- Select a Question --</option>
            {questions.map((item, index) => (
              <option key={index} value={item.q}>
                {item.q}
              </option>
            ))}
          </select>
        </div>

        <div className="chat-box">
          {chat.length === 0 && <p className="no-messages">Select a question to get answer.</p>}

          {chat.map((message, index) => (
            <div key={index} className={`message ${message.type === "question" ? "user" : "bot"}`}>
              {message.text}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Chat;
