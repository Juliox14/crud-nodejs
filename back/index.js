const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

const database = "crud_nodejs"
const user = "root"
const host = "localhost"
const password = ""


const db = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
    port: 3306
});

db.connect((err) => {
    if (err) {
        throw err
    } else {
        console.log('Conexión a la base de datos exitosa')
    }
})

const PORT = 3001;



app.use(cors());

app.use(express.json());
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.get('/', (req, res) => {
    res.send({ status: 200 });
})


app.get('/getProductos', (req, res) => {
    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.post('/agregarProducto', (req, res) => {
    const { nombre, marca, categoria, precio } = req.body;
    console.log(req.body)
    const sql = 'INSERT INTO productos (nombre, marca, categoria, precio) VALUES (?, ?, ?, ?)';
    const values = [nombre, marca, categoria, precio];
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.send(result);
    });

})

app.put('/editarProducto', (req, res) => {
    const { id, nombre, marca, categoria, precio } = req.body;
    const sql = `UPDATE productos SET nombre = ?, marca = ?, categoria = ?, precio = ? WHERE id = ?`;
    db.query(sql, [nombre, marca, categoria, precio, id], (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.delete('/eliminarProducto', (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM productos WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

