import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const packageJson = require('./package.json');

export default {
    external: ['react', 'react-dom'],
    input: 'src/index.ts',
    watch: {
        include: 'src/**',
    },
    output: [
        {
            // file: '../modal-demo/src/Modal/index.js',
            file: 'build/index.js',
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        typescript({ useTsconfigDeclarationDir: true }),
        postcss({
            plugins: [autoprefixer()],
            minimize: true,
        }),
        terser(),
    ],
};
