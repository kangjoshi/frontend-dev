module.exports = function myBabelPlugin() {
    return {
        visitor: {
            Identifier(path) {
                const name = path.node.name;

                console.log('Identifier() name : ', name);

                // 변환 작업
                path.node.name = name.split("").reverse().join("");
            }
        }
    }
}