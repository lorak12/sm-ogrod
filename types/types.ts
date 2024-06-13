type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

type Detail = {
  id: string;
  name: string;
  value: string;
  productId: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  views: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};

type ProductWithDetailsAndCategory = Product & {
  category: Category;
  details: Detail[];
};
