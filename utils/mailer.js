const nodemailer = require('nodemailer')

const TEST_MAIL = 'hans.swift@ethereal.email'
const EMAIL = 'gonzagc22@gmail.com'

// const mailerFunction = (name, email, order)=> {

//     const prods = order.productos.map((item) => {
// 			item = {
// 				nombre:item.nombre,
// 				precio:item.precio,
// 				cantidad:item.cantidad,
// 			};
// 			return `<tr>
//                         <td>
//                             ${item.nombre}
//                         </td>
//                         <td>
//                             ${item.precio}
//                         </td>
//                         <td>
//                             ${i.cantidad}
//                         </td>
//                     </tr>`;
// 	});
//     const items = JSON.stringify(prods);

    // const transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     auth: {
    //         user: TEST_MAIL,
    //         pass: "aNy6M9G93fMZmMfynN",
    //     },
    // });
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: 'gonzagc22@gmail.com',
            pass: 'cseirmuzpjkyfcyz'
        }
    });
    
    
//     const mailOptions = {
//         from: 'Servidor Node.js',
//         to: `${email}`,
//         subject: 'Nuevo Pedido',
//         html: `<h1 style="color: blue;">Nuevo pedido de ${name}</h1>
//               <h2 >Email: ${email}</h2> 
//         `
//     };
    
//         (async () => {
//                 try {
//                     const info = await transporter.sendMail(mailOptions);
//                     console.log(info);
//                 } catch (error) {
//                     console.log(error);
//                 }
//         })();
// }

const mailOrden = async (user, order) => {
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
                            ${item.cantidad}
                        </td>
                    </tr>`;
	});
    const items = JSON.stringify(prods);
    try {
        const info = await transporter.sendMail({
            to: user,
            from: EMAIL,
            subject: "Nueva orden generada de Puzzles",
            html: `
                <style>
                    .tableProds {
                        border: 1px solid #C0C0C0;
                        border-collapse: collapse;
                        padding: 5px;
                    }
                
                    .tableProds th {
                        border: 1px solid #C0C0C0;
                        padding: 5px;
                        background: #F0F0F0;
                    }
                
                    .tableProds td {
                        border: 1px solid #C0C0C0;
                        padding: 5px;
                    }
                </style>
                <div width="350" height="150" align="center" style="border-radius: 50%;">
                    <img src="http://www.pickmaid.com/dubai/assets/images/success-icon.png" width="60" height="60"
                    style="padding-top:5px" alt="" border="0" />
                </div>
                <h3> Le informamos que se ha confirmado la orden de compra realizada con los siguientes datos:</h3> 
                <p> Orden número: ${order.numero} </p>
                <p> Productos: </p>
                <table class="tableProds">
                <thead>
                    <tr>
                    <th>Item</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                ${prods} 
                </tbody>
                    </table> 
                <p> Total: $ ${order.total} </p>
                <p> Desde ya muchas gracias por su compra. Cualquier duda o consulta no dude en contactarnos.</p>
                
                `,
        });
        console.log(`Se genero el envio de mail de la orden: ${order.numero}`);
    } catch (error) {
        console.log(`Error en el envio de la orden: ${error}`);
    } finally {
        console.log("Order creada");
    }
    };

module.exports = mailOrden;
  



/* module.exports = mailerFunction */