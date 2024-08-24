import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const ErrorPane = ({title="It looks like something went wrong :(", description=""}) => {
  return (
    <div className="flex flex-col w-full justify-center items-center h-96 rounded-lg bg-card p-5 gap-2">
      <h4>{title}</h4>
      <p>{description}</p>
      <Button className="text-center" asChild><NavLink to="/">Refresh the page</NavLink></Button>
    </div>
  );
};

export default ErrorPane;