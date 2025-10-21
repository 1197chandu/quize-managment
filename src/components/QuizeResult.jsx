const QuizResult = ({ quiz, answers }) => {
  // Calculate score
  const score = quiz.questions.reduce((acc, q, i) => {
    if (
      String(answers[i]).trim().toLowerCase() ===
      String(q.answer).trim().toLowerCase()
    ) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div className="mt-6 text-center">
      <h3 className="text-xl font-semibold mb-2">Quiz Completed!</h3>
      <p className="text-lg font-medium text-green-600">
        Your Score: {score} / {quiz.questions.length}
      </p>

      <div className="mt-6 text-left bg-gray-50 p-4 rounded">
        <h4 className="font-semibold mb-2">Answers Review:</h4>
        {quiz.questions.map((q, i) => (
          <div key={i} className="mb-3">
            <p className="font-medium">{q.text}</p>
            <p className="text-sm">
              ✅ Correct Answer:{" "}
              <span className="text-green-600">{q.answer}</span>
            </p>
            <p className="text-sm">
              🧠 Your Answer:{" "}
              <span
                className={
                  String(answers[i]).trim().toLowerCase() ===
                  String(q.answer).trim().toLowerCase()
                    ? "text-green-600"
                    : "text-red-500"
                }
              >
                {answers[i] || "Not answered"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizResult;
