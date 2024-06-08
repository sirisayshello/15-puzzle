type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      className="bg-board-orange dark:bg-dark-orange py-2 px-6 rounded-md md:text-xl"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
