export type TRANSLATIONS_TYPE = { [key in keyof typeof en]: Partial<typeof en[key]> };

export const en = {
  app: {
    title: 'Kool App Title',
    workout: 'Workout',
    profile: 'Profile',
    friends: 'Friends',
    settings: 'Settings',
  },
};
