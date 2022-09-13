import { useNavigate } from "react-router-dom";

const Custom404 = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-32 text-center">
      <div className="text-48 font-semibold">404 - Page Not Found</div>
      <div
        className="mt-5 text-20 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Back to Home →
      </div>
    </div>
  );
};

export default Custom404;
