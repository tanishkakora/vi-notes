import './fstat.css';
type StatProps = {
  stat: string;
  value: number;
};
function Fstat({ stat, value }: StatProps) {
  return (
    <div className="stat">
      <p>{stat}</p>
      <p>{value}</p>
    </div>
  );
}

export default Fstat;