import Section from "@/components/ui/section";

const CategoriesPage = () => {
  return (
    <Section title="Categories" fetch='categories' items={30} component='categories'/>
  );
};

export default CategoriesPage;