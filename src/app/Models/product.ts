export interface Product {
  _id: object;
  name: {
    ar: string;
    en: string;
  };
  priceBefore?: number;
  priceAfter: number;
  brand: {
    ar: string;
    en: string;
  };
  quantity: number;
  variety: {
    colors: {
      ar: string[];
      en: string[];
    };
    sizes: {
      ar: string[];
      en: string[];
    };
  };
  photos: string[];
  mainPhoto?: string;
  badges: {
    ar: string[];
    en: string[];
  };
  productDetails: {
    ar?: string;
    en?: string;
  };
  specifications: {
    ar?: string;
    en?: string;
  }[];
  warranty: {
    ar?: string;
    en?: string;
  };
  isActive?: boolean;
  departmentID: string;
  subDepartmentID: string;
  nestedSubDepartment: string;
  sellerID: string;
  createdAt?: Date;
  updatedAt?: Date;
}
