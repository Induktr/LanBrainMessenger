import React from 'react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';

const Docs: React.FC = () => {
  return (
    <Container className="py-16"> {/* Added className */}
      <Section id="docs-section"> {/* Added id */}
        <h1 className="text-4xl font-bold text-center mb-8">Project Documentation</h1>
        <p className="text-center text-[var(--text-secondary)]">
          This page will contain the project documentation. Content coming soon.
        </p>
      </Section>
    </Container>
  );
};

export default Docs;