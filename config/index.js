const prod = require('./prod');
const dev =  require('./dev');

console.log(prod)
if(process.env.NODE_ENV === 'production'){
    module.exports =prod
}else{
    module.exports =dev
}