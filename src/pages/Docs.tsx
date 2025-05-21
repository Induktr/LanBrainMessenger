import React from 'react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import { Link } from 'react-router-dom';
import { CloudinaryArrowIcon } from '../components/Icons/CloudinaryIcons';
import { useLanguage } from '../context/LanguageContext';

const Docs: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[var(--primary)] text-[var(--text-primary)]">
      <Container className="py-16">
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-8 text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors"
          >
            <CloudinaryArrowIcon className="rotate-180" />
            {t('backToHome')}
          </Link>
          <h1 className="text-4xl font-bold mt-6 mb-4">{t('docs.general.title')}</h1>
          <p className="text-[var(--text-secondary)]">
            {t('docs.general.subtitle')}
          </p>
        </div>

        <Section id="introduction">
          <h2 className="text-3xl font-bold mb-4">{t('docs.general.introduction.title')}</h2>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.introduction.content') }} />
        </Section>

        <Section id="vision-mission" className="mt-8">
          <h2 className="text-3xl font-bold mb-4">{t('docs.general.visionAndMission.title')}</h2>
          <h3 className="text-2xl font-bold mb-4">{t('docs.general.visionAndMission.visionTitle')}</h3>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.visionAndMission.visionContent') }} />
          <h3 className="text-2xl font-bold mb-4">{t('docs.general.visionAndMission.missionTitle')}</h3>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.visionAndMission.missionContent') }} />
        </Section>

        <Section id="key-principles" className="mt-8">
          <h2 className="text-3xl font-bold mb-4">{t('docs.general.keyPrinciples.title')}</h2>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.keyPrinciples.intro') }} />
          <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
            {Array.isArray(t('docs.general.keyPrinciples.principles')) ? (
              (t('docs.general.keyPrinciples.principles') as string[]).map((principle, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: principle }} />
              ))
            ) : (
              <li dangerouslySetInnerHTML={{ __html: t('docs.general.keyPrinciples.principles') }} /> // Fallback
            )}
          </ul>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.keyPrinciples.outro') }} />
        </Section>

        <Section id="about-mvp" className="mt-8">
          <h2 className="text-3xl font-bold mb-4">{t('docs.general.aboutMVP.title')}</h2>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.aboutMVP.intro') }} />
          <h3 className="text-2xl font-bold mb-4">{t('docs.general.aboutMVP.featuresTitle')}</h3>
          <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
            {Array.isArray(t('docs.general.aboutMVP.features')) ? (
              (t('docs.general.aboutMVP.features') as string[]).map((feature, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: feature }} />
              ))
            ) : (
              <li dangerouslySetInnerHTML={{ __html: t('docs.general.aboutMVP.features') }} /> // Fallback
            )}
          </ul>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.aboutMVP.outro') }} />
        </Section>

        <Section id="how-we-build" className="mt-8">
          <h2 className="text-3xl font-bold mb-4">{t('docs.general.howWeBuild.title')}</h2>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.howWeBuild.intro') }} />
          <ul className="list-decimal list-inside mb-4 text-[var(--text-secondary)]">
            {Array.isArray(t('docs.general.howWeBuild.steps')) ? (
              (t('docs.general.howWeBuild.steps') as string[]).map((step, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: step }} />
              ))
            ) : (
              <li dangerouslySetInnerHTML={{ __html: t('docs.general.howWeBuild.steps') }} /> // Fallback
            )}
          </ul>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.howWeBuild.outro') }} />
        </Section>

        <Section id="technology-stack" className="mt-8">
          <h2 className="text-3xl font-bold mb-4">{t('docs.general.technologyStack.title')}</h2>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.technologyStack.intro') }} />
          <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
            {Array.isArray(t('docs.general.technologyStack.stack')) ? (
              (t('docs.general.technologyStack.stack') as string[]).map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))
            ) : (
              <li dangerouslySetInnerHTML={{ __html: t('docs.general.technologyStack.stack') }} /> // Fallback
            )}
          </ul>
        </Section>

        <Section id="architecture" className="mt-8">
          <h2 className="text-3xl font-bold mb-4">{t('docs.general.architecture.title')}</h2>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.architecture.intro') }} />
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.architecture.future') }} />
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.architecture.interaction') }} />
        </Section>

        <Section id="project-status" className="mt-8">
          <h2 className="text-3xl font-bold mb-4">{t('docs.general.projectStatus.title')}</h2>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.projectStatus.content') }} />
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.projectStatus.progress') }} />
        </Section>

        <Section id="getting-started" className="mt-8">
          <h2 className="text-3xl font-bold mb-4">{t('docs.general.gettingStarted.title')}</h2>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.gettingStarted.intro') }} />
          <ul className="list-decimal list-inside mb-4 text-[var(--text-secondary)]">
            {Array.isArray(t('docs.general.gettingStarted.steps')) ? (
              (t('docs.general.gettingStarted.steps') as string[]).map((step, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: step }} />
              ))
            ) : (
              <li dangerouslySetInnerHTML={{ __html: t('docs.general.gettingStarted.steps') }} /> // Fallback
            )}
          </ul>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.gettingStarted.outro') }} />
        </Section>

        <Section id="documentation-system" className="mt-8">
          <h2 className="text-3xl font-bold mb-4">{t('docs.general.documentationSystem.title')}</h2>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.documentationSystem.intro') }} />
          <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
            {Array.isArray(t('docs.general.documentationSystem.links')) ? (
              (t('docs.general.documentationSystem.links') as string[]).map((link, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: link }} />
              ))
            ) : (
              <li dangerouslySetInnerHTML={{ __html: t('docs.general.documentationSystem.links') }} /> // Fallback
            )}
          </ul>
        </Section>

        <Section id="contribution" className="mt-8">
          <h2 className="text-3xl font-bold mb-4">{t('docs.general.contribution.title')}</h2>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('docs.general.contribution.content') }} />
        </Section>

      </Container>
    </div>
  );
};

export default Docs;