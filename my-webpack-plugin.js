class MyWebpackPlugin {
    apply(compiler) {
        compiler.plugin('emit', (compilation, callback) => {
            const source = compilation.assert['main.js'].source();

            compilation.assert['main.js'].source = () => {
                const banner = [
                    '/**',
                    '  * hello',
                    '**/'
                ].join('\n');
                return banner + '\n\n' + source;
            }

            callback();
        })
    }
}

module.exports = MyWebpackPlugin;