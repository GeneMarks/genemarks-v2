import tippy, { followCursor } from 'tippy.js'
import 'tippy.js/dist/tippy.css';
import '../styles/tippy.postcss';

tippy.setDefaultProps({
    arrow: false,
    offset: [0, 5],
    theme: 'default',
    plugins: [followCursor],
})

export default (node, options) => {
    const instance = tippy(node, options);

    return {
        destroy() {
            instance.destroy();
        }
    };
};