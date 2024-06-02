import React from 'react';
import Section from "../components/ui/section";
import CardTea from '../components/blocks/CardTea';

const HomePage = () => {
    return (
      <>
        <Section title="Chuj">
          <CardTea/>
          <CardTea/>
          <CardTea/>
          <CardTea/>
          <CardTea/>
        </Section>
        <Section title="Dupa">
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