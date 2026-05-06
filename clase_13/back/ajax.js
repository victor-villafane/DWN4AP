function miPromesa() {
    return new Promise((resolve, reject) => {
        const ok = true
        if (ok) {
            resolve("B :)")
        } else {
            reject("B :(")
        }
    })
}
function miPromesa2(algo) {
    return new Promise((resolve, reject) => {
        const ok = true
        if (ok) {
            resolve("B :) " + algo)
        } else {
            reject("B :(")
        }
    })
}


const A = () => console.log("A")
const B = async () => {
    // for( let i = 0; i < 10000000000 ; i++ ){}
    // miPromesa()
    //     .then((mensaje) => miPromesa2(mensaje))
    //     .then( resultado => console.log(resultado))
    //     .catch(err => console.log(err))
    // try {
    //     const mensaje = await miPromesa()
    //     const resultado = await miPromesa2(mensaje)
    //     console.log(resultado)
    // } catch (error) {
    //     console.log(error)
    // }
    // try {
    //     const resultado = await miPromesa()
    //                         .then( mensaje => miPromesa2(mensaje) ) 
    //     console.log(resultado)
    // } catch (error) {
    //     console.log(error)
    // }
    Promise.all([miPromesa(), miPromesa2()])
        .then( (values) => console.log(values) )
}
const C = () => console.log("C")

A()
B()
C()