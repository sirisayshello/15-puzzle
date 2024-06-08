type TileProps = {
  number: number;
  move: () => void;
};

const Tile = ({ number, move }: TileProps) => {
  return (
    <div
      className="flex justify-center items-center text-[clamp(1.3rem,3vw,2.5rem)] aspect-square bg-tile-pink dark:bg-dark-pink rounded hover:cursor-pointer"
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
