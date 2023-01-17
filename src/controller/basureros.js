const conn = require('../service/db');

exports.getAllBasureros = (req, res, next)=>{
    console.log(req.params, req.query)
    conn.query("SELECT * FROM basurero WHERE eliminado=0;", (err, data, fields)=>{
        if(err) return res.status(500).json({error: err.name, message: err.message, sqlMessage: err.sqlMessage})
        res.status(200).json({
            status: "success",
            length: (data && data.length)?data.length:0,
            data: data
        })
    })
}

exports.getBasurero = (req, res, next) => {
    if (!req.params.id) {
        return res.status(404).json({error: 'HTTP Error', message: 'No se envio id'})
    }
    conn.query(
        "SELECT * FROM basurero WHERE idBasurero = ?",
        [req.params.id],
        function (err, data, fields) {
        if(err) return res.status(500).json({error: err.name, message: err.message, sqlMessage: err.sqlMessage})
        res.status(200).json({
            status: "success",
            length: (data && data.length)?data.length:0,
            data: data,
        });
        }
    );
};

exports.AddBasurero = (req, res, next)=>{
    if (!req.body) return res.status(404).json({error: 'HTTP Error', message: 'No form data found'})
    
    const values = [req.body.codigo, req.body.activo, req.body.eliminado];
    conn.query(
      "INSERT INTO basurero (codigo, activo, eliminado) VALUES(?)",
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