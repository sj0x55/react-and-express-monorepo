type DiskItem = Product & {
  pricePerTB: number | null;
  prevPricePerTB: number | null;
  features: {
    capacity?: number;
    capacityUnit?: 'GB' | 'TB';
  };
};

type ListOfDisksProps = {
  data: DiskItem[];
};
