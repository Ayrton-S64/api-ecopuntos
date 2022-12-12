const conn = require('../service/db');

exports.getAllEstudiantes = (req, res, next)=>{
    console.log('consultando estudiantes')
    console.log(req.params, req.query)
    conn.query("SELECT * FROM estudiante", (err, data, fields)=>{
        if(err) return res.status(500).json({error: err.name, message: err.message, sqlMessage: err.sqlMessage})
        res.status(200).json({
            status: "success",
            length: data.length,
            data: data
        })
    })
}

exports.getEstudiante = (req, res, next) => {
    console.log('consultando estudiante')
    if (!req.params.codigo) {
        return res.status(404).json({error: 'HTTP Error', message: 'No se envio codigo'})
    }
    conn.query(
        "SELECT * FROM estudiante WHERE codmatricula = ?",
        [req.params.codigo],
        function (err, data, fields) {
        if(err) return res.status(500).json({error: err.name, message: err.message, sqlMessage: err.sqlMessage})
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
        }
    );
};

exports.AddEstudiante = (req, res, next)=>{
    if (!req.body) return res.status(404).json({error: 'HTTP Error', message: 'No form data found'})
    
    const values = [req.body.nombre, req.body.codmatricula];
    conn.query(
      "INSERT INTO estudiante (nombre, codmatricula) VALUES(?)",
      [values],
      function (err, data, fields) {
        if(err) return res.status(500).json({error: err.name, message: err.message, sqlMessage: err.sqlMessage})
        res.status(201).json({
          status: "success",
          message: "Estudiante registrado",
        });
      }
    );
}