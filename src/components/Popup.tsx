import React from "react";
import "../styles/Popup.css";

interface Props {
  setShowPopup: CallableFunction;
  question: string;
  onAccept(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  yesBtn?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  noBtn?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  btn?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}

function Popup({
  setShowPopup,
  question,
  noBtn,
  yesBtn,
  btn,
  onAccept,
}: Props) {
  const closePopup = () => {
    setShowPopup(false);
  };

  const handleAccept = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShowPopup(false);
    onAccept(e);
  };

  return (
    <main
      className="popup"
      onClick={e =>
        (e.target as HTMLElement)?.classList.contains("popup") && closePopup()
      }
    >
      <div className="popup-container">
        <p>{question}</p>
        <div className="sep"></div>
        <footer>
          {btn ? (
            <button onClick={handleAccept} {...btn}>
              {btn.value}
            </button>
          ) : (
            <>
              <button onClick={onAccept} {...yesBtn}>
                {yesBtn?.value}
              </button>
              <button {...noBtn} onClick={closePopup}>
                {noBtn?.value}
              </button>
            </>
          )}
        </footer>
      </div>
    </main>
  );
}

export default Popup;
