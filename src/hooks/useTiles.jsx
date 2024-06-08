import { useRef, useState } from "react";

export const columns = 2; // TODO Add to config instead
export const rows = 2; // TODO Add to config instead
export const numberOfTiles = columns * rows;

export const useTiles = () => {
  const [boardTiles, setBoardTiles] = useState([]);
  const modal = useRef();

  let tileNumber = 1;
  const baseEmptyTile = { number: numberOfTiles };

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

  const checkIfSolved = (tiles) => {
    const puzzleSolved = tiles.every((tile, index) => {
      return tile.number === index + 1;
    });
    if (puzzleSolved) {
      modal.current.showModal();
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
      checkIfSolved(updatedTiles);
    }
  };
  return { boardTiles, shuffle, fillBoard, move, modal };
};
