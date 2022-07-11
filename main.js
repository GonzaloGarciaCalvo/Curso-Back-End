class Usuario {
  constructor (nombre='', apellido='', libros=[], mascotas=[]){
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas 
  }
  getFullName () {
    console.log(`Nombre de usuario: ${this.nombre} ${this.apellido}`)
  }
  addMascota (item) {
    this.mascotas.push(item) 
  }
  countMascotas () {
    console.log(`El usuario tiene ${this.mascotas.length} mascotas`)
  }
  addBook (nombre, autor) {
    this.nombre = nombre;
    this.autor = autor;
    this.libros.push({nombre:this.nombre, autor:this.autor});
  }
  getBookNames () {
    console.log(this.libros.map(item => item.nombre))
  }
}

let usuario = new Usuario ('Pedro', 'Del Coco', [{nombre:"El Tunel", autor:"Sabato"}],["Perro"])
console.log(usuario) 
usuario.getFullName()
usuario.addMascota("Gato")
usuario.countMascotas() 
usuario.addBook("Autobiografia de un Yogui", "Paramahansa Yogananda")
usuario.getBookNames()

