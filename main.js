const Contenedor = require("./claseContenedor");
const contenedor = new Contenedor('./prueba.txt');



/* contenedor.save({ nombre: 'Remera Azul', categoria: 'remera', precio: 4100 }) */
/* contenedor.save({ nombre: 'Remera Roja', categoria: 'remera', precio: 4110 })  */
/* contenedor.save({ nombre: 'Remera Gris', categoria: 'remera', precio: 4100 })  */
contenedor.getById(1)
contenedor.getAll() 
contenedor.deleteById(2)
contenedor.deleteAll()

/***********************************************************************
 *  Si llamo en una misma ejecucion mas de 1 linea de contenedor.save, *
 *  hay errores en la escritura, incerta }] de mas                     * 
 ***********************************************************************/



