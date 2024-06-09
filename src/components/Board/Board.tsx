import { Button } from "../Button/Button";
import { EmptyTile, Tile } from "../Tile/Tile";
import { useEffect } from "react";
import { SolvedModal } from "../SolvedModal/SolvedModal";
import { useTiles } from "../../hooks/useTiles";
import { config } from "../../config";

const { rows, columns } = config;
const numberOfTiles = rows * columns;

export const Board = () => {
  const { boardTiles, shuffle, fillBoard, move, modal } = useTiles();
  const maxWidth = columns < 11 ? "max-w-md" : "";

  useEffect(() => {
    fillBoard();
  }, []);

  return (
    <>
      <SolvedModal ref={modal} close={() => modal.current?.close()} />

      <div className="flex flex-col items-center gap-8">
        <div
          className={`w-full ${maxWidth} bg-board-orange dark:bg-dark-orange p-2 rounded-md `}
        >
          <div
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            }}
            className={` bg-board-orange dark:bg-dark-orange grid gap-1 p-1 border-2 border-tile-pink rounded-md`}
          >
            {boardTiles.map((tile, index) => {
              if (tile.number === numberOfTiles) {
                return <EmptyTile key={tile.number} />;
              }
              return (
                <Tile
                  key={tile.number}
                  number={tile.number}
                  move={() => move(index)}
                />
              );
            })}
          </div>
        </div>
        <Button onClick={() => shuffle(boardTiles)}>{"SLUMPA"}</Button>
      </div>
    </>
  );
};
