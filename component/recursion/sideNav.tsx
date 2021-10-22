interface SideNav {
  title: string;
  path: string;
  subNav?: SideNav[];
}

export const source: SideNav[] = [
  {
    title: 'Car',
    subNav: [
      {
        title: 'HONDA',
        path: 'honda',
        subNav: [
          {
            title: 'DONGFENG',
            path: 'dongfeng',
            subNav: [
              { title: 'NSPIRE', path: 'nspire' },
              { title: 'ENVIX', path: 'envix' },
              { title: 'CIVIC', path: 'civic' },
            ],
          },
          {
            title: 'GUANGQI',
            path: 'guangqi',
            subNav: [
              { title: 'AVANCIER', path: 'avancier' },
              { title: 'ACCORD', path: 'accord' },
            ],
          },
        ],
      },
      {
        title: 'TOYOTA',
        path: 'toyota',
        subNav: [
          { title: 'COROLLA', path: 'corolla' },
          { title: 'CAMRY', path: 'camry' },
          { title: 'PRADO', path: 'prado' },
          { title: 'ALPHARD', path: 'alphard' },
        ],
      },
    ],
    path: 'car',
  },
  {
    title: 'Area',
    path: 'area',
    subNav: [
      {
        title: 'NORTH',
        path: 'north',
        subNav: [
          { title: 'BEIJING', path: 'beijing' },
          { title: 'CHANGCHU', path: 'changchu' },
        ],
      },
      {
        title: 'SOUTH',
        path: 'south',
        subNav: [
          { title: 'SHANGHAI', path: 'shanghai' },
          { title: 'GUANGZHOU', path: 'guangzhou' },
        ],
      },
    ],
  },
  {
    title: 'Country',
    path: 'country',
    subNav: [
      {
        title: 'CHINA',
        path: 'china',
        subNav: [
          { title: 'MAINLAND', path: 'mainland' },
          { title: 'TAIWAN', path: 'taiwan' },
        ],
      },
      { title: 'American', path: 'american' },
    ],
  },
  {
    title: 'Country',
    path: 'country',
    subNav: [
      { title: 'MAINLAND', path: 'mainland' },
      { title: 'TAIWAN', path: 'taiwan' },
    ],
  },
];

function findTitle(name) {
  for (let i = 0; i < source.length; i++) {
    if (!source[i].subNav[0].subNav) {
      for (let j = 0; j < source[i].subNav.length; j++) {
        if (source[i].subNav[j].title == name) {
          return source[i].subNav[j];
        }
      }
    } else {
    }
  }
}
console.log(111, findTitle('TAIWAN'));
