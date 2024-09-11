import Section from "../components/ui/section";

const HomePage = () => {

    return (
      <>
        <Section title="Newly added" fetch='teas' component='teas'/>
        <Section title="Top rated" fetch='teas?order[currentRating]=desc' component='teas'/>
      </>
    );
};

export default HomePage;