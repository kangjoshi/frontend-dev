module.exports = function myWebpackLoader (content) {
    console.log('myWebpackLoader 동작함');
    return content.replace('console.log(', 'alpha(');
}