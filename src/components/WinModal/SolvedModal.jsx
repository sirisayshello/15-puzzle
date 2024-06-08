import { Button } from "../Button/Button";
import { forwardRef } from "react";

export const SolvedModal = forwardRef(({ close }, ref) => {
  return (
    <dialog
      ref={ref}
      className="bg-tile-pink dark:bg-dark-pink backdrop:bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-md w-full max-w-[400px]"
    >
      <div className="flex flex-col items-center gap-4">
        <div>You did it!</div>
        <Button onclick={close}>Got it</Button>
      </div>
    </dialog>
  );
});
