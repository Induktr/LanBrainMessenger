export interface UpdateItem {
  iconUrl: string;
  titleKey: string;
  descriptionKey: string;
  dateKey: string;
  originalTitle?: string; // For alt text or fallback if translation is not found
}

export const updates: UpdateItem[] = [
  {
    iconUrl: "https://res.cloudinary.com/dsjalneil/image/upload/v1734715114/--turn-a-text-babble-into-a-more-complex-form--add_sobqo0.svg",
    titleKey: 'updates.items.enhancedChatExperience.title',
    descriptionKey: 'updates.items.enhancedChatExperience.description',
    dateKey: 'updates.items.enhancedChatExperience.date',
    originalTitle: 'Enhanced Chat Experience'
  },
  {
    iconUrl: "https://res.cloudinary.com/dsjalneil/image/upload/v1734708432/boldly-change-the-proportions--for-example--enlarg_ndehsg.svg",
    titleKey: 'updates.items.securityUpdates.title',
    descriptionKey: 'updates.items.securityUpdates.description',
    dateKey: 'updates.items.securityUpdates.date',
    originalTitle: 'Security Updates'
  },
  {
    iconUrl: "https://res.cloudinary.com/dsjalneil/image/upload/v1734715324/add-a-light-gradient-to-the-background-that-resemb_nuv27x.svg",
    titleKey: 'updates.items.mobileAppRedesign.title',
    descriptionKey: 'updates.items.mobileAppRedesign.description',
    dateKey: 'updates.items.mobileAppRedesign.date',
    originalTitle: 'Mobile App Redesign'
  },
  {
    iconUrl: "https://res.cloudinary.com/dsjalneil/image/upload/v1734710237/turn-a-globe-into-an-abstract-geometric-sphere-mad_kbhymc.svg",
    titleKey: 'updates.items.globalAvailability.title',
    descriptionKey: 'updates.items.globalAvailability.description',
    dateKey: 'updates.items.globalAvailability.date',
    originalTitle: 'Global Availability'
  },
  {
    iconUrl: "https://res.cloudinary.com/dsjalneil/image/upload/v1734708159/boldly-change-the-proportions--for-example--increa_r2v11j.svg",
    titleKey: 'updates.items.performanceBoost.title',
    descriptionKey: 'updates.items.performanceBoost.description',
    dateKey: 'updates.items.performanceBoost.date',
    originalTitle: 'Performance Boost'
  },
  {
    iconUrl: "https://res.cloudinary.com/dsjalneil/image/upload/v1734715114/--turn-a-text-babble-into-a-more-complex-form--add_sobqo0.svg",
    titleKey: 'updates.items.aiFeaturesIntegration.title',
    descriptionKey: 'updates.items.aiFeaturesIntegration.description',
    dateKey: 'updates.items.aiFeaturesIntegration.date',
    originalTitle: 'AI Features Integration'
  },
  {
    iconUrl: "https://res.cloudinary.com/dsjalneil/image/upload/v1734708432/boldly-change-the-proportions--for-example--enlarg_ndehsg.svg",
    titleKey: 'updates.items.twoFactorAuthentication.title',
    descriptionKey: 'updates.items.twoFactorAuthentication.description',
    dateKey: 'updates.items.twoFactorAuthentication.date',
    originalTitle: 'Two-Factor Authentication'
  },
  {
    iconUrl: "https://res.cloudinary.com/dsjalneil/image/upload/v1734715324/add-a-light-gradient-to-the-background-that-resemb_nuv27x.svg",
    titleKey: 'updates.items.customThemes.title',
    descriptionKey: 'updates.items.customThemes.description',
    dateKey: 'updates.items.customThemes.date',
    originalTitle: 'Custom Themes'
  }
];
