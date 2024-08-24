
const BrewingTile = ({icon, title, content, className}) => {
  return (
      <div className={`flex flex-1 flex-col items-center py-6 px-2.5 gap-1.5 bg-tile rounded-lg shadow-md 2xl:flex-row 2xl:p-4 2xl:gap-4 ${className}`}>
        <i className="text-3xl">{icon}</i>
        <p className="text-lg font-semibold">{content}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
  );
};

export default BrewingTile;