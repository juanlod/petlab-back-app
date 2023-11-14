//Created with NoSQLBooster, the essential IDE for MongoDB - https://nosqlbooster.com
export function findAllPagingProducts(regex, offset, pageSize): any {
  return [
    {
      $lookup: {
        localField: 'products.typeProductId',
        from: 'product_types',
        foreignField: 'id',
        as: 'product_types',
      },
    },
    {
      $unwind: {
        path: '$product_types',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        name: regex,
      },
    },
    {
      $project: {
        product_types_docs: 0,
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
    {
      $skip: offset,
    },
    {
      $limit: parseInt(pageSize),
    },
  ];
}

export function countValues(): any {
  return [
    {
      $match: {
        id: {
          $ne: null,
        },
        deleted: false,
      },
    },
    {
      $group: {
        _id: null,
        length: {
          $sum: 1,
        },
      },
    },
  ];
}

export function getLastByIdPipeline(): any {
  return [
    {
      $group: {
        _id: {},
        'MAX(id)': {
          $max: '$id',
        },
      },
    },
    {
      $project: {
        id: '$MAX(id)',
        _id: 0,
      },
    },
  ];
}
