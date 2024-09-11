import { AuthContext } from "@/App";
import ErrorPane from "@/components/blocks/ErrorPane";
import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const LibraryPage = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.auth.user;

  return (
    <>
      <Section 
        className="min-h-96" 
        title="My library" 
        fetch={`teas?author.id=${user.id}`} 
        component='teas'
        emptyError={
          <ErrorPane 
            title="There are no teas to show :(" 
            description="You can add new one if you like"
            button={<Button asChild><NavLink to="/add-tea">Add new tea</NavLink></Button>}
          />
        }
      />
    </>
  );
};

export default LibraryPage;