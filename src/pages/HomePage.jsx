import React, { useState } from 'react';
import Section from "../components/ui/section";
import CardTea from '../components/blocks/CardTea';

const fetchData = (resource) => {
  fetch(`http://localhost:3000/${resource}`)
      .then((response) => response.json())
      .then((data) => {
          return data
      });
}



const HomePage = () => {
  const [teas, setTeas] = useState(fetchData('teas'));

  console.log(teas)

    return (
      <>
        <Section title="Newly added">
          <CardTea/>
          <CardTea/>
          <CardTea/>
          <CardTea/>
          <CardTea/>
        </Section>
        <Section title="Top rated">
          <CardTea/>
          <CardTea/>
          <CardTea/>
          <CardTea/>
          <CardTea/>
        </Section>
      </>
    );
};

export default HomePage;