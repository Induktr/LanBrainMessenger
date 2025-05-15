import React from 'react';

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  iconName: string; // Name of the icon (e.g., 'globe', 'sun')
}

// This object will map icon names to their SVG content
// The actual SVG content needs to be added here based on the icons used in Header and Footer
const svgIcons: { [key: string]: string } = {
  // Placeholder: Add SVG content here
  // 'icon-name': '<svg>...</svg>',
};

const SvgIcon: React.FC<SvgIconProps> = ({ iconName, className, ...rest }) => {
  const svgContent = svgIcons[iconName];

  if (!svgContent) {
    console.error(`Icon "${iconName}" not found.`);
    return null; // Or render a fallback icon
  }

  // We need a way to render the raw SVG content.
  // Using dangerouslySetInnerHTML is an option, but requires careful handling.
  // A safer approach might be to store SVGs as React components or use an SVG sprite.
  // For now, let's use dangerouslySetInnerHTML for demonstration, assuming trusted SVG sources.
  // TODO: Implement a more robust SVG loading/rendering strategy if needed.

  return (
    <svg
      className={className}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      {...rest}
    />
  );
};

export default SvgIcon;