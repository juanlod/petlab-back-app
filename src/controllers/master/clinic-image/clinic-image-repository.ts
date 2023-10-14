//Created with NoSQLBooster, the essential IDE for MongoDB - https://nosqlbooster.com
export function findAllPaging(regex, offset, pageSize): any {
  return [
    {
      $match: {
        route: regex,
        $or: [
          {
            deleted: false,
          },
          {
            deleted: null,
          },
        ],
      },
    },
    {
      $sort: {
        route: 1,
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
        $or: [
          {
            deleted: false,
          },
          {
            deleted: null,
          },
        ],
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
