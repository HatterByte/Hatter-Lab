import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProblemDesc from "../problemDesc";
import loadingIcon from "../../assets/Dual-Ball.svg";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProblemPage = () => {
  const { id } = useParams();
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
    <div className="flex-grow flex justify-center items-center p-5">
      <ProblemDesc
        title={problem.title}
        url={problem.url}
        description={problem.description}
        type={problem.type || "Unknown"}
      />
    </div>
  );
};

export default ProblemPage;
