if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI:'mongodb://piyush:piyush123@ds151853.mlab.com:51853/crudapp'}
}else{
    module.exports = {mongoURI:'mongodb://localhost:27017/crudapp'}
}