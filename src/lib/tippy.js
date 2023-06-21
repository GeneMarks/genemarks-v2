import tippy, { followCursor } from 'tippy.js'
import 'tippy.js/dist/tippy.css';
import '../styles/tippy.postcss';

const defaultOptions = {
    arrow: false,
    offset: [0, 5],
    theme: 'default',
    plugins: [followCursor],
};

export default (node, options) => {
    const instance = tippy(
        node, 
        { ...defaultOptions, ...options }
    );

    return {
        destroy() {
            instance.destroy();
        }
    };
};