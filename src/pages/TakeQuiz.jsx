import { useParams } from "react-router-dom";
import { useState } from "react";

const TakeQuiz = () => {
  const { id } = useParams();
  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
  const quiz = quizzes[id];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => setSubmitted(true);

  if (!quiz)
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">Quiz not found!</div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>

      {quiz.questions.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="font-semibold">{q.text}</p>
          {q.type === "text" && (
            <input
              type="text"
              className="border rounded px-3 py-2 w-full"
              onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
            />
          )}
          {q.type === "boolean" && (
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name={i}
                  value="True"
                  onChange={(e) =>
                    setAnswers({ ...answers, [i]: e.target.value })
                  }
                />{" "}
                True
              </label>
              <label>
                <input
                  type="radio"
                  name={i}
                  value="False"
                  onChange={(e) =>
                    setAnswers({ ...answers, [i]: e.target.value })
                  }
                />{" "}
                False
              </label>
            </div>
          )}
          {q.type === "mcq" && (
            <div className="flex flex-col">
              {q.options.map((opt, j) => (
                <label key={j}>
                  <input
                    type="radio"
                    name={i}
                    value={opt}
                    onChange={(e) =>
                      setAnswers({ ...answers, [i]: e.target.value })
                    }
                  />{" "}
                  {opt}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      ) : (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold">Quiz Submitted!</h3>
          <pre className="text-left bg-gray-100 p-3 mt-2 rounded">
            {JSON.stringify(answers, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TakeQuiz;
