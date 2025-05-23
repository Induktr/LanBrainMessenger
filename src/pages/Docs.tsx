import React, { useState } from 'react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import { Link } from 'react-router-dom';
import { CloudinaryArrowIcon } from '../components/Icons/CloudinaryIcons';
import { useLanguage } from '../context/LanguageContext';

// Helper component to render content that might be an array or a string
const RenderContent: React.FC<{ contentKey: string }> = ({ contentKey }) => {
  const { t } = useLanguage();
  const content = t(contentKey);

  if (Array.isArray(content)) {
    return (
      <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
        {(content as string[]).map((item, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    );
  } else if (typeof content === 'string') {
    // Check for table content
    if (content.startsWith('<table>')) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    // Check for code blocks
    if (content.includes('```')) {
      const parts = content.split('```');
      return (
        <>
          {parts.map((part, index) => {
            if (index % 2 === 1) {
              // This is a code block
              const [lang, ...codeLines] = part.split('\n');
              return (
                <pre key={index} className="bg-[var(--surface)] p-4 rounded-md overflow-x-auto my-4">
                  <code className={`language-${lang.trim()}`}>{codeLines.join('\n').trim()}</code>
                </pre>
              );
            } else {
              // This is regular text
              return <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: part }} />;
            }
          })}
        </>
      );
    }
    return <p className="mb-4" dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return null;
};

const Docs: React.FC = () => {
  const { t } = useLanguage();
  const [activeDocId, setActiveDocId] = useState('general_docs'); // 'general_docs', 'design_system_docs', 'localization_guide_docs', or 'user_guide_docs'

  const generalSections = [
    { id: 'introduction', titleKey: 'docs.general.introduction.title', contentKey: 'docs.general.introduction.content' },
    { id: 'vision-mission', titleKey: 'docs.general.visionAndMission.title', contentKey: 'docs.general.visionAndMission.visionContent', subSections: [
        { id: 'vision', titleKey: 'docs.general.visionAndMission.visionTitle', contentKey: 'docs.general.visionAndMission.visionContent' },
        { id: 'mission', titleKey: 'docs.general.visionAndMission.missionTitle', contentKey: 'docs.general.visionAndMission.missionContent' },
    ]},
    { id: 'key-principles', titleKey: 'docs.general.keyPrinciples.title', contentKey: 'docs.general.keyPrinciples.intro', listKey: 'docs.general.keyPrinciples.principles', outroKey: 'docs.general.keyPrinciples.outro' },
    { id: 'about-mvp', titleKey: 'docs.general.aboutMVP.title', contentKey: 'docs.general.aboutMVP.intro', subSections: [
        { id: 'mvp-features', titleKey: 'docs.general.aboutMVP.featuresTitle', listKey: 'docs.general.aboutMVP.features' },
    ], outroKey: 'docs.general.aboutMVP.outro' },
    { id: 'how-we-build', titleKey: 'docs.general.howWeBuild.title', contentKey: 'docs.general.howWeBuild.intro', listKey: 'docs.general.howWeBuild.steps', outroKey: 'docs.general.howWeBuild.outro' },
    { id: 'technology-stack', titleKey: 'docs.general.technologyStack.title', contentKey: 'docs.general.technologyStack.intro', listKey: 'docs.general.technologyStack.stack' },
    { id: 'architecture', titleKey: 'docs.general.architecture.title', contentKey: 'docs.general.architecture.intro', additionalContentKeys: ['docs.general.architecture.future', 'docs.general.architecture.interaction'] },
    { id: 'project-status', titleKey: 'docs.general.projectStatus.title', contentKey: 'docs.general.projectStatus.content', additionalContentKeys: ['docs.general.projectStatus.progress'] },
    { id: 'getting-started', titleKey: 'docs.general.gettingStarted.title', contentKey: 'docs.general.gettingStarted.intro', listKey: 'docs.general.gettingStarted.steps', outroKey: 'docs.general.gettingStarted.outro' },
    { id: 'documentation-system', titleKey: 'docs.general.documentationSystem.title', contentKey: 'docs.general.documentationSystem.intro', listKey: 'docs.general.documentationSystem.links' },
    { id: 'contribution', titleKey: 'docs.general.contribution.title', contentKey: 'docs.general.contribution.content' },
  ];

  const designSystemSections = [
    { id: 'design-intro', titleKey: 'docs.design.section1.title', contentKey: 'docs.design.section1.description', subSections: [
        { id: 'design-goal', titleKey: 'docs.design.section1.goal', contentKey: 'docs.design.section1.goal' },
        { id: 'design-principles', titleKey: 'docs.design.section1.principles_title', listKey: 'docs.design.section1.principles' },
    ]},
    { id: 'color-palette', titleKey: 'docs.design.section2.title', contentKey: 'docs.design.section2.intro', subSections: [
        { id: 'light-mode', titleKey: 'docs.design.section2.light_mode_title', tableKey: 'docs.design.section2.light_mode_table' },
        { id: 'dark-mode', titleKey: 'docs.design.section2.dark_mode_title', tableKey: 'docs.design.section2.dark_mode_table' },
        { id: 'premium-colors', titleKey: 'docs.design.section2.premium_colors_title', listKey: 'docs.design.section2.premium_colors' },
        { id: 'color-application', titleKey: 'docs.design.section2.color_application_title', contentKey: 'docs.design.section2.color_application' }, // This needs special handling for nested structure
        { id: 'usage-recommendations', titleKey: 'docs.design.section2.usage_recommendations_title', listKey: 'docs.design.section2.usage_recommendations' },
    ]},
    { id: 'typography', titleKey: 'docs.design.section3.title', contentKey: 'docs.design.section3.intro', subSections: [
        { id: 'primary-font', titleKey: 'docs.design.section3.primary_font_title', listKey: 'docs.design.section3.primary_font' },
        { id: 'sizes-styles', titleKey: 'docs.design.section3.sizes_styles_title', tableKey: 'docs.design.section3.sizes_styles_table' },
        { id: 'typography-notes', titleKey: 'docs.design.section3.notes_title', listKey: 'docs.design.section3.notes' },
    ]},
    { id: 'animations', titleKey: 'docs.design.section4.title', contentKey: 'docs.design.section4.intro', subSections: [
        { id: 'animation-principles', titleKey: 'docs.design.section4.principles_title', listKey: 'docs.design.section4.principles' },
        { id: 'animation-list', titleKey: 'docs.design.section4.list_title', tableKey: 'docs.design.section4.list_table' },
        { id: 'animation-examples', titleKey: 'docs.design.section4.implementation_examples_title', subSections: [
            { id: 'css-ripple', titleKey: 'docs.design.section4.css_ripple_title', contentKey: 'docs.design.section4.css_ripple_code' },
            { id: 'rn-icon', titleKey: 'docs.design.section4.rn_icon_title', contentKey: 'docs.design.section4.rn_icon_code' },
        ]},
    ]},
    { id: 'alignment-grid', titleKey: 'docs.design.section5.title', contentKey: 'docs.design.section5.intro', subSections: [
        { id: 'base-grid', titleKey: 'docs.design.section5.base_grid', contentKey: 'docs.design.section5.base_grid' },
        { id: 'alignment', titleKey: 'docs.design.section5.alignment_title', listKey: 'docs.design.section5.alignment' },
        { id: 'adaptability', titleKey: 'docs.design.section5.adaptability_title', listKey: 'docs.design.section5.adaptability' },
    ]},
    { id: 'accessibility', titleKey: 'docs.design.section6.title', contentKey: 'docs.design.section6.intro', listKey: 'docs.design.section6.principles' },
    { id: 'notes-recommendations', titleKey: 'docs.design.section7.title', listKey: 'docs.design.section7.notes' },
  ];

  const localizationGuideSections = [
    { id: 'localization-intro', titleKey: 'docs.localizationGuide.section1.title', contentKey: 'docs.localizationGuide.section1.description', subSections: [
        { id: 'localization-goal', titleKey: 'docs.localizationGuide.section1.goal', contentKey: 'docs.localizationGuide.section1.goal' },
        { id: 'localization-principles', titleKey: 'docs.localizationGuide.section1.principles_title', listKey: 'docs.localizationGuide.section1.principles' },
    ]},
    { id: 'localization-goals', titleKey: 'docs.localizationGuide.section2.title', listKey: 'docs.localizationGuide.section2.goals' },
    { id: 'localization-tools', titleKey: 'docs.localizationGuide.section3.title', contentKey: 'docs.localizationGuide.section3.intro', tableKey: 'docs.localizationGuide.section3.tools_table' },
    { id: 'localization-file-structure', titleKey: 'docs.localizationGuide.section4.title', contentKey: 'docs.localizationGuide.section4.intro', subSections: [
        { id: 'localization-file-location', titleKey: 'docs.localizationGuide.section4.location_title', contentKey: 'docs.localizationGuide.section4.location_content' },
        { id: 'localization-file-format', titleKey: 'docs.localizationGuide.section4.format_title', contentKey: 'docs.localizationGuide.section4.format_content', codeExampleKey: 'docs.localizationGuide.section4.format_example' },
        { id: 'localization-rtl-flag', titleKey: 'docs.localizationGuide.section4.rtl_flag_title', contentKey: 'docs.localizationGuide.section4.rtl_flag_content', codeExampleKey: 'docs.localizationGuide.section4.rtl_flag_example' },
    ]},
    { id: 'localization-setup', titleKey: 'docs.localizationGuide.section5.title', contentKey: 'docs.localizationGuide.section5.intro', subSections: [
        { id: 'localization-frontend', titleKey: 'docs.localizationGuide.section5.frontend_title', subSections: [
            { id: 'localization-frontend-init', titleKey: 'docs.localizationGuide.section5.frontend_init_title', contentKey: 'docs.localizationGuide.section5.frontend_init_code' },
            { id: 'localization-frontend-usage', titleKey: 'docs.localizationGuide.section5.frontend_usage_title', contentKey: 'docs.localizationGuide.section5.frontend_usage_code' },
            { id: 'localization-frontend-change', titleKey: 'docs.localizationGuide.section5.frontend_change_title', contentKey: 'docs.localizationGuide.section5.frontend_change_content' },
        ]},
        { id: 'localization-backend', titleKey: 'docs.localizationGuide.section5.backend_title', contentKey: 'docs.localizationGuide.section5.backend_intro', codeExampleKey: 'docs.localizationGuide.section5.backend_code', additionalContentKeys: ['docs.localizationGuide.section5.backend_note'] },
        { id: 'localization-rtl-adaptation', titleKey: 'docs.localizationGuide.section5.rtl_adaptation_title', contentKey: 'docs.localizationGuide.section5.rtl_adaptation_intro', subSections: [
            { id: 'localization-rtl-css', titleKey: 'docs.localizationGuide.section5.rtl_css_title', contentKey: 'docs.localizationGuide.section5.rtl_css_code' },
            { id: 'localization-rtl-rn', titleKey: 'docs.localizationGuide.section5.rtl_rn_title', contentKey: 'docs.localizationGuide.section5.rtl_rn_code' },
            { id: 'localization-rtl-icons', titleKey: 'docs.localizationGuide.section5.rtl_icons_title', contentKey: 'docs.localizationGuide.section5.rtl_icons_content' },
        ]},
    ]},
    { id: 'localization-add-language', titleKey: 'docs.localizationGuide.section6.title', contentKey: 'docs.localizationGuide.section6.intro', subSections: [
        { id: 'localization-add-language-file', titleKey: 'docs.localizationGuide.section6.file_title', contentKey: 'docs.localizationGuide.section6.file_content' },
        { id: 'localization-add-language-transifex', titleKey: 'docs.localizationGuide.section6.transifex_title', contentKey: 'docs.localizationGuide.section6.transifex_content' },
        { id: 'localization-add-language-process', titleKey: 'docs.localizationGuide.section6.process_title', contentKey: 'docs.localizationGuide.section6.process_content' },
        { id: 'localization-add-language-export', titleKey: 'docs.localizationGuide.section6.export_title', contentKey: 'docs.localizationGuide.section6.export_content' },
        { id: 'localization-add-language-ui', titleKey: 'docs.localizationGuide.section6.ui_title', contentKey: 'docs.localizationGuide.section6.ui_content' },
        { id: 'localization-add-language-testing', titleKey: 'docs.localizationGuide.section6.testing_title', contentKey: 'docs.localizationGuide.section6.testing_intro', listKey: 'docs.localizationGuide.section6.testing_scenarios' },
    ]},
    { id: 'localization-supported-languages', titleKey: 'docs.localizationGuide.section7.title', contentKey: 'docs.localizationGuide.section7.intro', tableKey: 'docs.localizationGuide.section7.languages_table', additionalContentKeys: ['docs.localizationGuide.section7.expansion_note'] },
    { id: 'localization-recommendations', titleKey: 'docs.localizationGuide.section8.title', subSections: [
        { id: 'localization-recommendations-dev', titleKey: 'docs.localizationGuide.section8.dev_title', listKey: 'docs.localizationGuide.section8.dev_points' },
        { id: 'localization-recommendations-design', titleKey: 'docs.localizationGuide.section8.design_title', listKey: 'docs.localizationGuide.section8.design_points' },
        { id: 'localization-recommendations-translator', titleKey: 'docs.localizationGuide.section8.translator_title', listKey: 'docs.localizationGuide.section8.translator_points' },
    ]},
    { id: 'localization-formatting', titleKey: 'docs.localizationGuide.section9.title', contentKey: 'docs.localizationGuide.section9.intro', subSections: [
        { id: 'localization-formatting-dates', titleKey: 'docs.localizationGuide.section9.dates_title', contentKey: 'docs.localizationGuide.section9.dates_code' },
        { id: 'localization-formatting-numbers', titleKey: 'docs.localizationGuide.section9.numbers_title', contentKey: 'docs.localizationGuide.section9.numbers_code' },
    ]},
    { id: 'localization-testing', titleKey: 'docs.localizationGuide.section10.title', contentKey: 'docs.localizationGuide.section10.intro', subSections: [
        { id: 'localization-testing-scenarios', titleKey: 'docs.localizationGuide.section10.scenarios_title', listKey: 'docs.localizationGuide.section10.scenarios_points' },
        { id: 'localization-testing-tools', titleKey: 'docs.localizationGuide.section10.tools_title', listKey: 'docs.localizationGuide.section10.tools_points' },
        { id: 'localization-testing-criteria', titleKey: 'docs.localizationGuide.section10.criteria_title', listKey: 'docs.localizationGuide.section10.criteria_points' },
    ]},
    { id: 'localization-notes', titleKey: 'docs.localizationGuide.section11.title', listKey: 'docs.localizationGuide.section11.notes' },
  ];

  const docsConfig = [
    {
      id: 'general_docs',
      titleKey: 'docs.general.title',
      subtitleKey: 'docs.general.subtitle',
      sections: generalSections,
    },
    {
      id: 'design_system_docs',
      titleKey: 'docs.design.title',
      subtitleKey: 'docs.design.subtitle',
      sections: designSystemSections,
    },
    {
      id: 'localization_guide_docs',
      titleKey: 'docs.localizationGuide.title',
      subtitleKey: 'docs.localizationGuide.subtitle',
      sections: localizationGuideSections,
    },
  ];

  const activeDoc = docsConfig.find(doc => doc.id === activeDocId);
  const sectionsToRender = activeDoc ? activeDoc.sections : [];

  const renderSectionContent = (section: any) => {
    // Only call t(contentKey) if contentKey is defined
    const content = section.contentKey ? t(section.contentKey) : null;
    const list = section.listKey ? t(section.listKey) : null;
    const outro = section.outroKey ? t(section.outroKey) : null;
    const table = section.tableKey ? t(section.tableKey) : null;
    const codeExample = section.codeExampleKey ? t(section.codeExampleKey) : null; // Handle code examples
    const additionalContent = section.additionalContentKeys ? section.additionalContentKeys.map((key: string) => t(key)) : [];

    return (
      <>
        {content && typeof content === 'string' && !content.startsWith('<table>') && !content.includes('```') && (
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: content }} />
        )}
        {content && typeof content === 'object' && Array.isArray(content) && section.contentKey === 'docs.design.section2.color_application' && (
            (content as any[]).map((item, idx) => (
                <div key={idx} className="mb-4">
                    <h4 className="text-xl font-semibold mb-2" dangerouslySetInnerHTML={{ __html: item.title }} />
                    <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
                        {item.items.map((subItem: string, subIdx: number) => (
                            <li key={subIdx} dangerouslySetInnerHTML={{ __html: subItem }} />
                        ))}
                    </ul>
                </div>
            ))
        )}
        {content && typeof content === 'string' && (content.startsWith('<table>') || content.includes('```')) && (
            <RenderContent contentKey={section.contentKey} />
        )}
        {codeExample && (
            <RenderContent contentKey={section.codeExampleKey} />
        )}
        {list && Array.isArray(list) && (
          <ul className={`mb-4 text-[var(--text-secondary)] ${section.listKey === 'docs.general.howWeBuild.steps' || section.listKey === 'docs.general.gettingStarted.steps' || section.listKey === 'docs.localizationGuide.section6.testing_scenarios' || section.listKey === 'docs.localizationGuide.section10.scenarios_points' ? 'list-decimal' : 'list-disc'} list-inside`}>
            {(list as string[]).map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        )}
        {table && Array.isArray(table) && (
            <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-[var(--surface)] rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-[var(--primary)] text-[var(--text-primary)]">
                            {(table[0] as string[]).map((header, index) => (
                                <th key={index} className="py-2 px-4 text-left" dangerouslySetInnerHTML={{ __html: header }} />
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {(table as string[][]).slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-t border-[var(--border)]">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="py-2 px-4" dangerouslySetInnerHTML={{ __html: cell }} />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
        {outro && <p className="mb-4" dangerouslySetInnerHTML={{ __html: outro }} />}
        {additionalContent.map((item: string, index: number) => (
            <p key={`add-content-${index}`} className="mb-4" dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--primary)] text-[var(--text-primary)] flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 p-8 border-r border-[var(--border)] sticky top-0 h-screen overflow-y-auto hidden lg:block">
        <h2 className="text-2xl font-bold mb-6">{activeDoc ? t(activeDoc.titleKey) : ''}</h2>
        <nav>
          <ul>
            {sectionsToRender.map((section) => (
              <React.Fragment key={section.id}>
                <li className="mb-2">
                  <a
                    href={`#${section.id}`}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    {t(section.titleKey)}
                  </a>
                </li>
                {section.subSections && (
                    <ul className="ml-4">
                        {section.subSections.map((subSection: any) => (
                            <li key={subSection.id} className="mb-2">
                                <a
                                    href={`#${subSection.id}`}
                                    className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                                >
                                    {t(subSection.titleKey)}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <Container className="flex-1 py-16 px-8 lg:px-16">
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-8 text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors"
          >
            <CloudinaryArrowIcon className="rotate-180" />
            {t('common.backToHome')}
          </Link>
          <div className="flex items-center justify-between mt-6 mb-4">
            <h1 className="text-4xl font-bold">{activeDoc ? t(activeDoc.titleKey) : ''}</h1>
            <select
              value={activeDocId}
              onChange={(e) => setActiveDocId(e.target.value)}
              className="p-2 rounded-md bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)]"
            >
              {docsConfig.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {t(doc.titleKey)}
                </option>
              ))}
            </select>
          </div>
          <p className="text-[var(--text-secondary)]">
            {activeDoc ? t(activeDoc.subtitleKey) : ''}
          </p>
        </div>

        {sectionsToRender.map((section) => (
          <Section key={section.id} id={section.id} className="mt-8">
            <h2 className="text-3xl font-bold mb-4">{t(section.titleKey)}</h2>
            {renderSectionContent(section)}
            {section.subSections && section.subSections.map((subSection: any) => (
                <div key={subSection.id} id={subSection.id} className="mt-8">
                    <h3 className="text-2xl font-bold mb-4">{t(subSection.titleKey)}</h3>
                    {renderSectionContent(subSection)}
                </div>
            ))}
          </Section>
        ))}
      </Container>
    </div>
  );
};

export default Docs;
