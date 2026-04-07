import "./stats.css";
type Props = {
  wordCount: number;
  time: number;
};

function Stats({ wordCount, time }: Props) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="stats">
      <div className="stat-box">
        <p>Words</p>
        <h3>{wordCount}</h3>
      </div>

      <div className="stat-box">
        <p>Session Time</p>
        <h3>
          {minutes}m {seconds}s
        </h3>
      </div>
    </div>
  );
}

export default Stats;