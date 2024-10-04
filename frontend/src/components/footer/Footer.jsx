import "./footer.css";
import FooterInfo from "./FooterInfo";
import FooterInfoIcons from "./FooterInfoIcons";

const Footer = () => {
  return (
    <footer className="footer mt-5">
      <FooterInfoIcons />
      <FooterInfo />
      <div className="text-center py-3 px-0 mx-0 footer-end d-flex justify-content-center align-items-center">
        <p className="fw-semibold">&copy; 2024 Emart. All rights reserved. </p>
      </div>
    </footer>
  );
};

export default Footer;
