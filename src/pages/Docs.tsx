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
          <h1 className="text-4xl font-bold mt-6 mb-4">{t('docs.design.title')}</h1>
          <p className="text-[var(--text-secondary)]">
            {t('docs.design.subtitle')}
          </p>
        </div>

        <Section id="intro">
          <h2 className="text-3xl font-bold mb-4">{t('docs.design.section1.title')}</h2>
          <p className="mb-4">
            {t('docs.design.section1.name')}
          </p>
          <p className="mb-4">
            {t('docs.design.section1.description')}
          </p>
          <p className="mb-4">
            {t('docs.design.section1.goal')}
          </p>
          <p className="mb-2 font-semibold">{t('docs.design.section1.principles_title')}</p>
          <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
            {Array.isArray(t('docs.design.section1.principles')) ? (
              (t('docs.design.section1.principles') as string[]).map((principle, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: principle }} />
              ))
            ) : (
              <li>{t('docs.design.section1.principles')}</li> // Fallback if not an array
            )}
          </ul>
        </Section>

        <Section id="color-palette" className="mt-8">
          <h2 className="text-3xl font-bold mb-4">{t('docs.design.section2.title')}</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            {t('docs.design.section2.intro')}
          </p>

          <h3 className="text-2xl font-bold mb-4">{t('docs.design.section2.light_mode_title')}</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-[var(--surface)] rounded-lg overflow-hidden text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--secondary)] text-[var(--text-primary)]">
                  <th className="px-4 py-2 text-left">{Array.isArray(t('docs.design.section2.light_mode_table')) ? (t('docs.design.section2.light_mode_table') as string[][])[0][0] : 'Category'}</th>
                  <th className="px-4 py-2 text-left">{Array.isArray(t('docs.design.section2.light_mode_table')) ? (t('docs.design.section2.light_mode_table') as string[][])[0][1] : 'Color (HEX)'}</th>
                  <th className="px-4 py-2 text-left">{Array.isArray(t('docs.design.section2.light_mode_table')) ? (t('docs.design.section2.light_mode_table') as string[][])[0][2] : 'Purpose'}</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(t('docs.design.section2.light_mode_table')) && (t('docs.design.section2.light_mode_table') as string[][]).slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border px-4 py-2" dangerouslySetInnerHTML={{ __html: cell }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold mb-4">{t('docs.design.section2.dark_mode_title')}</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-[var(--surface)] rounded-lg overflow-hidden text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--secondary)] text-[var(--text-primary)]">
                  <th className="px-4 py-2 text-left">{Array.isArray(t('docs.design.section2.dark_mode_table')) ? (t('docs.design.section2.dark_mode_table') as string[][])[0][0] : 'Category'}</th>
                  <th className="px-4 py-2 text-left">{Array.isArray(t('docs.design.section2.dark_mode_table')) ? (t('docs.design.section2.dark_mode_table') as string[][])[0][1] : 'Color (HEX)'}</th>
                  <th className="px-4 py-2 text-left">{Array.isArray(t('docs.design.section2.dark_mode_table')) ? (t('docs.design.section2.dark_mode_table') as string[][])[0][2] : 'Purpose'}</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(t('docs.design.section2.dark_mode_table')) && (t('docs.design.section2.dark_mode_table') as string[][]).slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border px-4 py-2" dangerouslySetInnerHTML={{ __html: cell }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold mb-4">{t('docs.design.section2.premium_colors_title')}</h3>
          <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
            {Array.isArray(t('docs.design.section2.premium_colors')) ? (
              (t('docs.design.section2.premium_colors') as string[]).map((color, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: color }} />
              ))
            ) : (
              <li>{t('docs.design.section2.premium_colors')}</li> // Fallback
            )}
          </ul>

          <h3 className="text-2xl font-bold mb-4">{t('docs.design.section2.color_application_title')}</h3>
          <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
            {Array.isArray(t('docs.design.section2.color_application')) ? (
              (t('docs.design.section2.color_application') as { title: string; items: string[] }[]).map((example, index) => (
                <li key={index}>
                  <strong dangerouslySetInnerHTML={{ __html: example.title }} />
                  {Array.isArray(example.items) && (
                    <ul className="list-circle list-inside ml-4">
                      {example.items.map((item, itemIndex) => (
                        <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ul>
                  )}
                </li>
              ))
            ) : (
              <li>{t('docs.design.section2.color_application')}</li> // Fallback
            )}
          </ul>

          <h3 className="text-2xl font-bold mb-4">{t('docs.design.section2.usage_recommendations_title')}</h3>
          <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
            {Array.isArray(t('docs.design.section2.usage_recommendations')) ? (
              (t('docs.design.section2.usage_recommendations') as string[]).map((rec, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: rec }} />
              ))
            ) : (
              <li>{t('docs.design.section2.usage_recommendations')}</li> // Fallback
            )}
          </ul>
        </Section>

        <Section id="typography" className="mt-8">
          <h2 className="text-3xl font-bold mb-4">{t('docs.design.section3.title')}</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            {t('docs.design.section3.intro')}
          </p>

          <h3 className="text-2xl font-bold mb-4">{t('docs.design.section3.primary_font_title')}</h3>
          <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
            {Array.isArray(t('docs.design.section3.primary_font')) ? (
              (t('docs.design.section3.primary_font') as string[]).map((font, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: font }} />
              ))
            ) : (
              <li>{t('docs.design.section3.primary_font')}</li> // Fallback
            )}
          </ul>

          <h3 className="text-2xl font-bold mb-4">{t('docs.design.section3.sizes_styles_title')}</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-[var(--surface)] rounded-lg overflow-hidden text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--secondary)] text-[var(--text-primary)]">
                  <th className="px-4 py-2 text-left">{Array.isArray(t('docs.design.section3.sizes_styles_table')) ? (t('docs.design.section3.sizes_styles_table') as string[][])[0][0] : 'Level'}</th>
                  <th className="px-4 py-2 text-left">{Array.isArray(t('docs.design.section3.sizes_styles_table')) ? (t('docs.design.section3.sizes_styles_table') as string[][])[0][1] : 'Size'}</th>
                  <th className="px-4 py-2 text-left">{Array.isArray(t('docs.design.section3.sizes_styles_table')) ? (t('docs.design.section3.sizes_styles_table') as string[][])[0][2] : 'Weight'}</th>
                  <th className="px-4 py-2 text-left">{Array.isArray(t('docs.design.section3.sizes_styles_table')) ? (t('docs.design.section3.sizes_styles_table') as string[][])[0][3] : 'Usage'}</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(t('docs.design.section3.sizes_styles_table')) && (t('docs.design.section3.sizes_styles_table') as string[][]).slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border px-4 py-2" dangerouslySetInnerHTML={{ __html: cell }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mb-2 font-semibold">{t('docs.design.section3.notes_title')}</p>
          <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
            {Array.isArray(t('docs.design.section3.notes')) ? (
              (t('docs.design.section3.notes') as string[]).map((note, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: note }} />
              ))
            ) : (
              <li>{t('docs.design.section3.notes')}</li> // Fallback
            )}
          </ul>
        </Section>

        <Section id="animations" className="mt-8">
          <h2 className="text-3xl font-bold mb-4">{t('docs.design.section4.title')}</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            {t('docs.design.section4.intro')}
          </p>

          <h3 className="text-2xl font-bold mb-4">{t('docs.design.section4.principles_title')}</h3>
          <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
            {Array.isArray(t('docs.design.section4.principles')) ? (
              (t('docs.design.section4.principles') as string[]).map((principle, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: principle }} />
              ))
            ) : (
              <li>{t('docs.design.section4.principles')}</li> // Fallback
            )}
          </ul>

          <h3 className="text-2xl font-bold mb-4">{t('docs.design.section4.list_title')}</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-[var(--surface)] rounded-lg overflow-hidden text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--secondary)] text-[var(--text-primary)]">
                  <th className="px-4 py-2 text-left">{Array.isArray(t('docs.design.section4.list_table')) ? (t('docs.design.section4.list_table') as string[][])[0][0] : 'Name'}</th>
                  <th className="px-4 py-2 text-left">{Array.isArray(t('docs.design.section4.list_table')) ? (t('docs.design.section4.list_table') as string[][])[0][1] : 'Description'}</th>
                  <th className="px-4 py-2 text-left">{Array.isArray(t('docs.design.section4.list_table')) ? (t('docs.design.section4.list_table') as string[][])[0][2] : 'Trigger'}</th>
                  <th className="px-4 py-2 text-left">{Array.isArray(t('docs.design.section4.list_table')) ? (t('docs.design.section4.list_table') as string[][])[0][3] : 'Parameters'}</th>
                  <th className="px-4 py-2 text-left">{Array.isArray(t('docs.design.section4.list_table')) ? (t('docs.design.section4.list_table') as string[][])[0][4] : 'Related Principles'}</th>
                  <th className="px-4 py-2 text-left">{Array.isArray(t('docs.design.section4.list_table')) ? (t('docs.design.section4.list_table') as string[][])[0][5] : 'Colors (Light/Dark)'}</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(t('docs.design.section4.list_table')) && (t('docs.design.section4.list_table') as string[][]).slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border px-4 py-2" dangerouslySetInnerHTML={{ __html: cell }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold mb-4">{t('docs.design.section4.implementation_examples_title')}</h3>
           <p className="mb-2 font-semibold">{t('docs.design.section4.css_ripple_title')}</p>
           <pre className="bg-[var(--surface)] p-2 rounded-md text-sm overflow-x-auto mb-4">
            <code className="text-[var(--text-primary)]">
              {`.ripple {
  background: linear-gradient(45deg, #F2F047, #1ED94F); /* Or other colors/gradient */
  border-radius: 50%;
  animation: ripple 0.3s ease-out;
}
@keyframes ripple {
  to { transform: scale(2); opacity: 0; }
}`}
            </code>
          </pre>

           <p className="mb-2 font-semibold">{t('docs.design.section4.rn_icon_title')}</p>
           <pre className="bg-[var(--surface)] p-2 rounded-md text-sm overflow-x-auto mb-4">
            <code className="text-[var(--text-primary)]">
              {`import Animated from 'react-native-reanimated'; // Example library
import Icon from 'react-native-vector-icons/MaterialIcons'; // Example library

const color = themeMode === 'Dark' ? '#FFFFFF' : '#333333';
// Creating an animated Icon component
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

// Example usage with scale animation (assuming 'scale' is an Animated.Value)
<AnimatedIcon name="volume-up" color={color} style={{ transform: [{ scale: scale }] }} />`}
            </code>
          </pre>
        </Section>

        <Section id="alignment-grid" className="mt-8">
          <h2 className="text-3xl font-bold mb-4">{t('docs.design.section5.title')}</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            {t('docs.design.section5.intro')}
          </p>

          <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
            {Array.isArray(t('docs.design.section5.base_grid')) ? (
              (t('docs.design.section5.section5.base_grid') as string[]).map((item, index) => (
                <li key={`base-grid-${index}`} dangerouslySetInnerHTML={{ __html: item }} />
              ))
            ) : (
              <li dangerouslySetInnerHTML={{ __html: t('docs.design.section5.base_grid') }} /> // Fallback
            )}
            {Array.isArray(t('docs.design.section5.alignment')) ? (
              <li>
                <strong dangerouslySetInnerHTML={{ __html: t('docs.design.section5.alignment_title') }} />
                <ul className="list-circle list-inside ml-4">
                  {(t('docs.design.section5.alignment') as string[]).map((item, index) => (
                    <li key={`alignment-${index}`} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </li>
            ) : (
              <li dangerouslySetInnerHTML={{ __html: t('docs.design.section5.alignment') }} /> // Fallback
            )}
             {Array.isArray(t('docs.design.section5.adaptability')) ? (
              <li>
                <strong dangerouslySetInnerHTML={{ __html: t('docs.design.section5.adaptability_title') }} />
                <ul className="list-circle list-inside ml-4">
                  {(t('docs.design.section5.adaptability') as string[]).map((item, index) => (
                    <li key={`adaptability-${index}`} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </li>
            ) : (
              <li dangerouslySetInnerHTML={{ __html: t('docs.design.section5.adaptability') }} /> // Fallback
            )}
          </ul>
        </Section>

        <Section id="accessibility" className="mt-8">
          <h2 className="text-3xl font-bold mb-4">{t('docs.design.section6.title')}</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            {t('docs.design.section6.intro')}
          </p>

          <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
            {Array.isArray(t('docs.design.section6.principles')) ? (
              (t('docs.design.section6.principles') as string[]).map((principle, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: principle }} />
              ))
            ) : (
              <li>{t('docs.design.section6.principles')}</li> // Fallback
            )}
          </ul>
        </Section>

        <Section id="notes-recommendations" className="mt-8">
          <h2 className="text-3xl font-bold mb-4">{t('docs.design.section7.title')}</h2>
          <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)]">
            {Array.isArray(t('docs.design.section7.notes')) ? (
              (t('docs.design.section7.notes') as string[]).map((note, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: note }} />
              ))
            ) : (
              <li>{t('docs.design.section7.notes')}</li> // Fallback
            )}
          </ul>
        </Section>

      </Container>
    </div>
  );
};

export default Docs;