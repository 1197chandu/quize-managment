import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [type, setType] = useState("text");
  const [options, setOptions] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const addQuestion = () => {
    if (!questionText || !correctAnswer) {
      alert("Please enter both question text and correct answer.");
      return;
    }

    if (type === "mcq") {
      const opts = options.split(",").map((opt) => opt.trim());
      if (!opts.includes(correctAnswer)) {
        alert("Correct answer must match one of the options!");
        return;
      }
    }

    const newQ = {
      text: questionText,
      type,
      options: type === "mcq" ? options.split(",").map((o) => o.trim()) : [],
      answer: correctAnswer,
    };

    setQuestions([...questions, newQ]);
    setQuestionText("");
    setOptions("");
    setCorrectAnswer("");
  };

  const saveQuiz = () => {
    if (!title) {
      alert("Please enter a quiz title.");
      return;
    }
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
      <h2 className="text-2xl font-bold mb-4 text-center">Create Quiz</h2>

      <input
        type="text"
        placeholder="Quiz title"
        className="w-full border rounded px-3 py-2 mb-4"
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

      {type === "text" && (
        <input
          type="text"
          placeholder="Correct Answer"
          className="w-full border rounded px-3 py-2 mb-3"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
      )}

      {type === "boolean" && (
        <select
          className="w-full border rounded px-3 py-2 mb-3"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        >
          <option value="">Select Correct Answer</option>
          <option value="True">True</option>
          <option value="False">False</option>
        </select>
      )}

      {type === "mcq" && (
        <input
          type="text"
          placeholder="Correct Answer (must match one option)"
          className="w-full border rounded px-3 py-2 mb-3"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
      )}

      <button
        onClick={addQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Question
      </button>

      {questions.length > 0 && (
        <ul className="mt-4 list-disc pl-5">
          {questions.map((q, i) => (
            <li key={i}>
              {q.text} ({q.type}) - Correct Answer:{" "}
              <span className="font-semibold">{q.answer}</span>
            </li>
          ))}
        </ul>
      )}

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
