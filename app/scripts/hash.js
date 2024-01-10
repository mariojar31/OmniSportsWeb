import bcrypt from 'bcrypt';


export async function hashfunct(psw) {
    const contraseña = await bcrypt.hash(psw, await bcrypt.genSalt(10));
    console.log(contraseña);
    return contraseña;
}

