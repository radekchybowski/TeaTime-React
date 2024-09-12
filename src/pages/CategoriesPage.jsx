import ErrorPane from "@/components/blocks/ErrorPane";
import Section from "@/components/ui/section";

const CategoriesPage = () => {
  return (
    <Section 
    title="Categories" 
    fetch='categories' 
    items={30} 
    component='categories'
    emptyError={
      <ErrorPane 
        title="There are no categories to show" 
        description="Maybe contact your administrator about that"
      />
    }
    />
  );
};

export default CategoriesPage;