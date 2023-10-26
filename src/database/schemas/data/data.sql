-- Ejecutar en base de datos
db.histories.updateMany({ fixed: { $exists: false } }, { $set: { fixed: false } });
