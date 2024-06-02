import ContentHeader from "@/components/blocks/ContentHeader";
import { Button } from "@/components/ui/button";
import Rating from "@/components/ui/rating";

const TeaPage = () => {
  return (
    <div className="flex flex-col w-full gap-2">
      <ContentHeader 
        image="img/tea-placeholder.jpg" 
        title="Pure Angel"
        second="White tea"
        third={<Rating />}
      >
          <Button variant="outline" size="icon">Edit</Button>
          <Button variant="outline" size="icon">Edit</Button>
          <Button variant="outline" size="icon">Edit</Button>
          <Button variant="outline">Edit</Button>
          <Button variant="warning">Delete</Button>
      </ContentHeader>
      
      
    </div>
  );
};

export default TeaPage;