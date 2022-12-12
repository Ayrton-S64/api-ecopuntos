const conn = require('../service/db');

exports.getAllBeneficios = (req, res, next)=>{
    console.log(req.params, req.query)
    conn.query("SELECT * FROM beneficios", (err, data, fields)=>{
        if(err) return res.status(500).json({error: err.name, message: err.message, sqlMessage: err.sqlMessage})
        res.status(200).json({
            status: "success",
            length: data.length,
            data: data
        })
    })
}

exports.getBeneficio = (req, res, next) => {
    if (!req.params.id) {
        return res.status(404).json({error: 'HTTP Error', message: 'No se envio id'})
    }
    conn.query(
        "SELECT * FROM beneficios WHERE idBeneficio = ?",
        [req.params.id],
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

exports.AddBeneficio = (req, res, next)=>{
    if (!req.body) return res.status(404).json({error: 'HTTP Error', message: 'No form data found'})
    
    const values = [req.body.descripcion, req.body.puntos];
    conn.query(
      "INSERT INTO beneficios (descripcion, puntos) VALUES(?)",
      [values],
      function (err, data, fields) {
        if(err) return res.status(500).json({error: err.name, message: err.message, sqlMessage: err.sqlMessage})
        res.status(201).json({
          status: "success",
          message: "Beneficio registrado",
        });
      }
    );
}