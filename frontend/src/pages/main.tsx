import { useEffect, useState } from "react";
import Header1 from "../components1/header1";
import Editor from "../components1/editor";
import Stats from "../components1/stats";
import Footer1 from "../components1/footer1";
import "./main.css";
import NotesList from "../components1/NotesList";


function Main() {
  const [text, setText] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const [corrections, setCorrections] = useState(0);
  const [prevText, setPrevText] = useState("");
  const [lastKeyTime, setLastKeyTime] = useState<number | null>(null);
  const [intervals, setIntervals] = useState<number[]>([]);
  const [pasteCount, setPasteCount] = useState(0);
  const [pasteAlert, setPasteAlert] = useState(false);
  const [savedNotes, setSavedNotes] = useState<{
    _id: string;
    text: string;
    title: string;
    wpm: number;
    corrections: number;
    confidence: number;
    pasteCount: number;
    savedAt: string;
  }[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [title, setTitle] = useState("");

  const BASE_URL = "https://vi-notes-2-h84r.onrender.com";

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const minutes = time / 60;
  const wpm = time > 5 && minutes > 0 ? Math.round(wordCount / minutes) : 0;

 
  const handleChange = (value: string) => {
    const now = Date.now();

    setIsSaved(false); 

    if (lastKeyTime) {
      const diff = now - lastKeyTime;
      setIntervals((prev) => [...prev.slice(-50), diff]);
    }

    setLastKeyTime(now);

    if (value.length < prevText.length) {
      setCorrections((prev) => prev + 1);
    }

    if (!startTime && value) {
      setStartTime(now);
    }

    setPrevText(value);
    setText(value);
  };

  const handlePaste = () => {
    setPasteCount((prev) => prev + 1);
    setPasteAlert(true);
    setTimeout(() => setPasteAlert(false), 3000);
  };

  const handleSave = async () => {
    if (!text.trim()) return;
    console.log("Saving note:", { title, text, wpm, corrections, confidence, pasteCount });

    const res = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title || "Untitled",
        text,
        wpm,
        corrections,
        confidence,
        pasteCount,
      }),
    });

    const saved = await res.json();
    setSavedNotes((prev) => [saved, ...prev]);
    setIsSaved(true);

    
    setTitle("");
    setText("");
  };

  const avgInterval =
    intervals.length > 0
      ? intervals.reduce((a, b) => a + b, 0) / intervals.length
      : 0;

  const variance =
    intervals.length > 0
      ? intervals.reduce((sum, val) => sum + Math.pow(val - avgInterval, 2), 0) / intervals.length
      : 0;

  const consistencyScore = variance > 0 ? Math.min(100, variance / 5000) : 0;

  let wpmScore = 0;
  if (wpm >= 10 && wpm <= 40) wpmScore = 100;
  else if (wpm > 40 && wpm <= 80) wpmScore = 55;
  else if (wpm > 80) wpmScore = 10;
  else wpmScore = 40;

  let correctionScore = 0;
  if (corrections === 0) correctionScore = 50;
  else if (corrections < 5) correctionScore = 80;
  else if (corrections < 20) correctionScore = 100;
  else correctionScore = 70;

  const pastePenalty = Math.min(pasteCount * 15, 45);

  const confidenceRaw =
    0.4 * wpmScore +
    0.3 * correctionScore +
    0.3 * (100 - consistencyScore) -
    pastePenalty;

  const confidence = Math.max(0, Math.min(100, Math.round(confidenceRaw)));

  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      setTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
  fetch(`${BASE_URL}/notes`)
    .then((r) => r.json())
    .then(setSavedNotes);
}, []);

  const handleDelete = async (id: string) => {
  await fetch(`${BASE_URL}/notes/${id}`, { method: "DELETE" });
  setSavedNotes((prev) => prev.filter((n) => n._id !== id));
};

  return (
    <div className="app">
      <div className="main-card">
        <Header1
          onSave={handleSave}
          isSaved={isSaved}
          title={title || text.slice(0, 20)}
        />

        {pasteAlert && (
          <div className="paste-alert">
            Paste detected — this will affect your authenticity score
          </div>
        )}

        <div className="content">
          <div style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Enter note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="title-input"
            />

            <Editor text={text} setText={handleChange} onPaste={handlePaste} />
          </div>

          <Stats wordCount={wordCount} time={time} />
        </div>

        <Footer1
          wpm={wpm}
          corrections={corrections}
          confidence={confidence}
          pasteCount={pasteCount}
        />
      </div>

      <NotesList notes={savedNotes} onDelete={handleDelete} />
    </div>
  );
}

export default Main;
