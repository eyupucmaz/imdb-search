const template = document.createElement("template");

template.innerHTML = `
<link rel="stylesheet" href="./components/movieCard/movieCard.css"/>
<div class="movie-container">
			<div class="image-container">
				<img />
			</div>
      <div class="info">
        <h3 class="title"></h3>
        <p>
          <slot/>
        </p>
				<div class="action_container">
					<i class="isFavourite fa fa-heart"></i>
					<a target="_blank" class="button">IMDB</a>
				</div>
			</div>
</div>
`;

class MovieCard extends HTMLElement {
	constructor() {
		super();

		this.isFavourite = false;

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		setTimeout(() => {
			// Reading attributes info
			this.shadowRoot.querySelector(".title").innerHTML = this.getAttribute(
				"title"
			);
			this.shadowRoot.querySelector("img").src = this.getAttribute("poster");

			this.shadowRoot
				.querySelector(".button")
				.setAttribute(
					"href",
					`https://www.imdb.com/title/${this.getAttribute("imdbID")}/`
				);

			if (this.getAttribute("isFavourite") === "true") {
				this.isFavourite = true;
				this.shadowRoot.querySelector("i.fa").classList.add("is_favourite");
			}
		}, 100);
	}

	favToggle() {
		this.isFavourite = !this.isFavourite;
		if (this.isFavourite) {
			this.shadowRoot.querySelector("i.fa").classList.add("is_favourite");
		} else {
			this.shadowRoot.querySelector("i.fa").classList.remove("is_favourite");
		}
	}

	connectedCallback() {
		this.shadowRoot
			.querySelector(".isFavourite")
			.addEventListener("click", () => this.favToggle());
	}
	disconnectedCallback() {
		this.shadowRoot
			.querySelector(".isFavourite")
			.removeEventListener("click", () => this.favToggle());
	}
}

window.customElements.define("movie-card", MovieCard);
