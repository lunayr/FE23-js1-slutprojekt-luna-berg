const POSTER_IMG_BASE = "https://image.tmdb.org/t/p/w185/";
const FALLBACK_IMG = "./assets/empty.jpg";

export function card(data) {
  let card = $("<sl-card class='card'></sl-card>");

  let image = $(`<img 
        slot="image"
        src="${data.image ? POSTER_IMG_BASE + data.image : FALLBACK_IMG}"
        alt="${data.title}"    
    />`);

  card.append(
    image,
    $(`<strong>${data.title}</strong>`),
    $(`<small>${data.date || "-"}</small>`)
  );

  let tagContainer = $("<div class='tags'></div>");

  if (data.score) {
    let scoreTag = $(`<sl-badge >${data.score.toFixed(1)}</sl-badge>`);
    tagContainer.append(scoreTag);
  }

  if (data.type) {
    let typeTag = $(
      `<sl-badge class="tag-${
        data.type
      }" >${data.type.toUpperCase()}</sl-badge>`
    );
    tagContainer.append(typeTag);
  }

  card.append(tagContainer);

  let link = $(`<a href='${data.url}'></a>`);
  link.append(card);
  return link;
}

// The source of card component from the library that is used to create card() function
// Source: https://shoelace.style/
/**
 * <sl-card class="card-overview">
    <img
        slot="image"
        src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
        alt="A kitten sits patiently between a terracotta pot and decorative grasses."
    />

    <strong>Mittens</strong><br />
    This kitten is as cute as he is playful. Bring him home today!<br />
    <small>6 weeks old</small>

    <div slot="footer">
        <sl-button variant="primary" pill>More Info</sl-button>
        <sl-rating></sl-rating>
    </div>
</sl-card>
 */
