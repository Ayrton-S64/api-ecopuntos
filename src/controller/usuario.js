const conn = require('../service/db');
const jwt = require('jsonwebtoken');


exports.auntenticate = (req, res, next) => {
    if (!req.body) return res.status(404).json({error: 'HTTP Error', message: 'No form data found'})
    
    const values = [req.body.login, req.body.password];
    console.log(values);
    conn.query(
      "CALL sp_login(?)",
      [values],
      function (err, data, fields) {
        if(err) return res.status(500).json({error: err.name, message: err.message, sqlMessage: err.sqlMessage})
        console.log(data);
        const token = jwt.sign({idUser: data[0][0].isUsuario,login: req.body.login}, process.env.TOKEN_SECRET);
        res.status(201).json({
          data: data,
          token:token
        });
      }
    );
};