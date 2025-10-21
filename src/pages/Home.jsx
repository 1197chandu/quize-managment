import { Link } from "react-router-dom";

const Home = () => {
  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md mt-10 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Quizzes</h2>

      {quizzes.length === 0 ? (
        <p className="text-gray-500 text-center">No quizzes available.</p>
      ) : (
        quizzes.map((q, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b py-2"
          >
            <h3 className="text-lg">{q.title}</h3>
            <Link to={`/quiz/${i}`}>
              <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                Take Quiz
              </button>
            </Link>
          </div>
        ))
      )}

      <div className="text-center mt-6">
        <Link to="/admin">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Go to Admin Panel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
