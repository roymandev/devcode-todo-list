export const MainHeader = () => {
  return (
    <div data-cy="header-background" className="bg-primary text-white">
      <header className="container flex h-28 items-center">
        <span data-cy="header-title" className="font-bold text-2xl uppercase">
          TO DO LIST APP
        </span>
      </header>
    </div>
  );
};
