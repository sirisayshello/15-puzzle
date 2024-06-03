import { useState } from "react";
import { ShuffleButton } from "../Button/ShuffleButton";
import { EmptyTile, Tile } from "../Tile/Tile";
import { useEffect } from "react";

let columns = 4;
let rows = 4;
let numberOfTiles = columns * rows;
let tileNumber = 1;

export const Board = () => {
  const [boardTiles, setBoardTiles] = useState([]);

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
    setBoardTiles([...array]);
  };

  const fillBoard = (tiles) => {
    for (let i = 1; i < numberOfTiles; i++) {
      let tile = { number: tileNumber++ };
      tiles.push(tile);
    }
    shuffle(tiles);
    setBoardTiles(tiles);
  };

  useEffect(() => {
    let emptyTile = { number: 0 };
    let tiles = [emptyTile];

    fillBoard(tiles);
  }, []);

  return (
    <>
      <div className="bg-red-200 h-80 w-80 grid grid-cols-4 grid-rows-4 gap-1 p-1">
        {boardTiles.map((tile) => {
          if (tile.number === 0) {
            return <EmptyTile key={tile.number} />;
          }
          return <Tile key={tile.number} number={tile.number} />;
        })}
      </div>
      <ShuffleButton shuffle={() => shuffle(boardTiles)} />
    </>
  );
};
