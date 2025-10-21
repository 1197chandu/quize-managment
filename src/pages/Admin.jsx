import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [type, setType] = useState("text");
  const [options, setOptions] = useState("");

  const addQuestion = () => {
    const newQ = {
      text: questionText,
      type,
      options: options ? options.split(",") : [],
    };
    setQuestions([...questions, newQ]);
    setQuestionText("");
    setOptions("");
  };

  const saveQuiz = () => {
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    quizzes.push({ title, questions });
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    alert("Quiz saved!");
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Quiz</h2>

      <input
        type="text"
        placeholder="Quiz title"
        className="w-full border rounded px-3 py-2 mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Question text"
          className="flex-1 border rounded px-3 py-2"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded px-2"
        >
          <option value="text">Text</option>
          <option value="mcq">MCQ</option>
          <option value="boolean">True/False</option>
        </select>
      </div>

      {type === "mcq" && (
        <input
          type="text"
          placeholder="Comma-separated options"
          className="w-full border rounded px-3 py-2 mb-3"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
        />
      )}

      <button
        onClick={addQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Question
      </button>

      <ul className="mt-4 list-disc pl-5">
        {questions.map((q, i) => (
          <li key={i}>
            {q.text} ({q.type})
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-6">
        <button
          onClick={saveQuiz}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Quiz
        </button>
        <button
          onClick={logout}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Admin;
