const prod= require('./prod');
const dev=  require('./dev');
console.log(prod);
console.log(dev)
if(process.env.NODE_ENV === 'production'){
    module.exports =prod
}else{
    module.exports =dev
}