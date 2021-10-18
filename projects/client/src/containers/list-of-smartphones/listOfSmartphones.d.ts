type SmartphonesItem = MainContentItem & {
  features: {
    color?: string;
  };
};

type ListOfSmartphonesProps = {
  data: SmartphonesItem[];
};
