//Created with NoSQLBooster, the essential IDE for MongoDB - https://nosqlbooster.com
export function findAllPaging(regex, offset, pageSize): any {
  return [
    {
      $match: {
        name: regex,
        // deleted: false,
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
        // deleted: false,
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
