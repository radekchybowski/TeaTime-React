import React from 'react';
import Section from "../components/ui/section";
import CardTea from '../components/blocks/CardTea';

const Categories = () => {
    return (
      <>
        <Section title="Cipa">
          <CardTea/>
          <CardTea/>
          <CardTea/>
          <CardTea/>
          <CardTea/>
        </Section>
        <Section title="Cyce">
          <CardTea/>
          <CardTea/>
          <CardTea/>
          <CardTea/>
          <CardTea/>
        </Section>
      </>
    );
};

export default Categories;