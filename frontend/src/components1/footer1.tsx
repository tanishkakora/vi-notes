import './footer1.css';
type Props = {
  wpm: number;
  corrections: number;
  confidence: number;
  pasteCount: number;
};

function Footer1({ wpm, corrections, confidence, pasteCount }: Props) {

  const confidenceColor =
    confidence >= 80 ? "#1D9E75" :
    confidence >= 60 ? "#EF9F27" :
    "#E24B4A";
  return (
    <div className="footer">
      <div className="stat">
        <p>WPM</p>
        <p>{wpm}</p>
      </div>

      <div className="stat">
        <p>Corrections</p>
        <p>{corrections}</p>
      </div>

      <div className="stat">
        <p>Confidence</p>
        <p style={{ color: confidenceColor }}>{confidence}%</p>
      </div>

      <div className="stat">  {/* NEW */}
        <p>Pastes</p>
        <p style={{ color: pasteCount > 0 ? "#E24B4A" : "#1D9E75" }}>
          {pasteCount}
        </p>
      </div>
    </div>
  );
}

export default Footer1;