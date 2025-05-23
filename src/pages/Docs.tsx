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

  const userGuideSections = [
    { id: 'user-guide-introduction', titleKey: 'docs.userGuide.introduction.title', contentKey: 'docs.userGuide.introduction.p1', additionalContentKeys: ['docs.userGuide.introduction.p2', 'docs.userGuide.introduction.p3', 'docs.userGuide.introduction.p4', 'docs.userGuide.introduction.p5'] },
    { id: 'getting-started', titleKey: 'docs.userGuide.gettingStarted.title', contentKey: 'docs.userGuide.gettingStarted.p1', subSections: [
        { id: 'registration', titleKey: 'docs.userGuide.gettingStarted.registration.title', listKey: 'docs.userGuide.gettingStarted.registration.steps', additionalContentKeys: ['docs.userGuide.gettingStarted.registration.result'] },
        { id: 'login', titleKey: 'docs.userGuide.gettingStarted.login.title', listKey: 'docs.userGuide.gettingStarted.login.steps', additionalContentKeys: ['docs.userGuide.gettingStarted.login.note'] },
        { id: 'logout', titleKey: 'docs.userGuide.gettingStarted.logout.title', listKey: 'docs.userGuide.gettingStarted.logout.steps' },
    ]},
    { id: 'main-functions', titleKey: 'docs.userGuide.mainFunctions.title', contentKey: 'docs.userGuide.mainFunctions.p1', subSections: [
        { id: 'chats-messages', titleKey: 'docs.userGuide.mainFunctions.chatsAndMessages.title', listKey: 'docs.userGuide.mainFunctions.chatsAndMessages.sections' },
        { id: 'calls', titleKey: 'docs.userGuide.mainFunctions.calls.title', listKey: 'docs.userGuide.mainFunctions.calls.sections' },
        { id: 'files-media', titleKey: 'docs.userGuide.mainFunctions.filesAndMedia.title', listKey: 'docs.userGuide.mainFunctions.filesAndMedia.sections' },
        { id: 'contacts', titleKey: 'docs.userGuide.mainFunctions.contacts.title', listKey: 'docs.userGuide.mainFunctions.contacts.sections' },
        { id: 'settings', titleKey: 'docs.userGuide.mainFunctions.settings.title', contentKey: 'docs.userGuide.mainFunctions.settings.p1', listKey: 'docs.userGuide.mainFunctions.settings.sections' },
        { id: 'premium-subscription', titleKey: 'docs.userGuide.mainFunctions.premiumSubscription.title', contentKey: 'docs.userGuide.mainFunctions.premiumSubscription.p1', listKey: 'docs.userGuide.mainFunctions.premiumSubscription.sections' },
    ]},
    { id: 'faq', titleKey: 'docs.userGuide.faq.title', contentKey: 'docs.userGuide.faq.p1', subSections: [
        { id: 'faq-q1', titleKey: 'docs.userGuide.faq.q1.question', contentKey: 'docs.userGuide.faq.q1.answer' },
        { id: 'faq-q2', titleKey: 'docs.userGuide.faq.q2.question', contentKey: 'docs.userGuide.faq.q2.answer' },
        { id: 'faq-q3', titleKey: 'docs.userGuide.faq.q3.question', contentKey: 'docs.userGuide.faq.q3.answer' },
        { id: 'faq-q4', titleKey: 'docs.userGuide.faq.q4.question', contentKey: 'docs.userGuide.faq.q4.answer' },
    ]},
    { id: 'tips', titleKey: 'docs.userGuide.tips.title', contentKey: 'docs.userGuide.tips.p1', listKey: 'docs.userGuide.tips.sections' },
    { id: 'support', titleKey: 'docs.userGuide.support.title', contentKey: 'docs.userGuide.support.p1', listKey: 'docs.userGuide.support.sections', additionalContentKeys: ['docs.userGuide.support.p2'] },
  ];

  const devGuideSections = [
    { id: 'dev-intro', titleKey: 'docs.devGuide.introduction.title', contentKey: 'docs.devGuide.introduction.description', subSections: [
        { id: 'dev-goal', titleKey: 'docs.devGuide.introduction.goal', contentKey: 'docs.devGuide.introduction.goal' },
        { id: 'dev-audience', titleKey: 'docs.devGuide.introduction.audience', contentKey: 'docs.devGuide.introduction.audience' },
        { id: 'dev-principles', titleKey: 'docs.devGuide.introduction.principles_title', listKey: 'docs.devGuide.introduction.principles' },
    ]},
    { id: 'repo-structure', titleKey: 'docs.devGuide.repoStructure.title', contentKey: 'docs.devGuide.repoStructure.description', subSections: [
        { id: 'repo-core', titleKey: 'docs.devGuide.repoStructure.core_title', contentKey: 'docs.devGuide.repoStructure.core_content' },
        { id: 'repo-mobile-desktop', titleKey: 'docs.devGuide.repoStructure.mobile_desktop_title', contentKey: 'docs.devGuide.repoStructure.mobile_desktop_content' },
        { id: 'repo-web', titleKey: 'docs.devGuide.repoStructure.web_title', contentKey: 'docs.devGuide.repoStructure.web_content' },
        { id: 'repo-backend', titleKey: 'docs.devGuide.repoStructure.backend_title', contentKey: 'docs.devGuide.repoStructure.backend_content' },
        { id: 'repo-infrastructure', titleKey: 'docs.devGuide.repoStructure.infrastructure_title', contentKey: 'docs.devGuide.repoStructure.infrastructure_content' },
        { id: 'repo-docs', titleKey: 'docs.devGuide.repoStructure.docs_title', contentKey: 'docs.devGuide.repoStructure.docs_content' },
        { id: 'repo-turbo', titleKey: 'docs.devGuide.repoStructure.turbo_title', contentKey: 'docs.devGuide.repoStructure.turbo_content' },
    ]},
    { id: 'tech-stack', titleKey: 'docs.devGuide.techStack.title', contentKey: 'docs.devGuide.techStack.intro', tableKey: 'docs.devGuide.techStack.table' },
    { id: 'coding-standards', titleKey: 'docs.devGuide.codingStandards.title', contentKey: 'docs.devGuide.codingStandards.intro', subSections: [
        { id: 'general-principles', titleKey: 'docs.devGuide.codingStandards.generalPrinciples.title', listKey: 'docs.devGuide.codingStandards.generalPrinciples.principles' },
        { id: 'naming-conventions', titleKey: 'docs.devGuide.codingStandards.namingConventions.title', listKey: 'docs.devGuide.codingStandards.namingConventions.conventions' },
        { id: 'formatting-linting', titleKey: 'docs.devGuide.codingStandards.formattingLinting.title', contentKey: 'docs.devGuide.codingStandards.formattingLinting.intro', subSections: [
            { id: 'prettier', titleKey: 'docs.devGuide.codingStandards.formattingLinting.prettier_title', contentKey: 'docs.devGuide.codingStandards.formattingLinting.prettier_content', codeExampleKey: 'docs.devGuide.codingStandards.formattingLinting.prettier_code' },
            { id: 'eslint', titleKey: 'docs.devGuide.codingStandards.formattingLinting.eslint_title', contentKey: 'docs.devGuide.codingStandards.formattingLinting.eslint_content' },
        ]},
        { id: 'code-structure', titleKey: 'docs.devGuide.codingStandards.codeStructure.title', contentKey: 'docs.devGuide.codingStandards.codeStructure.intro', subSections: [
            { id: 'core-package', titleKey: 'docs.devGuide.codingStandards.codeStructure.corePackage.title', listKey: 'docs.devGuide.codingStandards.codeStructure.corePackage.points' },
            { id: 'mobile-desktop-package', titleKey: 'docs.devGuide.codingStandards.codeStructure.mobileDesktopPackage.title', listKey: 'docs.devGuide.codingStandards.codeStructure.mobileDesktopPackage.points' },
            { id: 'web-package', titleKey: 'docs.devGuide.codingStandards.codeStructure.webPackage.title', listKey: 'docs.devGuide.codingStandards.codeStructure.webPackage.points' },
            { id: 'backend-package', titleKey: 'docs.devGuide.codingStandards.codeStructure.backendPackage.title', listKey: 'docs.devGuide.codingStandards.codeStructure.backendPackage.points' },
        ]},
    ]},
    { id: 'libraries', titleKey: 'docs.devGuide.libraries.title', contentKey: 'docs.devGuide.libraries.intro', subSections: [
        { id: 'common-libs', titleKey: 'docs.devGuide.libraries.common.title', listKey: 'docs.devGuide.libraries.common.libs' },
        { id: 'mobile-desktop-libs', titleKey: 'docs.devGuide.libraries.mobileDesktop.title', listKey: 'docs.devGuide.libraries.mobileDesktop.libs' },
        { id: 'web-libs', titleKey: 'docs.devGuide.libraries.web.title', listKey: 'docs.devGuide.libraries.web.libs' },
        { id: 'backend-libs', titleKey: 'docs.devGuide.libraries.backend.title', listKey: 'docs.devGuide.libraries.backend.libs' },
        { id: 'cross-package-libs', titleKey: 'docs.devGuide.libraries.crossPackage.title', listKey: 'docs.devGuide.libraries.crossPackage.libs' },
        { id: 'set-methods', titleKey: 'docs.devGuide.setMethods.title', contentKey: 'docs.devGuide.setMethods.intro', subSections: [
            { id: 'set-methods-areas', titleKey: 'docs.devGuide.setMethods.areas.title', listKey: 'docs.devGuide.setMethods.areas.points' },
            { id: 'set-methods-keys', titleKey: 'docs.devGuide.setMethods.keys.title', listKey: 'docs.devGuide.setMethods.keys.points' },
            { id: 'set-methods-examples', titleKey: 'docs.devGuide.setMethods.examples.title', contentKey: 'docs.devGuide.setMethods.examples.code', listKey: 'docs.devGuide.setMethods.examples.recommendations' },
        ]},
    ]},
    { id: 'dev-process', titleKey: 'docs.devGuide.devProcess.title', contentKey: 'docs.devGuide.devProcess.intro', subSections: [
        { id: 'env-setup', titleKey: 'docs.devGuide.devProcess.envSetup.title', contentKey: 'docs.devGuide.devProcess.envSetup.intro', subSections: [
            { id: 'clone-repo', titleKey: 'docs.devGuide.devProcess.envSetup.cloneRepo.title', contentKey: 'docs.devGuide.devProcess.envSetup.cloneRepo.code' },
            { id: 'install-deps', titleKey: 'docs.devGuide.devProcess.envSetup.installDeps.title', contentKey: 'docs.devGuide.devProcess.envSetup.installDeps.code' },
            { id: 'env-vars', titleKey: 'docs.devGuide.devProcess.envSetup.envVars.title', contentKey: 'docs.devGuide.devProcess.envSetup.envVars.code', additionalContentKeys: ['docs.devGuide.devProcess.envVars.note'] },
            { id: 'prisma-client', titleKey: 'docs.devGuide.devProcess.envSetup.prismaClient.title', contentKey: 'docs.devGuide.devProcess.envSetup.prismaClient.code' },
            { id: 'local-db', titleKey: 'docs.devGuide.devProcess.envSetup.localDb.title', contentKey: 'docs.devGuide.devProcess.envSetup.localDb.code' },
        ]},
        { id: 'local-run', titleKey: 'docs.devGuide.devProcess.localRun.title', contentKey: 'docs.devGuide.devProcess.localRun.intro', subSections: [
            { id: 'run-all', titleKey: 'docs.devGuide.devProcess.localRun.runAll.title', contentKey: 'docs.devGuide.devProcess.localRun.runAll.code' },
            { id: 'run-backend', titleKey: 'docs.devGuide.devProcess.localRun.runBackend.title', contentKey: 'docs.devGuide.devProcess.localRun.runBackend.code' },
            { id: 'run-mobile-desktop', titleKey: 'docs.devGuide.devProcess.localRun.runMobileDesktop.title', contentKey: 'docs.devGuide.devProcess.localRun.runMobileDesktop.code' },
            { id: 'run-web', titleKey: 'docs.devGuide.devProcess.localRun.runWeb.title', contentKey: 'docs.devGuide.devProcess.localRun.runWeb.code' },
        ]},
        { id: 'commits-branches', titleKey: 'docs.devGuide.devProcess.commitsBranches.title', contentKey: 'docs.devGuide.devProcess.commitsBranches.intro', subSections: [
            { id: 'main-branches', titleKey: 'docs.devGuide.devProcess.commitsBranches.mainBranches.title', listKey: 'docs.devGuide.devProcess.commitsBranches.mainBranches.points' },
            { id: 'work-branches', titleKey: 'docs.devGuide.devProcess.commitsBranches.workBranches.title', listKey: 'docs.devGuide.devProcess.commitsBranches.workBranches.points' },
            { id: 'commit-format', titleKey: 'docs.devGuide.devProcess.commitsBranches.commitFormat.title', contentKey: 'docs.devGuide.devProcess.commitsBranches.commitFormat.example', additionalContentKeys: ['docs.devGuide.devProcess.commitsBranches.commitFormat.structure'] },
        ]},
        { id: 'pr-code-review', titleKey: 'docs.devGuide.devProcess.prCodeReview.title', contentKey: 'docs.devGuide.devProcess.prCodeReview.intro', subSections: [
            { id: 'pr-description', titleKey: 'docs.devGuide.devProcess.prCodeReview.prDescription.title', listKey: 'docs.devGuide.devProcess.prCodeReview.prDescription.points' },
            { id: 'pr-requirements', titleKey: 'docs.devGuide.devProcess.prCodeReview.prRequirements.title', listKey: 'docs.devGuide.devProcess.prCodeReview.prRequirements.points' },
        ]},
        { id: 'testing', titleKey: 'docs.devGuide.devProcess.testing.title', contentKey: 'docs.devGuide.devProcess.testing.intro', subSections: [
            { id: 'run-all-tests', titleKey: 'docs.devGuide.devProcess.testing.runAllTests.title', contentKey: 'docs.devGuide.devProcess.testing.runAllTests.code' },
            { id: 'test-types', titleKey: 'docs.devGuide.devProcess.testing.testTypes.title', listKey: 'docs.devGuide.devProcess.testing.testTypes.points' },
            { id: 'ci-cd-tests', titleKey: 'docs.devGuide.devProcess.testing.ciCdTests.title', contentKey: 'docs.devGuide.devProcess.testing.ciCdTests.content' },
        ]},
    ]},
    { id: 'dev-recommendations', titleKey: 'docs.devGuide.devRecommendations.title', contentKey: 'docs.devGuide.devRecommendations.intro', subSections: [
        { id: 'core-package-recs', titleKey: 'docs.devGuide.devRecommendations.corePackage.title', listKey: 'docs.devGuide.devRecommendations.corePackage.points' },
        { id: 'mobile-desktop-recs', titleKey: 'docs.devGuide.devRecommendations.mobileDesktop.title', listKey: 'docs.devGuide.devRecommendations.mobileDesktop.points' },
        { id: 'web-recs', titleKey: 'docs.devGuide.devRecommendations.web.title', listKey: 'docs.devGuide.devRecommendations.web.points' },
        { id: 'backend-recs', titleKey: 'docs.devGuide.devRecommendations.backend.title', listKey: 'docs.devGuide.devRecommendations.backend.points' },
        { id: 'security-recs', titleKey: 'docs.devGuide.devRecommendations.security.title', contentKey: 'docs.devGuide.devRecommendations.security.intro', listKey: 'docs.devGuide.devRecommendations.security.points' },
    ]},
    { id: 'optimization', titleKey: 'docs.devGuide.optimization.title', contentKey: 'docs.devGuide.optimization.content' },
    { id: 'deploy-process', titleKey: 'docs.devGuide.deployProcess.title', contentKey: 'docs.devGuide.deployProcess.intro', listKey: 'docs.devGuide.deployProcess.points', additionalContentKeys: ['docs.devGuide.deployProcess.process'] },
    { id: 'dev-commands', titleKey: 'docs.devGuide.devCommands.title', tableKey: 'docs.devGuide.devCommands.table' },
    { id: 'notes', titleKey: 'docs.devGuide.notes.title', listKey: 'docs.devGuide.notes.points' },
  ];

  const optimizationGuideSections = [
    { id: 'introduction', titleKey: 'docs.optimizationGuide.introduction.title', contentKey: 'docs.optimizationGuide.introduction.description', subSections: [
        { id: 'optimization-goal', titleKey: 'docs.optimizationGuide.introduction.goalTitle', contentKey: 'docs.optimizationGuide.introduction.goalContent' },
        { id: 'optimization-audience', titleKey: 'docs.optimizationGuide.introduction.audienceTitle', contentKey: 'docs.optimizationGuide.introduction.audienceContent' },
        { id: 'optimization-principles', titleKey: 'docs.optimizationGuide.introduction.principlesTitle', listKey: 'docs.optimizationGuide.introduction.principles' },
    ]},
    { id: 'general-principle', titleKey: 'docs.optimizationGuide.generalPrinciple.title', contentKey: 'docs.optimizationGuide.generalPrinciple.intro', subSections: [
        { id: 'measure', titleKey: 'docs.optimizationGuide.generalPrinciple.step1.title', contentKey: 'docs.optimizationGuide.generalPrinciple.step1.content' },
        { id: 'analyze', titleKey: 'docs.optimizationGuide.generalPrinciple.step2.title', contentKey: 'docs.optimizationGuide.generalPrinciple.step2.content' },
        { id: 'improve', titleKey: 'docs.optimizationGuide.generalPrinciple.step3.title', contentKey: 'docs.optimizationGuide.generalPrinciple.step3.content' },
        { id: 'verify', titleKey: 'docs.optimizationGuide.generalPrinciple.step4.title', contentKey: 'docs.optimizationGuide.generalPrinciple.step4.content' },
        { id: 'repeat', titleKey: 'docs.optimizationGuide.generalPrinciple.step5.title', contentKey: 'docs.optimizationGuide.generalPrinciple.step5.content' },
    ]},
    { id: 'image-processing', titleKey: 'docs.optimizationGuide.imageProcessing.title', contentKey: 'docs.optimizationGuide.imageProcessing.intro', subSections: [
        { id: 'image-library', titleKey: 'docs.optimizationGuide.imageProcessing.libraryTitle', contentKey: 'docs.optimizationGuide.imageProcessing.libraryContent' },
        { id: 'image-application-areas', titleKey: 'docs.optimizationGuide.imageProcessing.applicationAreasTitle', contentKey: 'docs.optimizationGuide.imageProcessing.applicationAreasContent' },
        { id: 'image-key-technique', titleKey: 'docs.optimizationGuide.imageProcessing.keyTechniqueTitle', contentKey: 'docs.optimizationGuide.imageProcessing.keyTechniqueContent' },
        { id: 'image-implementation-steps', titleKey: 'docs.optimizationGuide.imageProcessing.implementationStepsTitle', subSections: [
            { id: 'install-sharp', titleKey: 'docs.optimizationGuide.imageProcessing.step1.title', contentKey: 'docs.optimizationGuide.imageProcessing.step1.content', codeExampleKey: 'docs.optimizationGuide.imageProcessing.step1.code' },
            { id: 'create-image-service', titleKey: 'docs.optimizationGuide.imageProcessing.step2.title', contentKey: 'docs.optimizationGuide.imageProcessing.step2.content', codeExampleKey: 'docs.optimizationGuide.imageProcessing.step2.code' },
            { id: 'integrate-file-upload', titleKey: 'docs.optimizationGuide.imageProcessing.step3.title', contentKey: 'docs.optimizationGuide.imageProcessing.step3.content', codeExampleKey: 'docs.optimizationGuide.imageProcessing.step3.code' },
            { id: 'async-kafka', titleKey: 'docs.optimizationGuide.imageProcessing.step4.title', contentKey: 'docs.optimizationGuide.imageProcessing.step4.content' },
        ]},
    ]},
    { id: 'db-optimization', titleKey: 'docs.optimizationGuide.dbOptimization.title', contentKey: 'docs.optimizationGuide.dbOptimization.intro', subSections: [
        { id: 'db-platform', titleKey: 'docs.optimizationGuide.dbOptimization.platformTitle', contentKey: 'docs.optimizationGuide.dbOptimization.platformContent' },
        { id: 'db-tool', titleKey: 'docs.optimizationGuide.dbOptimization.toolTitle', contentKey: 'docs.optimizationGuide.dbOptimization.toolContent' },
        { id: 'db-analysis-tool', titleKey: 'docs.optimizationGuide.dbOptimization.analysisToolTitle', contentKey: 'docs.optimizationGuide.dbOptimization.analysisToolContent' },
        { id: 'db-monitoring-tool', titleKey: 'docs.optimizationGuide.dbOptimization.monitoringToolTitle', contentKey: 'docs.optimizationGuide.dbOptimization.monitoringToolContent' },
        { id: 'indexing', titleKey: 'docs.optimizationGuide.dbOptimization.indexing.title', contentKey: 'docs.optimizationGuide.dbOptimization.indexing.intro', subSections: [
            { id: 'indexing-when', titleKey: 'docs.optimizationGuide.dbOptimization.indexing.whenTitle', contentKey: 'docs.optimizationGuide.dbOptimization.indexing.whenContent' },
            { id: 'indexing-application-areas', titleKey: 'docs.optimizationGuide.dbOptimization.indexing.applicationAreasTitle', contentKey: 'docs.optimizationGuide.dbOptimization.indexing.applicationAreasContent' },
            { id: 'indexing-prisma', titleKey: 'docs.optimizationGuide.dbOptimization.indexing.prismaTitle', contentKey: 'docs.optimizationGuide.dbOptimization.indexing.prismaContent', codeExampleKey: 'docs.optimizationGuide.dbOptimization.indexing.prismaCode' },
            { id: 'indexing-application', titleKey: 'docs.optimizationGuide.dbOptimization.indexing.applicationTitle', contentKey: 'docs.optimizationGuide.dbOptimization.indexing.applicationContent' },
        ]},
        { id: 'query-optimization', titleKey: 'docs.optimizationGuide.dbOptimization.queryOptimization.title', contentKey: 'docs.optimizationGuide.dbOptimization.queryOptimization.intro', subSections: [
            { id: 'select-fields', titleKey: 'docs.optimizationGuide.dbOptimization.queryOptimization.selectFieldsTitle', contentKey: 'docs.optimizationGuide.dbOptimization.queryOptimization.selectFieldsContent', codeExampleKey: 'docs.optimizationGuide.dbOptimization.queryOptimization.selectFieldsCode' },
            { id: 'n-plus-1', titleKey: 'docs.optimizationGuide.dbOptimization.queryOptimization.nPlus1Title', contentKey: 'docs.optimizationGuide.dbOptimization.queryOptimization.nPlus1Content', codeExampleKey: 'docs.optimizationGuide.dbOptimization.queryOptimization.nPlus1Code' },
            { id: 'pagination', titleKey: 'docs.optimizationGuide.dbOptimization.queryOptimization.paginationTitle', contentKey: 'docs.optimizationGuide.dbOptimization.queryOptimization.paginationContent', codeExampleKey: 'docs.optimizationGuide.dbOptimization.queryOptimization.paginationCode' },
        ]},
        { id: 'prisma-accelerate', titleKey: 'docs.optimizationGuide.dbOptimization.prismaAccelerate.title', contentKey: 'docs.optimizationGuide.dbOptimization.prismaAccelerate.intro', subSections: [
            { id: 'prisma-accelerate-when', titleKey: 'docs.optimizationGuide.dbOptimization.prismaAccelerate.whenTitle', contentKey: 'docs.optimizationGuide.dbOptimization.prismaAccelerate.whenContent' },
            { id: 'prisma-accelerate-implementation', titleKey: 'docs.optimizationGuide.dbOptimization.prismaAccelerate.implementationTitle', contentKey: 'docs.optimizationGuide.dbOptimization.prismaAccelerate.implementationContent' },
        ]},
        { id: 'materialized-views', titleKey: 'docs.optimizationGuide.dbOptimization.materializedViews.title', contentKey: 'docs.optimizationGuide.dbOptimization.materializedViews.intro', subSections: [
            { id: 'materialized-views-when', titleKey: 'docs.optimizationGuide.dbOptimization.materializedViews.whenTitle', contentKey: 'docs.optimizationGuide.dbOptimization.materializedViews.whenContent' },
            { id: 'materialized-views-application-areas', titleKey: 'docs.optimizationGuide.dbOptimization.materializedViews.applicationAreasTitle', contentKey: 'docs.optimizationGuide.dbOptimization.materializedViews.applicationAreasContent' },
            { id: 'materialized-views-implementation', titleKey: 'docs.optimizationGuide.dbOptimization.materializedViews.implementationTitle', contentKey: 'docs.optimizationGuide.dbOptimization.materializedViews.implementationContent', codeExampleKey: 'docs.optimizationGuide.dbOptimization.materializedViews.implementationCode' },
            { id: 'materialized-views-update', titleKey: 'docs.optimizationGuide.dbOptimization.materializedViews.updateTitle', contentKey: 'docs.optimizationGuide.dbOptimization.materializedViews.updateContent', codeExampleKey: 'docs.optimizationGuide.dbOptimization.materializedViews.updateCode' },
            { id: 'materialized-views-usage', titleKey: 'docs.optimizationGuide.dbOptimization.materializedViews.usageTitle', contentKey: 'docs.optimizationGuide.dbOptimization.materializedViews.usageContent', codeExampleKey: 'docs.optimizationGuide.dbOptimization.materializedViews.usageCode' },
        ]},
        { id: 'partitioning', titleKey: 'docs.optimizationGuide.dbOptimization.partitioning.title', contentKey: 'docs.optimizationGuide.dbOptimization.partitioning.intro', subSections: [
            { id: 'partitioning-when', titleKey: 'docs.optimizationGuide.dbOptimization.partitioning.whenTitle', contentKey: 'docs.optimizationGuide.dbOptimization.partitioning.whenContent' },
            { id: 'partitioning-application-areas', titleKey: 'docs.optimizationGuide.dbOptimization.partitioning.applicationAreasTitle', contentKey: 'docs.optimizationGuide.dbOptimization.partitioning.applicationAreasContent' },
            { id: 'partitioning-implementation', titleKey: 'docs.optimizationGuide.dbOptimization.partitioning.implementationTitle', contentKey: 'docs.optimizationGuide.dbOptimization.partitioning.implementationContent', codeExampleKey: 'docs.optimizationGuide.dbOptimization.partitioning.implementationCode' },
            { id: 'partitioning-advantages', titleKey: 'docs.optimizationGuide.dbOptimization.partitioning.advantagesTitle', contentKey: 'docs.optimizationGuide.dbOptimization.partitioning.advantagesContent' },
            { id: 'partitioning-prisma-relation', titleKey: 'docs.optimizationGuide.dbOptimization.partitioning.prismaRelationTitle', contentKey: 'docs.optimizationGuide.dbOptimization.partitioning.prismaRelationContent' },
        ]},
    ]},
    { id: 'graphql-optimization', titleKey: 'docs.optimizationGuide.graphqlOptimization.title', contentKey: 'docs.optimizationGuide.graphqlOptimization.intro', subSections: [
        { id: 'graphql-analysis-tool', titleKey: 'docs.optimizationGuide.graphqlOptimization.analysisToolTitle', contentKey: 'docs.optimizationGuide.graphqlOptimization.analysisToolContent' },
        { id: 'dataloader', titleKey: 'docs.optimizationGuide.graphqlOptimization.dataloader.title', contentKey: 'docs.optimizationGuide.graphqlOptimization.dataloader.intro', subSections: [
            { id: 'dataloader-when', titleKey: 'docs.optimizationGuide.graphqlOptimization.dataloader.whenTitle', contentKey: 'docs.optimizationGuide.graphqlOptimization.dataloader.whenContent' },
            { id: 'dataloader-application-areas', titleKey: 'docs.optimizationGuide.graphqlOptimization.dataloader.applicationAreasTitle', contentKey: 'docs.optimizationGuide.graphqlOptimization.dataloader.applicationAreasContent' },
            { id: 'dataloader-implementation', titleKey: 'docs.optimizationGuide.graphqlOptimization.dataloader.implementationTitle', contentKey: 'docs.optimizationGuide.graphqlOptimization.dataloader.implementationContent', codeExampleKey: 'docs.optimizationGuide.graphqlOptimization.dataloader.implementationCode' },
            { id: 'dataloader-usage', titleKey: 'docs.optimizationGuide.graphqlOptimization.dataloader.usageTitle', contentKey: 'docs.optimizationGuide.graphqlOptimization.dataloader.usageContent', codeExampleKey: 'docs.optimizationGuide.graphqlOptimization.dataloader.usageCode' },
        ]},
        { id: 'query-complexity-analysis', titleKey: 'docs.optimizationGuide.graphqlOptimization.queryComplexityAnalysis.title', contentKey: 'docs.optimizationGuide.graphqlOptimization.queryComplexityAnalysis.intro', subSections: [
            { id: 'query-complexity-tool', titleKey: 'docs.optimizationGuide.graphqlOptimization.queryComplexityAnalysis.toolTitle', contentKey: 'docs.optimizationGuide.graphqlOptimization.queryComplexityAnalysis.toolContent' },
            { id: 'query-complexity-when', titleKey: 'docs.optimizationGuide.graphqlOptimization.queryComplexityAnalysis.whenTitle', contentKey: 'docs.optimizationGuide.graphqlOptimization.queryComplexityAnalysis.whenContent' },
            { id: 'query-complexity-principle', titleKey: 'docs.optimizationGuide.graphqlOptimization.queryComplexityAnalysis.principleTitle', contentKey: 'docs.optimizationGuide.graphqlOptimization.queryComplexityAnalysis.principleContent' },
            { id: 'query-complexity-implementation', titleKey: 'docs.optimizationGuide.graphqlOptimization.queryComplexityAnalysis.implementationTitle', contentKey: 'docs.optimizationGuide.graphqlOptimization.queryComplexityAnalysis.implementationContent' },
        ]},
        { id: 'persisted-queries', titleKey: 'docs.optimizationGuide.graphqlOptimization.persistedQueries.title', contentKey: 'docs.optimizationGuide.graphqlOptimization.persistedQueries.intro', subSections: [
            { id: 'persisted-queries-why', titleKey: 'docs.optimizationGuide.graphqlOptimization.persistedQueries.whyTitle', contentKey: 'docs.optimizationGuide.graphqlOptimization.persistedQueries.whyContent' },
            { id: 'persisted-queries-when', titleKey: 'docs.optimizationGuide.graphqlOptimization.persistedQueries.whenTitle', contentKey: 'docs.optimizationGuide.graphqlOptimization.persistedQueries.whenContent' },
            { id: 'persisted-queries-implementation', titleKey: 'docs.optimizationGuide.graphqlOptimization.persistedQueries.implementationTitle', contentKey: 'docs.optimizationGuide.graphqlOptimization.persistedQueries.implementationContent' },
        ]},
    ]},
    { id: 'backend-logic-optimization', titleKey: 'docs.optimizationGuide.backendLogicOptimization.title', contentKey: 'docs.optimizationGuide.backendLogicOptimization.intro', subSections: [
        { id: 'backend-tools', titleKey: 'docs.optimizationGuide.backendLogicOptimization.toolsTitle', contentKey: 'docs.optimizationGuide.backendLogicOptimization.toolsContent' },
        { id: 'backend-when', titleKey: 'docs.optimizationGuide.backendLogicOptimization.whenTitle', contentKey: 'docs.optimizationGuide.backendLogicOptimization.whenContent' },
        { id: 'backend-process', titleKey: 'docs.optimizationGuide.backendLogicOptimization.processTitle', contentKey: 'docs.optimizationGuide.backendLogicOptimization.processContent' },
        { id: 'backend-recommendations', titleKey: 'docs.optimizationGuide.backendLogicOptimization.recommendationsTitle', contentKey: 'docs.optimizationGuide.backendLogicOptimization.recommendationsContent' },
    ]},
    { id: 'caching', titleKey: 'docs.optimizationGuide.caching.title', contentKey: 'docs.optimizationGuide.caching.intro', subSections: [
        { id: 'caching-library', titleKey: 'docs.optimizationGuide.caching.libraryTitle', contentKey: 'docs.optimizationGuide.caching.libraryContent' },
        { id: 'caching-pattern', titleKey: 'docs.optimizationGuide.caching.patternTitle', contentKey: 'docs.optimizationGuide.caching.patternContent' },
        { id: 'caching-application-areas', titleKey: 'docs.optimizationGuide.caching.applicationAreasTitle', contentKey: 'docs.optimizationGuide.caching.applicationAreasContent' },
        { id: 'caching-implementation', titleKey: 'docs.optimizationGuide.caching.implementationTitle', contentKey: 'docs.optimizationGuide.caching.implementationContent' },
        { id: 'caching-invalidation', titleKey: 'docs.optimizationGuide.caching.invalidationTitle', contentKey: 'docs.optimizationGuide.caching.invalidationContent' },
    ]},
    { id: 'async-processing', titleKey: 'docs.optimizationGuide.asyncProcessing.title', contentKey: 'docs.optimizationGuide.asyncProcessing.intro', subSections: [
        { id: 'async-library', titleKey: 'docs.optimizationGuide.asyncProcessing.libraryTitle', contentKey: 'docs.optimizationGuide.asyncProcessing.libraryContent' },
        { id: 'async-why', titleKey: 'docs.optimizationGuide.asyncProcessing.whyTitle', contentKey: 'docs.optimizationGuide.asyncProcessing.whyContent' },
        { id: 'async-application-areas', titleKey: 'docs.optimizationGuide.asyncProcessing.applicationAreasTitle', listKey: 'docs.optimizationGuide.asyncProcessing.applicationAreasContent' },
        { id: 'async-pattern', titleKey: 'docs.optimizationGuide.asyncProcessing.patternTitle', contentKey: 'docs.optimizationGuide.asyncProcessing.patternContent' },
        { id: 'async-partitioning', titleKey: 'docs.optimizationGuide.asyncProcessing.partitioningTitle', contentKey: 'docs.optimizationGuide.asyncProcessing.partitioningContent' },
        { id: 'async-monitoring', titleKey: 'docs.optimizationGuide.asyncProcessing.monitoringTitle', contentKey: 'docs.optimizationGuide.asyncProcessing.monitoringContent' },
    ]},
    { id: 'push-notifications-optimization', titleKey: 'docs.optimizationGuide.pushNotificationsOptimization.title', contentKey: 'docs.optimizationGuide.pushNotificationsOptimization.intro', subSections: [
        { id: 'push-platform', titleKey: 'docs.optimizationGuide.pushNotificationsOptimization.platformTitle', contentKey: 'docs.optimizationGuide.pushNotificationsOptimization.platformContent' },
        { id: 'push-techniques', titleKey: 'docs.optimizationGuide.pushNotificationsOptimization.techniquesTitle', listKey: 'docs.optimizationGuide.pushNotificationsOptimization.techniquesContent' },
    ]},
    { id: 'client-api-db-interaction', titleKey: 'docs.optimizationGuide.clientApiDbInteraction.title', contentKey: 'docs.optimizationGuide.clientApiDbInteraction.intro', subSections: [
        { id: 'client-level', titleKey: 'docs.optimizationGuide.clientApiDbInteraction.clientLevelTitle', contentKey: 'docs.optimizationGuide.clientApiDbInteraction.clientLevelContent' },
        { id: 'network-level', titleKey: 'docs.optimizationGuide.clientApiDbInteraction.networkLevelTitle', contentKey: 'docs.optimizationGuide.clientApiDbInteraction.networkLevelContent' },
        { id: 'backend-level', titleKey: 'docs.optimizationGuide.clientApiDbInteraction.backendLevelTitle', contentKey: 'docs.optimizationGuide.clientApiDbInteraction.backendLevelContent' },
    ]},
    { id: 'authentication-optimization', titleKey: 'docs.optimizationGuide.authenticationOptimization.title', contentKey: 'docs.optimizationGuide.authenticationOptimization.intro', subSections: [
        { id: 'stateless-jwt', titleKey: 'docs.optimizationGuide.authenticationOptimization.statelessJwtTitle', contentKey: 'docs.optimizationGuide.authenticationOptimization.statelessJwtContent' },
        { id: 'rate-limiting', titleKey: 'docs.optimizationGuide.authenticationOptimization.rateLimitingTitle', contentKey: 'docs.optimizationGuide.authenticationOptimization.rateLimitingContent' },
        { id: 'secure-headers', titleKey: 'docs.optimizationGuide.authenticationOptimization.secureHeadersTitle', contentKey: 'docs.optimizationGuide.authenticationOptimization.secureHeadersContent' },
    ]},
    { id: 'chat-websocket-optimization', titleKey: 'docs.optimizationGuide.chatWebSocketOptimization.title', contentKey: 'docs.optimizationGuide.chatWebSocketOptimization.intro', subSections: [
        { id: 'chat-library', titleKey: 'docs.optimizationGuide.chatWebSocketOptimization.libraryTitle', contentKey: 'docs.optimizationGuide.chatWebSocketOptimization.libraryContent' },
        { id: 'chat-techniques', titleKey: 'docs.optimizationGuide.chatWebSocketOptimization.techniquesTitle', listKey: 'docs.optimizationGuide.chatWebSocketOptimization.techniquesContent' },
    ]},
    { id: 'animations-optimization', titleKey: 'docs.optimizationGuide.animationsOptimization.title', contentKey: 'docs.optimizationGuide.animationsOptimization.intro', subSections: [
        { id: 'mobile-desktop-animations', titleKey: 'docs.optimizationGuide.animationsOptimization.mobileDesktopTitle', contentKey: 'docs.optimizationGuide.animationsOptimization.mobileDesktopContent' },
        { id: 'web-animations', titleKey: 'docs.optimizationGuide.animationsOptimization.webTitle', contentKey: 'docs.optimizationGuide.animationsOptimization.webContent' },
        { id: 'doc-design-animations', titleKey: 'docs.optimizationGuide.animationsOptimization.docDesignTitle', contentKey: 'docs.optimizationGuide.animationsOptimization.docDesignContent' },
    ]},
    { id: 'monitoring', titleKey: 'docs.optimizationGuide.monitoring.title', contentKey: 'docs.optimizationGuide.monitoring.intro', subSections: [
        { id: 'monitoring-tools', titleKey: 'docs.optimizationGuide.monitoring.toolsTitle', contentKey: 'docs.optimizationGuide.monitoring.toolsContent' },
        { id: 'monitoring-when', titleKey: 'docs.optimizationGuide.monitoring.whenTitle', contentKey: 'docs.optimizationGuide.monitoring.whenContent' },
        { id: 'monitoring-implementation', titleKey: 'docs.optimizationGuide.monitoring.implementationTitle', contentKey: 'docs.optimizationGuide.monitoring.implementationContent' },
        { id: 'monitoring-principle', titleKey: 'docs.optimizationGuide.monitoring.principleTitle', contentKey: 'docs.optimizationGuide.monitoring.principleContent' },
    ]},
    { id: 'ci-cd-optimization', titleKey: 'docs.optimizationGuide.ciCdOptimization.title', contentKey: 'docs.optimizationGuide.ciCdOptimization.intro', subSections: [
        { id: 'ci-cd-tools', titleKey: 'docs.optimizationGuide.ciCdOptimization.toolsTitle', contentKey: 'docs.optimizationGuide.ciCdOptimization.toolsContent' },
        { id: 'ci-cd-techniques', titleKey: 'docs.optimizationGuide.ciCdOptimization.techniquesTitle', listKey: 'docs.optimizationGuide.ciCdOptimization.techniquesContent' },
    ]},
    { id: 'frontend-optimization', titleKey: 'docs.optimizationGuide.frontendOptimization.title', contentKey: 'docs.optimizationGuide.frontendOptimization.intro', subSections: [
        { id: 'web-techniques', titleKey: 'docs.optimizationGuide.frontendOptimization.webTechniquesTitle', listKey: 'docs.optimizationGuide.frontendOptimization.webTechniquesContent' },
        { id: 'react-native-techniques', titleKey: 'docs.optimizationGuide.frontendOptimization.reactNativeTechniquesTitle', listKey: 'docs.optimizationGuide.frontendOptimization.reactNativeTechniquesContent' },
        { id: 'general-techniques', titleKey: 'docs.optimizationGuide.frontendOptimization.generalTechniquesTitle', listKey: 'docs.optimizationGuide.frontendOptimization.generalTechniquesContent' },
    ]},
    { id: 'db-scaling', titleKey: 'docs.optimizationGuide.dbScaling.title', contentKey: 'docs.optimizationGuide.dbScaling.intro', subSections: [
        { id: 'replication', titleKey: 'docs.optimizationGuide.dbScaling.replicationTitle', contentKey: 'docs.optimizationGuide.dbScaling.replicationContent' },
        { id: 'sharding', titleKey: 'docs.optimizationGuide.dbScaling.shardingTitle', contentKey: 'docs.optimizationGuide.dbScaling.shardingContent' },
        { id: 'when-to-apply', titleKey: 'docs.optimizationGuide.dbScaling.whenToApplyTitle', contentKey: 'docs.optimizationGuide.dbScaling.whenToApplyContent' },
    ]},
    { id: 'notes', titleKey: 'docs.optimizationGuide.notes.title', subSections: [
        { id: 'prioritization', titleKey: 'docs.optimizationGuide.notes.prioritizationTitle', contentKey: 'docs.optimizationGuide.notes.prioritizationContent' },
        { id: 'automation', titleKey: 'docs.optimizationGuide.notes.automationTitle', contentKey: 'docs.optimizationGuide.notes.automationContent' },
        { id: 'documentation-notes', titleKey: 'docs.optimizationGuide.notes.documentationNotesTitle', contentKey: 'docs.optimizationGuide.notes.documentationNotesContent' },
        { id: 'culture', titleKey: 'docs.optimizationGuide.notes.cultureTitle', contentKey: 'docs.optimizationGuide.notes.cultureContent' },
    ]},
  ];

  const integrationsGuideSections = [
    { id: 'integrations-intro', titleKey: 'docs.integrationsGuide.introduction.title', contentKey: 'docs.integrationsGuide.introduction.description', subSections: [
        { id: 'integrations-intro-principles', titleKey: 'docs.integrationsGuide.introduction.principlesTitle', listKey: 'docs.integrationsGuide.introduction.principles' },
    ]},
    { id: 'integrations-overview', titleKey: 'docs.integrationsGuide.overview.title', tableKey: 'docs.integrationsGuide.overview.table' },
    { id: 'neon-integration', titleKey: 'docs.integrationsGuide.neonIntegration.title', subSections: [
        { id: 'neon-general-info', titleKey: 'docs.integrationsGuide.neonIntegration.generalInfo.title', contentKey: 'docs.integrationsGuide.neonIntegration.generalInfo.description', listKey: 'docs.integrationsGuide.neonIntegration.generalInfo.advantages', additionalContentKeys: ['docs.integrationsGuide.neonIntegration.generalInfo.role'] },
        { id: 'neon-configuration', titleKey: 'docs.integrationsGuide.neonIntegration.configuration.title', listKey: 'docs.integrationsGuide.neonIntegration.configuration.steps', codeExampleKey: 'docs.integrationsGuide.neonIntegration.configuration.envExample', additionalContentKeys: ['docs.integrationsGuide.neonIntegration.configuration.note1'], codeExampleKey2: 'docs.integrationsGuide.neonIntegration.configuration.backendCode' },
        { id: 'neon-interaction-scenarios', titleKey: 'docs.integrationsGuide.neonIntegration.interactionScenarios.title', subSections: [
            { id: 'neon-scenario-signup', titleKey: 'docs.integrationsGuide.neonIntegration.interactionScenarios.signup.title', contentKey: 'docs.integrationsGuide.neonIntegration.interactionScenarios.signup.interaction', codeExampleKey: 'docs.integrationsGuide.neonIntegration.interactionScenarios.signup.code', additionalContentKeys: ['docs.integrationsGuide.neonIntegration.interactionScenarios.signup.result'] },
            { id: 'neon-scenario-get-chats', titleKey: 'docs.integrationsGuide.neonIntegration.interactionScenarios.getChats.title', contentKey: 'docs.integrationsGuide.neonIntegration.interactionScenarios.getChats.interaction', codeExampleKey: 'docs.integrationsGuide.neonIntegration.interactionScenarios.getChats.code' },
            { id: 'neon-scenario-save-message', titleKey: 'docs.integrationsGuide.neonIntegration.interactionScenarios.saveMessage.title', contentKey: 'docs.integrationsGuide.neonIntegration.interactionScenarios.saveMessage.interaction', codeExampleKey: 'docs.integrationsGuide.neonIntegration.interactionScenarios.saveMessage.code' },
        ]},
        { id: 'neon-error-handling', titleKey: 'docs.integrationsGuide.neonIntegration.errorHandling.title', subSections: [
            { id: 'neon-error-connection', titleKey: 'docs.integrationsGuide.neonIntegration.errorHandling.connectionError.title', contentKey: 'docs.integrationsGuide.neonIntegration.errorHandling.connectionError.cause', additionalContentKeys: ['docs.integrationsGuide.neonIntegration.errorHandling.connectionError.solution'] },
            { id: 'neon-error-query', titleKey: 'docs.integrationsGuide.neonIntegration.errorHandling.queryError.title', contentKey: 'docs.integrationsGuide.neonIntegration.errorHandling.queryError.cause', additionalContentKeys: ['docs.integrationsGuide.neonIntegration.errorHandling.queryError.solution'] },
            { id: 'neon-error-rate-limit', titleKey: 'docs.integrationsGuide.neonIntegration.errorHandling.rateLimitError.title', contentKey: 'docs.integrationsGuide.neonIntegration.errorHandling.rateLimitError.cause', additionalContentKeys: ['docs.integrationsGuide.neonIntegration.errorHandling.rateLimitError.solution'] },
        ]},
    ]},
    { id: 'r2-integration', titleKey: 'docs.integrationsGuide.r2Integration.title', subSections: [
        { id: 'r2-general-info', titleKey: 'docs.integrationsGuide.r2Integration.generalInfo.title', contentKey: 'docs.integrationsGuide.r2Integration.generalInfo.description', listKey: 'docs.integrationsGuide.r2Integration.generalInfo.advantages', additionalContentKeys: ['docs.integrationsGuide.r2Integration.generalInfo.role'] },
        { id: 'r2-configuration', titleKey: 'docs.integrationsGuide.r2Integration.configuration.title', listKey: 'docs.integrationsGuide.r2Integration.configuration.steps', codeExampleKey: 'docs.integrationsGuide.r2Integration.configuration.envExample', additionalContentKeys: ['docs.integrationsGuide.r2Integration.configuration.note'], codeExampleKey2: 'docs.integrationsGuide.r2Integration.configuration.backendCode' },
        { id: 'r2-interaction-scenarios', titleKey: 'docs.integrationsGuide.r2Integration.interactionScenarios.title', subSections: [
            { id: 'r2-scenario-upload', titleKey: 'docs.integrationsGuide.r2Integration.interactionScenarios.uploadFile.title', contentKey: 'docs.integrationsGuide.r2Integration.interactionScenarios.uploadFile.interaction', codeExampleKey: 'docs.integrationsGuide.r2Integration.interactionScenarios.uploadFile.code', additionalContentKeys: ['docs.integrationsGuide.r2Integration.interactionScenarios.uploadFile.result'] },
            { id: 'r2-scenario-sensitive-data', titleKey: 'docs.integrationsGuide.r2Integration.interactionScenarios.sensitiveData.title', contentKey: 'docs.integrationsGuide.r2Integration.interactionScenarios.sensitiveData.interaction', codeExampleKey: 'docs.integrationsGuide.r2Integration.interactionScenarios.sensitiveData.code', additionalContentKeys: ['docs.integrationsGuide.r2Integration.interactionScenarios.sensitiveData.result'] },
            { id: 'r2-scenario-get-file', titleKey: 'docs.integrationsGuide.r2Integration.interactionScenarios.getFile.title', contentKey: 'docs.integrationsGuide.r2Integration.interactionScenarios.getFile.interaction', codeExampleKey: 'docs.integrationsGuide.r2Integration.interactionScenarios.getFile.code' },
        ]},
        { id: 'r2-error-handling', titleKey: 'docs.integrationsGuide.r2Integration.errorHandling.title', subSections: [
            { id: 'r2-error-forbidden', titleKey: 'docs.integrationsGuide.r2Integration.errorHandling.forbidden.title', contentKey: 'docs.integrationsGuide.r2Integration.errorHandling.forbidden.cause', additionalContentKeys: ['docs.integrationsGuide.r2Integration.errorHandling.forbidden.solution'] },
            { id: 'r2-error-not-found', titleKey: 'docs.integrationsGuide.r2Integration.errorHandling.notFound.title', contentKey: 'docs.integrationsGuide.r2Integration.errorHandling.notFound.cause', additionalContentKeys: ['docs.integrationsGuide.r2Integration.errorHandling.notFound.solution'] },
            { id: 'r2-error-too-many-requests', titleKey: 'docs.integrationsGuide.r2Integration.errorHandling.tooManyRequests.title', contentKey: 'docs.integrationsGuide.r2Integration.errorHandling.tooManyRequests.cause', additionalContentKeys: ['docs.integrationsGuide.r2Integration.errorHandling.tooManyRequests.solution'] },
            { id: 'r2-error-encryption', titleKey: 'docs.integrationsGuide.r2Integration.errorHandling.encryptionError.title', contentKey: 'docs.integrationsGuide.r2Integration.errorHandling.encryptionError.cause', additionalContentKeys: ['docs.integrationsGuide.r2Integration.errorHandling.encryptionError.solution'] },
        ]},
    ]},
    { id: 'neon-r2-interaction', titleKey: 'docs.integrationsGuide.neonR2Interaction.title', contentKey: 'docs.integrationsGuide.neonR2Interaction.description', listKey: 'docs.integrationsGuide.neonR2Interaction.scenario', additionalContentKeys: ['docs.integrationsGuide.neonR2Interaction.advantagesTitle', 'docs.integrationsGuide.neonR2Interaction.advantages'] },
    { id: 'other-integrations', titleKey: 'docs.integrationsGuide.otherIntegrations.title', contentKey: 'docs.integrationsGuide.otherIntegrations.description', subSections: [
        { id: 'firebase-integration', titleKey: 'docs.integrationsGuide.otherIntegrations.firebase.title', contentKey: 'docs.integrationsGuide.otherIntegrations.firebase.purpose', additionalContentKeys: ['docs.integrationsGuide.otherIntegrations.firebase.role', 'docs.integrationsGuide.otherIntegrations.firebase.configuration', 'docs.integrationsGuide.otherIntegrations.firebase.example'] },
        { id: 'stripe-integration', titleKey: 'docs.integrationsGuide.otherIntegrations.stripe.title', contentKey: 'docs.integrationsGuide.otherIntegrations.stripe.purpose', additionalContentKeys: ['docs.integrationsGuide.otherIntegrations.stripe.role', 'docs.integrationsGuide.otherIntegrations.stripe.configuration', 'docs.integrationsGuide.otherIntegrations.stripe.example'] },
        { id: 'gmail-api-integration', titleKey: 'docs.integrationsGuide.otherIntegrations.gmailApi.title', contentKey: 'docs.integrationsGuide.otherIntegrations.gmailApi.purpose', additionalContentKeys: ['docs.integrationsGuide.otherIntegrations.gmailApi.role', 'docs.integrationsGuide.otherIntegrations.gmailApi.configuration', 'docs.integrationsGuide.otherIntegrations.gmailApi.example'] },
    ]},
    { id: 'integrations-recommendations', titleKey: 'docs.integrationsGuide.recommendations.title', contentKey: 'docs.integrationsGuide.recommendations.intro', subSections: [
        { id: 'integrations-recommendations-security', titleKey: 'docs.integrationsGuide.recommendations.security.title', listKey: 'docs.integrationsGuide.recommendations.security.points' },
        { id: 'integrations-recommendations-scaling', titleKey: 'docs.integrationsGuide.recommendations.scaling.title', listKey: 'docs.integrationsGuide.recommendations.scaling.points' },
        { id: 'integrations-recommendations-monitoring', titleKey: 'docs.integrationsGuide.recommendations.monitoring.title', listKey: 'docs.integrationsGuide.recommendations.monitoring.points' },
        { id: 'integrations-recommendations-error-handling', titleKey: 'docs.integrationsGuide.recommendations.errorHandling.title', listKey: 'docs.integrationsGuide.recommendations.errorHandling.points' },
        { id: 'integrations-recommendations-documentation', titleKey: 'docs.integrationsGuide.recommendations.documentation.title', contentKey: 'docs.integrationsGuide.recommendations.documentation.content' },
    ]},
  ];

  const technicalDocsSections = [
    {
      id: 'general-info',
      titleKey: 'docs.technicalDocs.generalInfo.title',
      contentKey: 'docs.technicalDocs.generalInfo.description',
      subSections: [
        { id: 'project-name', titleKey: 'docs.technicalDocs.generalInfo.projectNameTitle', contentKey: 'docs.technicalDocs.generalInfo.projectNameContent' },
        { id: 'purpose', titleKey: 'docs.technicalDocs.generalInfo.purposeTitle', contentKey: 'docs.technicalDocs.generalInfo.purposeContent' },
        { id: 'principles', titleKey: 'docs.technicalDocs.generalInfo.principlesTitle', listKey: 'docs.technicalDocs.generalInfo.principlesList' },
      ],
    },
    {
      id: 'tech-stack',
      titleKey: 'docs.technicalDocs.techStack.title',
      contentKey: 'docs.technicalDocs.techStack.description',
      subSections: [
        { id: 'frontend', titleKey: 'docs.technicalDocs.techStack.frontend.title', listKey: 'docs.technicalDocs.techStack.frontend.list' },
        { id: 'backend', titleKey: 'docs.technicalDocs.techStack.backend.title', listKey: 'docs.technicalDocs.techStack.backend.list' },
        { id: 'database-caching', titleKey: 'docs.technicalDocs.techStack.databaseCaching.title', listKey: 'docs.technicalDocs.techStack.databaseCaching.list' },
        { id: 'file-storage', titleKey: 'docs.technicalDocs.techStack.fileStorage.title', listKey: 'docs.technicalDocs.techStack.fileStorage.list' },
        { id: 'async-processing', titleKey: 'docs.technicalDocs.techStack.asyncProcessing.title', listKey: 'docs.technicalDocs.techStack.asyncProcessing.list' },
        { id: 'infrastructure-deployment', titleKey: 'docs.technicalDocs.techStack.infrastructureDeployment.title', listKey: 'docs.technicalDocs.techStack.infrastructureDeployment.list' },
        { id: 'testing-monitoring-logging', titleKey: 'docs.technicalDocs.techStack.testingMonitoringLogging.title', listKey: 'docs.technicalDocs.techStack.testingMonitoringLogging.list' },
      ],
    },
    {
      id: 'architecture',
      titleKey: 'docs.technicalDocs.architecture.title',
      contentKey: 'docs.technicalDocs.architecture.description',
      subSections: [
        { id: 'client-applications', titleKey: 'docs.technicalDocs.architecture.clientApplications.title', listKey: 'docs.technicalDocs.architecture.clientApplications.list' },
        { id: 'api-gateway', titleKey: 'docs.technicalDocs.architecture.apiGateway.title', contentKey: 'docs.technicalDocs.architecture.apiGateway.content' },
        { id: 'backend-service', titleKey: 'docs.technicalDocs.architecture.backendService.title', listKey: 'docs.technicalDocs.architecture.backendService.list' },
        { id: 'database', titleKey: 'docs.technicalDocs.architecture.database.title', contentKey: 'docs.technicalDocs.architecture.database.content' },
        { id: 'file-storage-arch', titleKey: 'docs.technicalDocs.architecture.fileStorage.title', contentKey: 'docs.technicalDocs.architecture.fileStorage.content' },
        { id: 'caching-arch', titleKey: 'docs.technicalDocs.architecture.caching.title', contentKey: 'docs.technicalDocs.architecture.caching.content' },
        { id: 'message-queue', titleKey: 'docs.technicalDocs.architecture.messageQueue.title', contentKey: 'docs.technicalDocs.architecture.messageQueue.content' },
        { id: 'workers', titleKey: 'docs.technicalDocs.architecture.workers.title', listKey: 'docs.technicalDocs.architecture.workers.list' },
        { id: 'external-services', titleKey: 'docs.technicalDocs.architecture.externalServices.title', listKey: 'docs.technicalDocs.architecture.externalServices.list' },
        { id: 'mermaid-diagram', titleKey: 'docs.technicalDocs.architecture.mermaidDiagram.title', codeExampleKey: 'docs.technicalDocs.architecture.mermaidDiagram.code' },
      ],
    },
    {
      id: 'api',
      titleKey: 'docs.technicalDocs.api.title',
      contentKey: 'docs.technicalDocs.api.description',
      subSections: [
        { id: 'endpoint', titleKey: 'docs.technicalDocs.api.endpointTitle', contentKey: 'docs.technicalDocs.api.endpointContent' },
        { id: 'structure', titleKey: 'docs.technicalDocs.api.structureTitle', contentKey: 'docs.technicalDocs.api.structureContent' },
        { id: 'authentication', titleKey: 'docs.technicalDocs.api.authenticationTitle', contentKey: 'docs.technicalDocs.api.authenticationContent' },
        { id: 'external-api-integrations', titleKey: 'docs.technicalDocs.api.externalApiIntegrationsTitle', contentKey: 'docs.technicalDocs.api.externalApiIntegrationsContent' },
        { id: 'key-functional-areas', titleKey: 'docs.technicalDocs.api.keyFunctionalAreas.title', listKey: 'docs.technicalDocs.api.keyFunctionalAreas.list' },
        { id: 'detailed-spec', titleKey: 'docs.technicalDocs.api.detailedSpecTitle', contentKey: 'docs.technicalDocs.api.detailedSpecContent' },
      ],
    },
    {
      id: 'database',
      titleKey: 'docs.technicalDocs.database.title',
      contentKey: 'docs.technicalDocs.database.description',
      subSections: [
        { id: 'technology', titleKey: 'docs.technicalDocs.database.technologyTitle', contentKey: 'docs.technicalDocs.database.technologyContent' },
        { id: 'hosting', titleKey: 'docs.technicalDocs.database.hostingTitle', contentKey: 'docs.technicalDocs.database.hostingContent' },
        { id: 'role', titleKey: 'docs.technicalDocs.database.roleTitle', contentKey: 'docs.technicalDocs.database.roleContent' },
        { id: 'key-tables', titleKey: 'docs.technicalDocs.database.keyTables.title', listKey: 'docs.technicalDocs.database.keyTables.list' },
        { id: 'interaction', titleKey: 'docs.technicalDocs.database.interactionTitle', contentKey: 'docs.technicalDocs.database.interactionContent' },
        { id: 'optimization-scaling', titleKey: 'docs.technicalDocs.database.optimizationScalingTitle', contentKey: 'docs.technicalDocs.database.optimizationScalingContent' },
      ],
    },
    {
      id: 'file-storage',
      titleKey: 'docs.technicalDocs.fileStorage.title',
      contentKey: 'docs.technicalDocs.fileStorage.description',
      subSections: [
        { id: 'technology-fs', titleKey: 'docs.technicalDocs.fileStorage.technologyTitle', contentKey: 'docs.technicalDocs.fileStorage.technologyContent' },
        { id: 'hosting-fs', titleKey: 'docs.technicalDocs.fileStorage.hostingTitle', contentKey: 'docs.technicalDocs.fileStorage.hostingContent' },
        { id: 'role-fs', titleKey: 'docs.technicalDocs.fileStorage.roleTitle', contentKey: 'docs.technicalDocs.fileStorage.roleContent' },
        { id: 'interaction-fs', titleKey: 'docs.technicalDocs.fileStorage.interactionTitle', contentKey: 'docs.technicalDocs.fileStorage.interactionContent' },
        { id: 'structure-fs', titleKey: 'docs.technicalDocs.fileStorage.structureTitle', contentKey: 'docs.technicalDocs.fileStorage.structureContent' },
        { id: 'security-fs', titleKey: 'docs.technicalDocs.fileStorage.securityTitle', contentKey: 'docs.technicalDocs.fileStorage.securityContent' },
      ],
    },
    {
      id: 'project-structure',
      titleKey: 'docs.technicalDocs.projectStructure.title',
      contentKey: 'docs.technicalDocs.projectStructure.description',
      subSections: [
        { id: 'purpose', titleKey: 'docs.technicalDocs.projectStructure.purposeTitle', contentKey: 'docs.technicalDocs.projectStructure.purposeContent' },
        { id: 'packages', titleKey: 'docs.technicalDocs.projectStructure.packages.title', listKey: 'docs.technicalDocs.projectStructure.packages.list' },
        { id: 'detailed-description', titleKey: 'docs.technicalDocs.projectStructure.detailedDescriptionTitle', contentKey: 'docs.technicalDocs.projectStructure.detailedDescriptionContent' },
      ],
    },
    {
      id: 'security',
      titleKey: 'docs.technicalDocs.security.title',
      contentKey: 'docs.technicalDocs.security.description',
      subSections: [
        { id: 'authentication-sec', titleKey: 'docs.technicalDocs.security.authenticationTitle', contentKey: 'docs.technicalDocs.security.authenticationContent' },
        { id: 'authorization-sec', titleKey: 'docs.technicalDocs.security.authorizationTitle', contentKey: 'docs.technicalDocs.security.authorizationContent' },
        { id: 'encryption-sec', titleKey: 'docs.technicalDocs.security.encryptionTitle', contentKey: 'docs.technicalDocs.security.encryptionContent' },
        { id: 'validation-sec', titleKey: 'docs.technicalDocs.security.validationTitle', contentKey: 'docs.technicalDocs.security.validationContent' },
        { id: 'attack-protection', titleKey: 'docs.technicalDocs.security.attackProtectionTitle', contentKey: 'docs.technicalDocs.security.attackProtectionContent' },
        { id: 'principle-sec', titleKey: 'docs.technicalDocs.security.principleTitle', contentKey: 'docs.technicalDocs.security.principleContent' },
      ],
    },
    {
      id: 'deployment',
      titleKey: 'docs.technicalDocs.deployment.title',
      contentKey: 'docs.technicalDocs.deployment.description',
      subSections: [
        { id: 'containerization', titleKey: 'docs.technicalDocs.deployment.containerizationTitle', contentKey: 'docs.technicalDocs.deployment.containerizationContent' },
        { id: 'orchestration', titleKey: 'docs.technicalDocs.deployment.orchestrationTitle', contentKey: 'docs.technicalDocs.deployment.orchestrationContent' },
        { id: 'iac', titleKey: 'docs.technicalDocs.deployment.iacTitle', contentKey: 'docs.technicalDocs.deployment.iacContent' },
        { id: 'ci-cd', titleKey: 'docs.technicalDocs.deployment.ciCdTitle', contentKey: 'docs.technicalDocs.deployment.ciCdContent' },
        { id: 'web-app-deployment', titleKey: 'docs.technicalDocs.deployment.webAppDeploymentTitle', contentKey: 'docs.technicalDocs.deployment.webAppDeploymentContent' },
        { id: 'detailed-description-deploy', titleKey: 'docs.technicalDocs.deployment.detailedDescriptionTitle', listKey: 'docs.technicalDocs.deployment.detailedDescriptionList' },
      ],
    },
    {
      id: 'monitoring-logging',
      titleKey: 'docs.technicalDocs.monitoringLogging.title',
      contentKey: 'docs.technicalDocs.monitoringLogging.description',
      subSections: [
        { id: 'monitoring-ml', titleKey: 'docs.technicalDocs.monitoringLogging.monitoringTitle', listKey: 'docs.technicalDocs.monitoringLogging.monitoringList' },
        { id: 'logging-ml', titleKey: 'docs.technicalDocs.monitoringLogging.loggingTitle', listKey: 'docs.technicalDocs.monitoringLogging.loggingList' },
        { id: 'detailed-description-ml', titleKey: 'docs.technicalDocs.monitoringLogging.detailedDescriptionTitle', listKey: 'docs.technicalDocs.monitoringLogging.detailedDescriptionList' },
      ],
    },
    {
      id: 'external-api-integrations',
      titleKey: 'docs.technicalDocs.externalApiIntegrations.title',
      contentKey: 'docs.technicalDocs.externalApiIntegrations.description',
      subSections: [
        { id: 'gmail-api', titleKey: 'docs.technicalDocs.externalApiIntegrations.gmailApiTitle', contentKey: 'docs.technicalDocs.externalApiIntegrations.gmailApiContent' },
        { id: 'stripe', titleKey: 'docs.technicalDocs.externalApiIntegrations.stripeTitle', contentKey: 'docs.technicalDocs.externalApiIntegrations.stripeContent' },
        { id: 'firebase-fcm', titleKey: 'docs.technicalDocs.externalApiIntegrations.firebaseFCMTitle', contentKey: 'docs.technicalDocs.externalApiIntegrations.firebaseFCMContent' },
        { id: 'principle-eai', titleKey: 'docs.technicalDocs.externalApiIntegrations.principleTitle', contentKey: 'docs.technicalDocs.externalApiIntegrations.principleContent' },
        { id: 'detailed-description-eai', titleKey: 'docs.technicalDocs.externalApiIntegrations.detailedDescriptionTitle', contentKey: 'docs.technicalDocs.externalApiIntegrations.detailedDescriptionContent' },
      ],
    },
    {
      id: 'notes',
      titleKey: 'docs.technicalDocs.notes.title',
      contentKey: 'docs.technicalDocs.notes.description',
      subSections: [
        { id: 'api-spec-link', titleKey: 'docs.technicalDocs.notes.apiSpecLinkTitle', contentKey: 'docs.technicalDocs.notes.apiSpecLinkContent' },
        { id: 'dev-guide-link', titleKey: 'docs.technicalDocs.notes.devGuideLinkTitle', contentKey: 'docs.technicalDocs.notes.devGuideLinkContent' },
        { id: 'optimization-guide-link', titleKey: 'docs.technicalDocs.notes.optimizationGuideLinkTitle', contentKey: 'docs.technicalDocs.notes.optimizationGuideLinkContent' },
        { id: 'integrations-docs-link', titleKey: 'docs.technicalDocs.notes.integrationsDocsLinkTitle', contentKey: 'docs.technicalDocs.notes.integrationsDocsLinkContent' },
        { id: 'design-docs-link', titleKey: 'docs.technicalDocs.notes.designDocsLinkTitle', contentKey: 'docs.technicalDocs.notes.designDocsLinkContent' },
        { id: 'user-guide-link', titleKey: 'docs.technicalDocs.notes.userGuideLinkTitle', contentKey: 'docs.technicalDocs.notes.userGuideLinkContent' },
        { id: 'long-term-investment', titleKey: 'docs.technicalDocs.notes.longTermInvestmentTitle', contentKey: 'docs.technicalDocs.notes.longTermInvestmentContent' },
      ],
    },
  ];

  const apiSpecSections = [
    {
      id: 'general-info',
      titleKey: 'docs.apiSpec.generalInfo.title',
      contentKey: 'docs.apiSpec.generalInfo.description',
      subSections: [
        { id: 'project-name', titleKey: 'docs.apiSpec.generalInfo.projectNameTitle', contentKey: 'docs.apiSpec.generalInfo.projectNameContent' },
        { id: 'api-purpose', titleKey: 'docs.apiSpec.generalInfo.apiPurposeTitle', contentKey: 'docs.apiSpec.generalInfo.apiPurposeContent' },
        { id: 'base-url', titleKey: 'docs.apiSpec.generalInfo.baseUrlTitle', contentKey: 'docs.apiSpec.generalInfo.baseUrlContent' },
        { id: 'request-format', titleKey: 'docs.apiSpec.generalInfo.requestFormatTitle', contentKey: 'docs.apiSpec.generalInfo.requestFormatContent' },
        { id: 'authentication', titleKey: 'docs.apiSpec.generalInfo.authenticationTitle', contentKey: 'docs.apiSpec.generalInfo.authenticationContent' },
        { id: 'related-docs', titleKey: 'docs.apiSpec.generalInfo.relatedDocsTitle', listKey: 'docs.apiSpec.generalInfo.relatedDocsContent' },
      ],
    },
    {
      id: 'graphql-schema',
      titleKey: 'docs.apiSpec.graphqlSchema.title',
      contentKey: 'docs.apiSpec.graphqlSchema.description',
      subSections: [
        {
          id: 'data-types',
          titleKey: 'docs.apiSpec.graphqlSchema.dataTypes.title',
          subSections: [
            { id: 'user-type', titleKey: 'docs.apiSpec.graphqlSchema.dataTypes.user.title', codeExampleKey: 'docs.apiSpec.graphqlSchema.dataTypes.user.code' },
            { id: 'chat-type', titleKey: 'docs.apiSpec.graphqlSchema.dataTypes.chat.title', codeExampleKey: 'docs.apiSpec.graphqlSchema.dataTypes.chat.code' },
            { id: 'message-type', titleKey: 'docs.apiSpec.graphqlSchema.dataTypes.message.title', codeExampleKey: 'docs.apiSpec.graphqlSchema.dataTypes.message.code' },
            { id: 'pagination-input', titleKey: 'docs.apiSpec.graphqlSchema.dataTypes.paginationInput.title', codeExampleKey: 'docs.apiSpec.graphqlSchema.dataTypes.paginationInput.code' },
            { id: 'auth-payload', titleKey: 'docs.apiSpec.graphqlSchema.dataTypes.authPayload.title', codeExampleKey: 'docs.apiSpec.graphqlSchema.dataTypes.authPayload.code' },
            { id: 'datetime-json', titleKey: 'docs.apiSpec.graphqlSchema.dataTypes.dateTimeJson.title', contentKey: 'docs.apiSpec.graphqlSchema.dataTypes.dateTimeJson.content' },
          ],
        },
        {
          id: 'operations',
          titleKey: 'docs.apiSpec.graphqlSchema.operations.title',
          subSections: [
            {
              id: 'authentication-ops',
              titleKey: 'docs.apiSpec.graphqlSchema.operations.authentication.title',
              subSections: [
                { id: 'register-user', titleKey: 'docs.apiSpec.graphqlSchema.operations.authentication.registerUser.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.authentication.registerUser.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.authentication.registerUser.input', 'docs.apiSpec.graphqlSchema.operations.authentication.registerUser.authRequired', 'docs.apiSpec.graphqlSchema.operations.authentication.registerUser.scenario', 'docs.apiSpec.graphqlSchema.operations.authentication.registerUser.errors'] },
                { id: 'login-user', titleKey: 'docs.apiSpec.graphqlSchema.operations.authentication.loginUser.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.authentication.loginUser.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.authentication.loginUser.input', 'docs.apiSpec.graphqlSchema.operations.authentication.loginUser.authRequired', 'docs.apiSpec.graphqlSchema.operations.authentication.loginUser.scenario', 'docs.apiSpec.graphqlSchema.operations.authentication.loginUser.errors'] },
                { id: 'logout-user', titleKey: 'docs.apiSpec.graphqlSchema.operations.authentication.logoutUser.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.authentication.logoutUser.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.authentication.logoutUser.authRequired', 'docs.apiSpec.graphqlSchema.operations.authentication.logoutUser.scenario', 'docs.apiSpec.graphqlSchema.operations.authentication.logoutUser.returns', 'docs.apiSpec.graphqlSchema.operations.authentication.logoutUser.errors'] },
              ],
            },
            {
              id: 'user-ops',
              titleKey: 'docs.apiSpec.graphqlSchema.operations.user.title',
              subSections: [
                { id: 'get-user', titleKey: 'docs.apiSpec.graphqlSchema.operations.user.getUser.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.user.getUser.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.user.getUser.authRequired', 'docs.apiSpec.graphqlSchema.operations.user.getUser.scenario', 'docs.apiSpec.graphqlSchema.operations.user.getUser.errors'] },
                { id: 'get-current-user', titleKey: 'docs.apiSpec.graphqlSchema.operations.user.getCurrentUser.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.user.getCurrentUser.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.user.getCurrentUser.authRequired', 'docs.apiSpec.graphqlSchema.operations.user.getCurrentUser.scenario', 'docs.apiSpec.graphqlSchema.operations.user.getCurrentUser.errors'] },
                { id: 'update-user', titleKey: 'docs.apiSpec.graphqlSchema.operations.user.updateUser.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.user.updateUser.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.user.updateUser.input', 'docs.apiSpec.graphqlSchema.operations.user.updateUser.authRequired', 'docs.apiSpec.graphqlSchema.operations.user.updateUser.scenario', 'docs.apiSpec.graphqlSchema.operations.user.updateUser.errors'] },
                { id: 'delete-user', titleKey: 'docs.apiSpec.graphqlSchema.operations.user.deleteUser.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.user.deleteUser.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.user.deleteUser.authRequired', 'docs.apiSpec.graphqlSchema.operations.user.deleteUser.scenario', 'docs.apiSpec.graphqlSchema.operations.user.deleteUser.returns', 'docs.apiSpec.graphqlSchema.operations.user.deleteUser.errors'] },
              ],
            },
            {
              id: 'chat-ops',
              titleKey: 'docs.apiSpec.graphqlSchema.operations.chats.title',
              subSections: [
                { id: 'get-chats', titleKey: 'docs.apiSpec.graphqlSchema.operations.chats.getChats.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.chats.getChats.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.chats.getChats.authRequired', 'docs.apiSpec.graphqlSchema.operations.chats.getChats.scenario', 'docs.apiSpec.graphqlSchema.operations.chats.getChats.errors'] },
                { id: 'get-chat', titleKey: 'docs.apiSpec.graphqlSchema.operations.chats.getChat.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.chats.getChat.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.chats.getChat.authRequired', 'docs.apiSpec.graphqlSchema.operations.chats.getChat.scenario', 'docs.apiSpec.graphqlSchema.operations.chats.getChat.errors'] },
                { id: 'create-chat', titleKey: 'docs.apiSpec.graphqlSchema.operations.chats.createChat.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.chats.createChat.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.chats.createChat.input', 'docs.apiSpec.graphqlSchema.operations.chats.createChat.authRequired', 'docs.apiSpec.graphqlSchema.operations.chats.createChat.scenario', 'docs.apiSpec.graphqlSchema.operations.chats.createChat.errors'] },
                { id: 'get-messages', titleKey: 'docs.apiSpec.graphqlSchema.operations.chats.getMessages.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.chats.getMessages.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.chats.getMessages.authRequired', 'docs.apiSpec.graphqlSchema.operations.chats.getMessages.scenario', 'docs.apiSpec.graphqlSchema.operations.chats.getMessages.errors'] },
                { id: 'send-message', titleKey: 'docs.apiSpec.graphqlSchema.operations.chats.sendMessage.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.chats.sendMessage.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.chats.sendMessage.input', 'docs.apiSpec.graphqlSchema.operations.chats.sendMessage.authRequired', 'docs.apiSpec.graphqlSchema.operations.chats.sendMessage.scenario', 'docs.apiSpec.graphqlSchema.operations.chats.sendMessage.errors'] },
                { id: 'delete-message', titleKey: 'docs.apiSpec.graphqlSchema.operations.chats.deleteMessage.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.chats.deleteMessage.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.chats.deleteMessage.authRequired', 'docs.apiSpec.graphqlSchema.operations.chats.deleteMessage.scenario', 'docs.apiSpec.graphqlSchema.operations.chats.deleteMessage.returns', 'docs.apiSpec.graphqlSchema.operations.chats.deleteMessage.errors'] },
              ],
            },
            {
              id: 'external-integrations-ops',
              titleKey: 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.title',
              subSections: [
                { id: 'send-verification-code', titleKey: 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.sendVerificationCode.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.sendVerificationCode.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.externalIntegrations.sendVerificationCode.authRequired', 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.sendVerificationCode.scenario', 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.sendVerificationCode.returns', 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.sendVerificationCode.errors'] },
                { id: 'verify-email-code', titleKey: 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.verifyEmailCode.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.verifyEmailCode.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.externalIntegrations.verifyEmailCode.authRequired', 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.verifyEmailCode.scenario', 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.verifyEmailCode.returns', 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.verifyEmailCode.errors'] },
                { id: 'enable-two-factor-auth', titleKey: 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.enableTwoFactorAuth.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.enableTwoFactorAuth.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.externalIntegrations.enableTwoFactorAuth.authRequired', 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.enableTwoFactorAuth.scenario', 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.enableTwoFactorAuth.errors'] },
                { id: 'disable-two-factor-auth', titleKey: 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.disableTwoFactorAuth.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.disableTwoFactorAuth.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.externalIntegrations.disableTwoFactorAuth.authRequired', 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.disableTwoFactorAuth.scenario', 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.disableTwoFactorAuth.errors'] },
                { id: 'send-two-factor-code', titleKey: 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.sendTwoFactorCode.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.sendTwoFactorCode.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.externalIntegrations.sendTwoFactorCode.authRequired', 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.sendTwoFactorCode.scenario', 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.sendTwoFactorCode.errors'] },
                { id: 'create-payment-session', titleKey: 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.createPaymentSession.title', contentKey: 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.createPaymentSession.description', additionalContentKeys: ['docs.apiSpec.graphqlSchema.operations.externalIntegrations.createPaymentSession.input', 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.createPaymentSession.authRequired', 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.createPaymentSession.scenario', 'docs.apiSpec.graphqlSchema.operations.externalIntegrations.createPaymentSession.errors'] },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'error-handling',
      titleKey: 'docs.apiSpec.errorHandling.title',
      contentKey: 'docs.apiSpec.errorHandling.description',
      subSections: [
        { id: 'error-format', titleKey: 'docs.apiSpec.errorHandling.errorFormatTitle', codeExampleKey: 'docs.apiSpec.errorHandling.errorFormatCode' },
        { id: 'key-error-codes', titleKey: 'docs.apiSpec.errorHandling.keyErrorCodesTitle', listKey: 'docs.apiSpec.errorHandling.keyErrorCodesList' },
        { id: 'localization-errors', titleKey: 'docs.apiSpec.errorHandling.localizationErrorsTitle', contentKey: 'docs.apiSpec.errorHandling.localizationErrorsContent' },
      ],
    },
    {
      id: 'notes',
      titleKey: 'docs.apiSpec.notes.title',
      subSections: [
        { id: 'data-types-notes', titleKey: 'docs.apiSpec.notes.dataTypes.title', listKey: 'docs.apiSpec.notes.dataTypes.list' },
        { id: 'pagination-notes', titleKey: 'docs.apiSpec.notes.pagination.title', contentKey: 'docs.apiSpec.notes.pagination.content' },
        { id: 'validation-notes', titleKey: 'docs.apiSpec.notes.validation.title', contentKey: 'docs.apiSpec.notes.validation.content' },
        { id: 'security-notes', titleKey: 'docs.apiSpec.notes.security.title', contentKey: 'docs.apiSpec.notes.security.content' },
        { id: 'testing-tools-notes', titleKey: 'docs.apiSpec.notes.testingTools.title', contentKey: 'docs.apiSpec.notes.testingTools.content' },
      ],
    },
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
    {
      id: 'user_guide_docs',
      titleKey: 'docs.userGuide.title',
      subtitleKey: 'docs.userGuide.subtitle',
      sections: userGuideSections,
    },
    {
      id: 'dev_guide_docs',
      titleKey: 'docs.devGuide.title',
      subtitleKey: 'docs.devGuide.subtitle',
      sections: devGuideSections,
    },
    {
      id: 'integrations_guide_docs',
      titleKey: 'docs.integrationsGuide.title',
      subtitleKey: 'docs.integrationsGuide.subtitle',
      sections: integrationsGuideSections,
    },
    {
      id: 'optimization_guide_docs',
      titleKey: 'docs.optimizationGuide.title',
      subtitleKey: 'docs.optimizationGuide.subtitle',
      sections: optimizationGuideSections,
    },
    {
      id: 'api_spec_docs',
      titleKey: 'docs.apiSpec.title',
      subtitleKey: 'docs.apiSpec.subtitle',
      sections: apiSpecSections,
    },
    {
      id: 'technical_docs',
      titleKey: 'docs.technicalDocs.title',
      subtitleKey: 'docs.technicalDocs.subtitle',
      sections: technicalDocsSections,
    },
  ];

  const activeDoc = docsConfig.find((doc: any) => doc.id === activeDocId);
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
