import Section from "@/components/ui/section";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { id } = useParams();
  return (
    <Section fetch={`teas?category.id=${id}`} component='teas'/>
  );
};

export default CategoryPage;