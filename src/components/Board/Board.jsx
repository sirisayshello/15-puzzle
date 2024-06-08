import { useState } from "react";
import { ShuffleButton } from "../Button/ShuffleButton";
import { EmptyTile, Tile } from "../Tile/Tile";
import { useEffect } from "react";

const columns = 2; // Add to config instead
const rows = 2; // Add to config instead
const numberOfTiles = columns * rows;
let tileNumber = 1;
const baseEmptyTile = { number: numberOfTiles };

export const Board = () => {
  const [boardTiles, setBoardTiles] = useState([]);

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
    setBoardTiles([...array]);
  };

  const fillBoard = () => {
    const tiles = [baseEmptyTile];

    for (let i = 1; i < numberOfTiles; i++) {
      let tile = { number: tileNumber++ };
      tiles.push(tile);
    }
    shuffle(tiles);
    setBoardTiles(tiles);
  };

  const getEmptyTileIndex = () =>
    boardTiles.findIndex((tile) => tile.number === numberOfTiles);

  const getPositionOfTile = (index) => {
    // Get tile's position and thereby which row and column it's in
    const tilePosition = index / columns;
    const row = Math.floor(tilePosition);
    const column = Math.round((tilePosition - row) * 1000) / 1000;
    return { row, column, index };
  };

  const checkWin = (tiles) => {
    const hasWon = tiles.every((tile, index) => {
      console.log(tile.number === index + 1);
      return tile.number === index + 1;
    });
    if (hasWon) {
      setTimeout(() => window.alert("WINNER"), 0);
    }
  };

  const move = (clickedIndex) => {
    const emptyTile = getPositionOfTile(getEmptyTileIndex());
    const clickedTile = getPositionOfTile(clickedIndex);

    // check if tile is in same row or column as empty tile
    if (
      clickedTile.row === emptyTile.row ||
      clickedTile.column === emptyTile.column
    ) {
      // Move by updating the array
      const updatedTiles = [...boardTiles];

      if (clickedTile.row === emptyTile.row) {
        // Move tiles in the same row
        if (clickedIndex > emptyTile.index) {
          for (let i = emptyTile.index; i < clickedIndex; i++) {
            updatedTiles[i] = updatedTiles[i + 1];
          }
        } else {
          for (let i = emptyTile.index; i > clickedIndex; i--) {
            updatedTiles[i] = updatedTiles[i - 1];
          }
        }
      } else {
        // Move tiles in the same column
        if (clickedIndex > emptyTile.index) {
          for (let i = emptyTile.index; i < clickedIndex; i += columns) {
            updatedTiles[i] = updatedTiles[i + columns];
          }
        } else {
          for (let i = emptyTile.index; i > clickedIndex; i -= columns) {
            updatedTiles[i] = updatedTiles[i - columns];
          }
        }
      }

      // Empty tile will be put where you clicked
      updatedTiles[clickedIndex] = baseEmptyTile;
      setBoardTiles(updatedTiles);
      // Check if win
      checkWin(updatedTiles);
    }
  };

  // Set up the board on start
  useEffect(() => {
    fillBoard();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="bg-board-orange dark:bg-dark-orange p-2 rounded-md">
        <div
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
          className={` bg-board-orange dark:bg-dark-orange h-80 w-80 grid gap-1 p-1 border-2 border-tile-pink rounded-md`}
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
      <ShuffleButton shuffle={() => shuffle(boardTiles)} />
    </div>
  );
};
