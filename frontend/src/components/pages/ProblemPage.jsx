import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProblemDesc from "../problemDesc";
import loadingIcon from "../../assets/Dual-Ball.svg";

import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProblemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${backendUrl}/problem/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch problem");
        return res.json();
      })
      .then((data) => {
        setProblem(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center mt-10">
        <img src={loadingIcon} alt="Loading..." className="w-30 h-30" />
      </div>
    );
  if (!problem)
    return <p className="text-center text-red-500">Problem not found</p>;

  return (
    <div className="flex-grow flex flex-col items-center p-5">
      <div className="flex flex-col items-center w-full max-w-3xl">
        <ProblemDesc
          title={problem.title}
          url={problem.url}
          description={problem.description}
          type={problem.type || "Unknown"}
        />
        <div className="flex justify-start w-full mt-4">
          <button
            className="px-4 py-2 bg-[#7C70E0] hover:bg-[#6154C8] rounded text-gray-100 transition"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
