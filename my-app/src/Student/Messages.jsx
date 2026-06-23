import { useState } from "react";
import Sidebar from "./Sidebar";

const Messages = () => {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [chat, setChat] = useState([]);

  const questions = [
    {
      q: "How do I apply for internships?",
      a: "Go to 'Available Internships' section, select a job and click on Apply.",
    },
    {
      q: "How can I upload my resume?",
      a: "Go to 'Upload Resume' section and upload your latest resume.",
    },
    {
      q: "How to check application status?",
      a: "Go to 'Applications' section to track your application status.",
    },
    {
      q: "Can I edit my profile?",
      a: "Yes, go to Profile section and update your details.",
    },
    {
      q: "What is the selection process?",
      a: "It usually includes resume screening, interview, and final selection.",
    },
    {
      q: "How will I know if I am shortlisted?",
      a: "You will get notification in Applications section.",
    },
    {
      q: "Can I apply to multiple internships?",
      a: "Yes, you can apply to multiple internships.",
    },
    {
      q: "Is resume mandatory?",
      a: "Yes, resume is required for applying.",
    },
    {
      q: "How to contact recruiter?",
      a: "Use the message section or provided contact details.",
    },
    {
      q: "What skills are required?",
      a: "It depends on internship role like React, Java, Python etc.",
    },
    {
      q: "Can I withdraw application?",
      a: "Currently withdrawal feature is not available.",
    },
    {
      q: "Is there any fee?",
      a: "No, applying for internships is completely free.",
    },
  ];

  const handleSelect = (e) => {
    const value = e.target.value;
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
    <>
      <Sidebar />

      <div className="messages-container">
        <h2 className="title">Help & Support</h2>

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
          {chat.length === 0 && (
            <p className="no-messages">Select a question to get answer.</p>
          )}

          {chat.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.type === "question" ? "user" : "bot"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Messages;
