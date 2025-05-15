## 1. Introduction: Code Quality as a Foundation for Presentation

**Project Name:** BrainMessenger Landing Page

**Description:** This document defines the code standards, conventions, and best practices for the BrainMessenger public website (landing page). While simpler than the main application, this website serves as the primary **gateway** to the BrainMessenger digital **ASSET**. Code quality here is crucial for ensuring **reliability**, **performance**, and **maintainability**, making a positive first impression and aligning with the overall project philosophy of **Quality Over Quantity** (Principle 3) and building a **System** (Principle 9).

**Goal:** To ensure consistency, readability, and maintainability of the landing page codebase, simplify collaboration, facilitate future updates, and maintain a high-quality public presence for BrainMessenger.

**Audience:** All developers contributing to the BrainMessenger landing page project.

**Principles Applied:**
*   **Quality Over Quantity (Principle 3):** Emphasize writing clean, readable, and well-structured code.
*   **System and Optimization (Principle 9):** Structure the codebase logically, optimize for performance, and streamline the development process.
*   **Pragmatism and Realism (Principle 12):** Choose practical solutions and avoid unnecessary complexity for a marketing website.
*   **Bias for Action (Principle 15):** Maintain standards that enable quick iterations and deployment of updates.
*   **Integrity (Principle 7):** Ensure code and documentation are consistent and trustworthy.

## 2. General Principles: The Code Philosophy

*   **Readability:** Write code that is easy for others (and your future self) to understand. Prioritize clarity over cleverness.
*   **Maintainability:** Structure code logically with clear separation of concerns. Make it easy to update content, styles, and components.
*   **Consistency:** Follow established patterns and conventions throughout the codebase. Consistency is key to a maintainable **SYSTEM** (Principle 9).
*   **Pragmatism:** Avoid over-engineering. Use the right tool for the job, but keep it simple where possible (KISS - Keep It Simple, Stupid).
*   **Performance:** Be mindful of code that could impact website loading speed and responsiveness. Optimize where necessary, but don't over-optimize prematurely (Optimization, Principle 9).

## 3. Technology-Specific Guidelines

*   **TypeScript:**
    *   Use static typing for all variables, function parameters, and return types.
    *   Avoid using `any`. If types are complex, define interfaces or types.
    *   This enhances code reliability and maintainability (Quality, Principle 3).
*   **React:**
    *   Prefer functional components and React Hooks.
    *   Structure components for reusability (e.g., small, focused components).
    *   Props should be clearly typed using TypeScript interfaces.
    *   Avoid complex state management libraries (like Redux) unless a clear need arises; `useState` and `useReducer` are sufficient for most UI state in a landing page (Pragmatism, Principle 12).
    *   Use `React.memo` *sparingly* and only if performance profiling indicates a need; incorrect usage can sometimes hurt performance.
*   **Next.js (or Vite):**
    *   Use the `pages/` directory for routing (Next.js).
    *   Leverage SSR (`getServerSideProps`) or SSG (`getStaticProps`, `getStaticPaths`) where appropriate for performance and SEO benefits (Optimization, Principle 9; Value, Principle 2).
    *   Use dynamic imports (`next/dynamic` or `React.lazy`) for components or pages that are not critical for the initial load (Optimization).
*   **Styling (Tailwind CSS):**
    *   Use Tailwind utility classes primarily for styling.
    *   Define custom CSS classes only when utility classes become unwieldy or for complex, reusable components.
    *   Extend the default Tailwind theme (`tailwind.config.js`) for custom colors, fonts, spacing, etc., aligning with the design system (DocDesign.md).
    *   Use responsive utilities (`sm:`, `md:`, `lg:`) for adapting layout and styles across breakpoints.

## 4. Code Structure and Organization

Follow a logical and consistent file structure (aligning with DocDevIn.md principles where applicable to a frontend project):

