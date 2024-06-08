export const Button = ({ onclick, children }) => {
  return (
    <button
      className="bg-board-orange dark:bg-dark-orange py-2 px-6 rounded-md text-xl"
      onClick={onclick}
    >
      {children}
    </button>
  );
};
