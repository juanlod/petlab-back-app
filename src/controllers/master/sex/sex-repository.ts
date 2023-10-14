//Created with NoSQLBooster, the essential IDE for MongoDB - https://nosqlbooster.com
export function findAllPaging(regex, offset, pageSize): any {
  return [
    {
      $match: {
        value: regex,
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
        nom: 1,
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
        ids: {
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
        'MAX(ids)': {
          $max: '$ids',
        },
      },
    },
    {
      $project: {
        ids: '$MAX(ids)',
        _id: 0,
      },
    },
  ];
}
