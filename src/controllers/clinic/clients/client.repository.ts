/**
 * Get clients and pets by multi filter words
 * @param regex
 * @param offset
 * @param pageSize
 * @returns
 */
export function getClientListPipeline(
  regex,
  offset,
  pageSize,
  wordsLength,
): any {
  return wordsLength > 1
    ? [
        {
          $lookup: {
            localField: 'idc',
            from: 'mascotas',
            foreignField: 'idc',
            as: 'mascotas',
          },
        },
        {
          $lookup: {
            from: 'client_debts',
            localField: 'idc',
            foreignField: 'clientId',
            as: 'debts',
          },
        },
        {
          $match: {
            ayn: regex,
            mascotas: { $elemMatch: { nom: regex, delete: false } },
          },
        },
        {
          $sort: {
            ayn: 1,
            'mascotas.nom': 1,
          },
        },
        {
          $skip: offset,
        },
        {
          $limit: parseInt(pageSize),
        },
      ]
    : [
        {
          $lookup: {
            localField: 'idc',
            from: 'mascotas',
            foreignField: 'idc',
            as: 'mascotas',
          },
        },
        {
          $lookup: {
            from: 'client_debts',
            localField: 'idc',
            foreignField: 'clientId',
            as: 'debts',
          },
        },
        {
          $match: {
            $or: [
              { ayn: regex },
              { mascotas: { $elemMatch: { nom: regex, delete: false } } },
            ],
          },
        },
        {
          $sort: {
            ayn: 1,
            'mascotas.nom': 1,
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

/**
 * Count the matches
 * @param regex
 * @returns
 */
export function countValues(regex, wordsLength): any {
  return wordsLength > 1
    ? [
        {
          $lookup: {
            localField: 'idc',
            from: 'mascotas',
            foreignField: 'idc',
            as: 'mascotas',
          },
        },

        {
          $match: {
            ayn: regex,
            mascotas: { $elemMatch: { nom: regex, delete: false } },
          },
        },
        {
          $sort: {
            'mascotas.nom': 1,
            ayn: 1,
          },
        },
      ]
    : [
        {
          $lookup: {
            localField: 'idc',
            from: 'mascotas',
            foreignField: 'idc',
            as: 'mascotas',
          },
        },
        {
          $match: {
            $or: [{ ayn: regex }, { mascotas: { $elemMatch: { nom: regex } } }],
          },
        },
        {
          $sort: {
            'mascotas.nom': 1,
            ayn: 1,
          },
        },
      ];
}

export function getLastClientIdPipeline(): any {
  return [
    {
      $group: {
        _id: {},
        'MAX(idc)': {
          $max: '$idc',
        },
      },
    },
    {
      $project: {
        idc: '$MAX(idc)',
        _id: 0,
      },
    },
  ];
}

export function findById(id: string): any {
  return [
    {
      $lookup: {
        localField: 'idc',
        from: 'mascotas',
        foreignField: 'idc',
        as: 'mascotas',
      },
    },
    {
      $match: {
        idc: parseInt(id),
        mascotas: { $elemMatch: { delete: false } },
      },
    },
  ];
}