*   `src/pages/`: Top-level components for each page (e.g., `index.tsx`, `faq.tsx`, `roadmap.tsx`).
*   `src/components/`: Reusable UI components. Group related components in subfolders (e.g., `src/components/layout` for Header/Footer, `src/components/ui` for generic buttons/inputs, `src/components/sections` for page sections like Hero, Features).
*   `src/styles/`: Global styles, Tailwind configuration, any custom CSS modules.
*   `src/utils/`: Small, pure utility functions.
*   `public/`: Static assets (images, fonts, favicons). Organize in subfolders (e.g., `public/images`, `public/fonts`).

## 5. Naming Conventions

*   **Files and Folders:** Use `kebab-case` (e.g., `my-component.tsx`, `feature-section.tsx`, `utils/date-helpers.ts`).
*   **Components:** Use `PascalCase` (e.g., `MyComponent`, `FeatureSection`).
*   **Variables and Functions:** Use `camelCase` (e.g., `userName`, `formatDate`).
*   **Constants:** Use `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`, `MAX_RETRIES`). For string literals used in components, consider placing them near where they are used or in dedicated content files if they are long.

## 6. Commenting and Documentation

*   **Code Comments:** Write comments to explain *why* certain code decisions were made, complex logic, or potential edge cases. Avoid commenting on *what* the code does if it's self-explanatory.
*   **JSDoc/TSDoc:** Use JSDoc/TSDoc for documenting component props, function parameters, and return types, especially for reusable components and utility functions.
*   **Content Management:** For content-heavy sections (FAQ, News, Roadmap items), consider separating the content data from the component logic (e.g., storing data in JSON or Markdown files) for easier updates.
*   **Repository Documentation:** Keep the main `README.md` and links to other relevant documentation (like the Development Guide, UI Documentation) updated.

## 7. Testing Guidelines

Testing for the landing page should focus on verifying correct rendering, navigation, and content accuracy.

*   **Manual Testing:** Essential for visual accuracy, responsiveness, and cross-browser compatibility.
*   **Automated Tests (Basic):**
    *   **Unit Tests:** For utility functions or complex logic in components (Jest).
    *   **E2E Tests:** Basic E2E tests (Cypress/Playwright) to verify key pages load correctly and critical links (to the web app, downloads) are functional.
*   **Link Testing:** Automate checks for broken links if possible (e.g., during CI).

## 8. Performance Considerations

Optimize the landing page for fast loading times (Optimization, Principle 9; Value, Principle 2).

*   **Image Optimization:** Use optimized image formats (WebP) and responsive images. Use Next.js `next/image` component if available.
*   **Asset Bundling:** The build process (Next.js/Vite) should automatically handle code splitting, minification, and bundling.
*   **Lazy Loading:** Use dynamic imports for components below the fold or non-critical features.
*   **CDN:** Deploy the website to a platform that uses a Content Delivery Network for fast asset delivery globally.

## 9. Accessibility Considerations

Ensure the website is accessible to users with disabilities (Accessibility, NFR-10; Health, Principle 5).

*   **Semantic HTML:** Use appropriate HTML tags (`<nav>`, `<article>`, `<aside>`, `<button>`, `<input>`, etc.).
*   **ARIA Attributes:** Use ARIA roles and attributes where necessary for dynamic content or custom interactive elements.
*   **Keyboard Navigation:** Ensure all interactive elements are reachable and operable using a keyboard.
*   **Contrast Ratios:** Verify sufficient color contrast for text and interactive elements (aligning with DocDesign.md and WCAG 2.1 AA standards).
*   **Alt Text:** Provide descriptive `alt` text for all meaningful images.

## 10. CI/CD Integration

Code standards should be enforced automatically as part of the CI/CD pipeline (System, Principle 9).

*   Configure the build process to run ESLint and Prettier checks.
*   Fail the build if linting or formatting issues are found.
*   Include basic automated tests (unit, E2E for key links) in the pipeline.

## 11. Code Review and Evolution

*   All code changes should undergo review by at least one other developer to ensure standards are met and potential issues are caught.
*   This `clinerules.md` document is a living document. It should be updated as new technologies are introduced or as the team identifies better practices (Kaizen, Principle 9).