import { Link } from "react-router-dom";

const CategoryTile = ({children, properties}) => {
  let image;
  properties.image ? image = properties.image : image = "/img/teaCard-bg.jpg";

  return (
    <Link to={`/categories/${properties.id}`} className="shadow-md relative overflow-hidden flex-1 inline-flex items-center justify-center whitespace-nowrap p-2 max-w-60 min-w-36 rounded-lg h-20 text-destructive-foreground hover:bg-destructive/90 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
        <h3 className="z-10 text-xl text-wrap text-center font-normal text-black">{properties.title}</h3>
        <div className="absolute top-0 left-0 w-full h-full scale-105">
          <img className="w-full h-full object-cover blur-sm" src={image} alt="Placeholder photo for tea page - shows tea cup in the leaves." />
          <div className="absolute top-0 left-0 z-10 w-full h-full bg-white opacity-70"></div>
        </div>
    </Link>
  );
};

export default CategoryTile;