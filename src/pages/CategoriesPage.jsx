import CategoryTile from "@/components/blocks/CategoryTile";
import Section from "@/components/ui/section";
import useFetch from "../hooks/useFetch";

const CategoriesPage = () => {

  

  return (
    <Section title="Categories" fetch='categories' component='category'/>
  );
};

export default CategoriesPage;