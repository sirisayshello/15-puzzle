import { Button } from "../Button/Button";
import { forwardRef } from "react";

type ModalProps = {
  close: () => void;
};

export const SolvedModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ close }, ref) => {
    return (
      <dialog
        ref={ref}
        className="bg-tile-pink dark:bg-dark-pink backdrop:bg-gradient-to-tr from-board-orange from-25% to-tile-pink backdrop:opacity-95 p-4 rounded-md w-full max-w-[300px] md:max-w-[400px] animate-fade backdrop:animate-fade"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div>You did it!</div>
          <Button onClick={close}>Got it</Button>
        </div>
      </dialog>
    );
  }
);
