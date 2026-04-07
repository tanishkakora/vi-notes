import "./notes-list.css";
type Note = {
  _id: string;
  title: string;
  text: string;
  wpm: number;
  corrections: number;
  confidence: number;
  pasteCount: number;
  savedAt: string;
};

type Props = {
  notes: Note[];
  onDelete: (id: string) => void;
};
export default function NotesList({ notes, onDelete }: Props) {
  if (notes.length === 0) {
    return <p className="no-notes">No saved notes yet.</p>;
  }

  return (
    <div className="notes-list">
      <div className="notes-header">
        <h3>My notes</h3>
        <span>{notes.length} sessions</span>
      </div>

      {notes.map((note) => {
        let badgeClass = "confidence-red";
        if (note.confidence >= 80) badgeClass = "confidence-green";
        else if (note.confidence >= 60) badgeClass = "confidence-yellow";

        return (
          <div key={note._id} className="note-item">
            <div className="note-info">
              <p className="note-title">
                {note.title || note.text.slice(0, 25) + ".txt"}
              </p>

              <p className="note-meta">
                {new Date(note.savedAt).toLocaleDateString()} ·{" "}
                {note.text.trim().split(/\s+/).length} words ·{" "}
                {Math.floor(note.wpm / 12)}m
              </p>
            </div>

            <div className="note-actions">
              <span className={`confidence-badge ${badgeClass}`}>
                {note.confidence}% human
              </span>

              <button
                className="btn"
                onClick={() => onDelete(note._id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

