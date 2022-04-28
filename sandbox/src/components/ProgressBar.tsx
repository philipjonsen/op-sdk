
const ProgressBar = ({ currentDebt, maxDebt }: any) => {
  const percentage = Math.min((currentDebt / maxDebt) * 100, 100);
  const color =
    percentage && percentage > 99.9
      ? '#FF6767'
      : percentage > 90
      ? '#EAD9B8'
      : '#FFFFFF';
  return (
    <div className="prog-bar">
      <div
        style={{ backgroundColor: color, width: `${percentage}%` }}
        className="prog-bar-inner"
      />
    </div>
  );
};

export default ProgressBar;
