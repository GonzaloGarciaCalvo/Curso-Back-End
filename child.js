const random = (cant) => {
  let numbersArr = []
  let numObject = {}
  for (let i=0; i <= cant; i++) {
     numbersArr.push(Math.floor(Math.random()*1000+1))
  }

 /*  for (const num of numbersArr) {
      numObject[num]
          ? numObject[num]++
          : numObject[num] = 1
  } */
  for (const num of numbersArr) {
        if (numObject[num]) {
          /* numObject[num]++ */
          numObject[num] += numObject[num]
        } else {
          numObject[num] = 1
        }

}
  
  return numObject
}

process.on('message', (cant) => {
  const respuesta = random(cant)
  process.send(respuesta)
})