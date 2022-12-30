import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const LayoutDefault = ({ children }) => {
  return (
    <div className="h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default LayoutDefault;
