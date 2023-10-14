/**
 * Get Pets and pets by multi filter words
 * @param regex
 * @param offset
 * @param pageSize
 * @returns
 */
export function getPetListPipeline(regex, offset, pageSize, wordsLength): any {
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
            'mascotas.nom': regex,
          },
        },
        {
          $sort: {
            'mascotas.nom': 1,
            ayn: 1,
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
            'mascotas.nom': regex,
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

export function getLastPetIdPipeline(): any {
  return [
    {
      $group: {
        _id: {},
        'MAX(idm)': {
          $max: '$idm',
        },
      },
    },
    {
      $project: {
        idm: '$MAX(idm)',
        _id: 0,
      },
    },
  ];
}
