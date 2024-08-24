import { TiThMenu } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const MobileNavButton = () => {
  return (
    <>
      <Button asChild variant="outline" size="icon">
        <NavLink className="MobileNavButton sm:hidden absolute bottom-0 right-0 m-5 z-10" to="nav"><TiThMenu className="text-xl"/></NavLink>
      </Button>
    </>
  );
};

export default MobileNavButton;

