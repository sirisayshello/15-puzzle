const Tile = ({ number }) => {
  return (
    <div className="flex justify-center items-center bg-red-400">
      <p>{number}</p>
    </div>
  );
};

const EmptyTile = () => {
  return <div className="bg-none"></div>;
};

export { Tile, EmptyTile };
