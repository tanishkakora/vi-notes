import Notes from "../components2/notes";
import "./saved-notes.css";

function SavedNotes() {
  return (
    <div className="saved-notes">
      <div className="header-row">
        <h3>My notes</h3>
        <span className="session-count">3 sessions</span>
      </div>

      <Notes />
      <Notes />
      <Notes />
    </div>
  );
}

export default SavedNotes;