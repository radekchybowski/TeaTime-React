import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const ErrorPane = ({title="It looks like something went wrong :(", description="No content found", button=null}) => {
  const navigate = useNavigate();
  button = button ?? <Button onClick={() => navigate(0)} className="text-center">Refresh the page</Button>
  return (
    <div className="flex flex-col w-full justify-center items-center h-96 rounded-lg bg-card p-5 gap-2 text-center">
      <h4>{title}</h4>
      <p>{description}</p>
      {button}
    </div>
  );
};

export default ErrorPane;