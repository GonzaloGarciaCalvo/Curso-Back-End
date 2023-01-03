const nodemailer = require('nodemailer')

const TEST_MAIL = 'hans.swift@ethereal.email'

const mailerFunction = (name, email, order)=> {

    const prods = order.productos.map((item) => {
			item = {
				nombre:item.nombre,
				precio:item.precio,
				cantidad:item.cantidad,
			};
			return `<tr>
                        <td>
                            ${item.nombre}
                        </td>
                        <td>
                            ${item.precio}
                        </td>
                        <td>
                            ${i.cantidad}
                        </td>
                    </tr>`;
	});
    const items = JSON.stringify(prods);

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: TEST_MAIL,
            pass: "aNy6M9G93fMZmMfynN",
        },
    });
    /* const transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: 'gonzagc22@gmail.com',
            pass: 'cseirmuzpjkyfcyz'
        }
     }); */
    
    
    const mailOptions = {
        from: 'Servidor Node.js',
        to: `${email}`,
        subject: 'Nuevo Pedido',
        html: `<h1 style="color: blue;">Nuevo pedido de ${name}</h1>
              <h2 >Email: ${email}</h2> 
        `
    };
    
        (async () => {
                try {
                    const info = await transporter.sendMail(mailOptions);
                    console.log(info);
                } catch (error) {
                    console.log(error);
                }
        })();

}

module.exports = mailerFunction