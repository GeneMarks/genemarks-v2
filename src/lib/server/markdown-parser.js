import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';


marked.use({
	headerIds: false,
	mangle: false,
	renderer: {
		image(href, title, text) {
			const titleAttr = title ? `title="${title}"` : '';
			return `<img alt="${text}" src="${href}" ${titleAttr} loading="lazy" />`;
		},
		heading(text, level) {
			const slug = text.toLowerCase().split(' ').join('-');
			return `<h${level} id="${slug}">${text} <a href="#${slug}">#</a></h${level}>`;
		},
		link(href, title, text) {
			const titleAttr = title ? `title="${title}"` : '';
			return `<a target="_blank" href="${href}" ${titleAttr}>${text}</a>`;
		},
	}
});

marked.use(markedHighlight({
	langPrefix: 'hljs language-',
  	highlight(code, lang) {
    	const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    	return hljs.highlight(code, { language }).value;
  	}
}));

export default async (text) => {
    return marked.parse(text);
};