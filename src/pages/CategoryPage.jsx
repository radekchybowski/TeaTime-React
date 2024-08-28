import ErrorPane from "@/components/blocks/ErrorPane";
import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { NavLink, useParams } from "react-router-dom";

const CategoryPage = () => {
  const { id } = useParams();
  return (
    <Section 
      fetch={`teas?category.id=${id}`} 
      items={20} 
      component='teas'
      emptyError={
        <ErrorPane 
          title="No content added" 
          description="There is no category under that name, or there is no tea added under that category."
          button={<Button className="text-center"><NavLink to="/add-tea">Add new tea</NavLink></Button>}
        />
      }
    />
  );
};

export default CategoryPage;