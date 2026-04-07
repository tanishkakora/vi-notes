type StatProps = {
  stat: string;
  value: string | number;
};

function Stat({ stat, value }: StatProps) {
  return (
    <div className="stat">
      <p>{stat}</p>
      <h3>{value}</h3>
    </div>
  );
}

export default Stat;