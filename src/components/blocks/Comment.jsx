import { BsThreeDots } from "react-icons/bs";
import { Button } from "../ui/button";

const Comment = ({nickname, content, date, className}) => {
  return (
    <div>
      <div className={`relative flex flex-1 flex-col p-4 gap-1.5 bg-tile rounded-lg shadow-md ${className}`}>
      <Button variant="ghost" size="sm" className="absolute top-0 right-0 m-4"><BsThreeDots /></Button>
        <p><b>{nickname}</b></p>
        <p>{content}</p>
        
      </div>
      <p className="ml-5 mt-1 text-sm italic text-muted-foreground ">{date}</p>
    </div>
  );
};

export default Comment;