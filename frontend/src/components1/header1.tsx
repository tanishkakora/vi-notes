import './header1.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onSave: () => void;
  isSaved: boolean;
  title: string;   // NEW
};

export default function Header1({ onSave, isSaved ,title}: Props) {
  return (
    <div className="header">
      <div className="header-left">
        <h3>Vi-Notes</h3>
        <h2>{title || "Untitled"}</h2>
      </div>

      <div className="header-right">
        <div className={`badge ${isSaved ? "saved" : "unsaved"}`}>
          {isSaved ? "saved" : "unsaved"}
        </div>
        <div className="badge monitoring">monitoring</div>


        <button className="btn primary" onClick={onSave}>  {/* NEW */}
          <FontAwesomeIcon icon={faSave} /> Save note
        </button>
      </div>
    </div>
  );
}