type SomethingItem = MainContentItem & {
  features: {
    [key: string]: unknown;
  };
};

type ListOfSomethingProps = {
  data: SomethingItem[];
};
