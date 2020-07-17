const headerTemplate = document.createElement("template");
headerTemplate.innerHTML = `
<link rel="stylesheet" href="./components/appHeader/appHeader.css"/>
<header>
<span>WEB COMPONENTS APP | IMDB MOVIE SEACRH | </span>
<span> <a href="https://eyupucmaz.github.io" target="_blank">  @eyupucmaz</a></span>
</header>
`;
class AppHeader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
	}
}

window.customElements.define("app-header", AppHeader);
