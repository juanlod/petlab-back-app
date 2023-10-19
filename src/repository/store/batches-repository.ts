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
