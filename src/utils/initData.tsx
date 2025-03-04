export const orderByLists = [
  {
    name: 'ASC',
    value: 'asc',
  },
  {
    name: 'DESC',
    value: 'desc',
  },
];

export const orderStatusLists = [
  {
    name: 'Pending',
    value: 0,
  },
  {
    name: 'Shipping',
    value: 1,
  },
  {
    name: 'Completed',
    value: 2,
  },
];

export const statusList = [
  {
    name: 'Active',
    value: 1,
  },
  {
    name: 'In Active',
    value: 0,
  },
];

export type imageBannerT = {
  value: File | null;
  path: string;
};

export const imageBannerData = {
  value: null,
  path: '',
};
