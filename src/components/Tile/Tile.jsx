const Tile = ({ number, move }) => {
  return (
    <div
      className="flex justify-center items-center text-3xl bg-tile-pink dark:bg-dark-pink rounded hover:cursor-pointer"
      onClick={move}
    >
      <p>{number}</p>
    </div>
  );
};

const EmptyTile = () => {
  return <div className="bg-none"></div>;
};

export { Tile, EmptyTile };
