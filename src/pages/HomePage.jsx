import Section from "../components/ui/section";

const HomePage = () => {

    return (
      <>
        <Section title="Newly added" fetch='teas' component='teas'/>
        <Section title="Green tea" fetch='teas?category.title=zielona' component='teas'/>
      </>
    );
};

export default HomePage;