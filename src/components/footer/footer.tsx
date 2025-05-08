import React, {useState, useEffect, useRef} from "react";
import "./Footer.scss";

const Footer: React.FC = () => {
  const [showImprint, setShowImprint] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const imprintRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        imprintRef.current &&
        !imprintRef.current.contains(event.target as Node)
      ) {
        setShowImprint(false);
      }
      if (
        contactRef.current &&
        !contactRef.current.contains(event.target as Node)
      ) {
        setShowContact(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3
            className="footer__title"
            onClick={() => setShowImprint(!showImprint)}>
            Imprint
          </h3>
        </div>
        <div className="footer__section">
          <h3
            className="footer__title"
            onClick={() => setShowContact(!showContact)}>
            Contact
          </h3>
        </div>
      </div>

      {showImprint && (
        <div className="popup">
          <div className="popup__content" ref={imprintRef}>
            <h3>Imprint</h3>
            <p>Sinan Demir</p>
            <p>Am Südhang 18</p>
            <p>53844 Troisdorf</p>
          </div>
        </div>
      )}

      {showContact && (
        <div className="popup">
          <div className="popup__content" ref={contactRef}>
            <h3>Contact</h3>
            <p>
              E-Mail:{" "}
              <a href="mailto:info@developerdemir.com">
                info@developerdemir.com
              </a>
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
