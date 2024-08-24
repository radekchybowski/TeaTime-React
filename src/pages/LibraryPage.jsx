import { AuthContext } from "@/App";
import Section from "@/components/ui/section";
import { useContext } from "react";

const LibraryPage = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.auth.user;

  return (
    <>
      <Section title="My library" fetch={`teas?author.id=${user.id}`} component='teas'/>
    </>
  );
};

export default LibraryPage;