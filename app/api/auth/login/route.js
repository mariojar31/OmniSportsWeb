const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
import { NextResponse, NextResponse as res} from "next/server";


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSW,
    database: 'users',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  export async function POST(req){
    const {username, password} = await req.json();
    // console.log('Credenciales: ',username, password);
  
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?',[username]);
  
      if (rows.length === 0) {
        return res.json({ message: 'Usuario no encontrado' },{status: 401});
      }
  
      const user = rows[0];
  
      if (await bcrypt.compare(password, user.password)) {
        const payload = { userId: user.id, username:user.username, isAdmin: user.isAdmin }; 
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 });
  
        const serialized = cookie.serialize('token',token,{
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Establece a 'true' en producción (HTTPS)
          sameSite: 'strict',
          maxAge: 3600, // Duración de la cookie en segundos (1 hora)
          path: '/',
        });

        const response = res.json({token});

        response.cookies.set({
            name: "token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Establece a 'true' en producción (HTTPS)
            sameSite: 'strict',
            maxAge: 3600, // Duración de la cookie en segundos (1 hora)
            path: '/',
    })

        return response;
  
      } else {
        return res.json({ message: 'Contraseña incorrecta' },{status: 401});
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      return res.json({ message: 'Error en la autenticación' },{status: 500});
    }
  }
  
 