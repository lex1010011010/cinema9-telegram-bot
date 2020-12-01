const arr = ['привет', 'пока', 'пока', 'привет']


// const tt = `Hello ${arr.map(el => {
//     return el.split(' ')
// })
//     }`

// console.log(tt)

const films = require('./films.json')
films.comedy.forEach(element => {
    console.log(element.name)
})

