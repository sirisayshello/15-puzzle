import { useRef, useState } from "react";

export type Tile = { number: number };
type TilePosition = {
  row: number;
  column: number;
  index: number;
};

export const columns = 2; // TODO Add to config instead
export const rows = 2; // TODO Add to config instead
export const numberOfTiles = columns * rows;

export const useTiles = () => {
  const [boardTiles, setBoardTiles] = useState<Tile[]>([]);
  const modal = useRef<HTMLDialogElement>(null);

  let tileNumber = 1;
  const baseEmptyTile: Tile = { number: numberOfTiles };

  const shuffle = (array: Tile[]): void => {
    array.sort(() => Math.random() - 0.5);
    setBoardTiles([...array]);
  };

  const fillBoard = (): void => {
    const tiles: Tile[] = [baseEmptyTile];

    for (let i = 1; i < numberOfTiles; i++) {
      const tile: Tile = { number: tileNumber++ };
      tiles.push(tile);
    }
    shuffle(tiles);
    setBoardTiles(tiles);
  };

  const getEmptyTileIndex = (): number =>
    boardTiles.findIndex((tile) => tile.number === numberOfTiles);

  const getPositionOfTile = (index: number): TilePosition => {
    // Get tile's position and thereby which row and column it's in
    const tilePosition = index / columns;
    const row = Math.floor(tilePosition);
    const column = Math.round((tilePosition - row) * 1000) / 1000;
    return { row, column, index };
  };

  const checkIfSolved = (tiles: Tile[]) => {
    const puzzleSolved: boolean = tiles.every((tile, index) => {
      return tile.number === index + 1;
    });

    if (puzzleSolved) {
      modal.current?.showModal();
    }
  };

  const move = (clickedIndex: number) => {
    const emptyTile: TilePosition = getPositionOfTile(getEmptyTileIndex());
    const clickedTile: TilePosition = getPositionOfTile(clickedIndex);

    // check if tile is in same row or column as empty tile
    if (
      clickedTile.row === emptyTile.row ||
      clickedTile.column === emptyTile.column
    ) {
      // Move by updating the array
      const updatedTiles: Tile[] = [...boardTiles];

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
