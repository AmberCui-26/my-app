interface SideNav {
  title: string;
  path: string;
  subNav?: SideNav[];
}

export const source: SideNav[] = [
  {
    title: "Car",
    subNav: [
      {
        title: "HONDA",
        path: "honda",
        subNav: [
          {
            title: "DONGFENG",
            path: "dongfeng",
            subNav: [
              { title: "NSPIRE", path: "nspire" },
              { title: "ENVIX", path: "envix" },
              { title: "CIVIC", path: "civic" },
            ],
          },
          {
            title: "GUANGQI",
            path: "guangqi",
            subNav: [
              { title: "AVANCIER", path: "avancier" },
              { title: "ACCORD", path: "accord" },
            ],
          },
        ],
      },
      {
        title: "TOYOTA",
        path: "toyota",
        subNav: [
          { title: "COROLLA", path: "corolla" },
          { title: "CAMRY", path: "camry" },
          { title: "PRADO", path: "prado" },
          { title: "ALPHARD", path: "alphard" },
        ],
      },
    ],
    path: "car",
  },
  {
    title: "Area",
    path: "area",
    subNav: [
      {
        title: "NORTH",
        path: "north",
        subNav: [
          { title: "BEIJING", path: "beijing" },
          { title: "CHANGCHU", path: "changchu" },
        ],
      },
      {
        title: "SOUTH",
        path: "south",
        subNav: [
          { title: "SHANGHAI", path: "shanghai" },
          { title: "GUANGZHOU", path: "guangzhou" },
        ],
      },
    ],
  },
  {
    title: "Country",
    path: "country",
    subNav: [
      {
        title: "CHINA",
        path: "china",
        subNav: [
          { title: "MAINLAND", path: "mainland" },
          { title: "TAIWAN", path: "taiwan" },
        ],
      },
      { title: "American", path: "american" },
    ],
  },
];

const searchTitle = (value: string) => {
  return function search(data) {
    const headNode = data.slice(0, 1)[0];
    const restNodes = data.slice(1);

    if (headNode.title === value) {
      return headNode;
    }

    if (headNode["subNav"]) {
      const res = search(headNode["subNav"]);
      if (res) {
        return res;
      }
    }
    if (restNodes.length) {
      const res = search(restNodes);
      if (res) {
        return res;
      }
    }
    return null;
  };
};
const deepSearch = searchTitle("MAINLAND");
const target = deepSearch(source);
console.log(target);
