import { TiThMenu } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const MobileNavButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onClick = () => {
    if(location.pathname === '/nav') {
      navigate(-1)
    }
    else {
      navigate('/nav')
    }
  }

  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        className="MobileNavButton sm:hidden absolute bottom-0 right-0 m-5 z-10"
        onClick={onClick}
      >
        <TiThMenu className="text-xl"/>
      </Button>
    </>
  );
};

export default MobileNavButton;

