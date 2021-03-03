<script>
  export let selected;
  import { ind } from "../stores/global.js";

  // The selected art piece's colors
  let colors = [];

  // How many colors there are in the selected art piece
  let colors_length = 0;

  function getTextColor(bgColor) {
    if (!bgColor) {
      return "";
    }
    return parseInt(bgColor.replace("#", ""), 16) > 0xffffff / 1.5
      ? "#000"
      : "#fff";
  }

  $: {
    // Grab how many colors for the for loop below
    colors_length = selected.colors.length;

    // Reset colors to be blank lest duplication occur
    colors = [];

    // Create color and hex property for the colors object
    for (let i = 0; i < colors_length; i++) {
      colors[i] = { color: selected.colors[i], hex: selected.color_hex[i] };
    }

    // Apply text color function to get proper text color based on background
    colors.forEach(function (d) {
      d.text_color = getTextColor(d.hex);
    });
  }
</script>

<div class="content">
  <div class="title-container">
    <a
      href={selected.youtube_src}
      target="_blank"
      rel="noopener noreferrer"
      class="subtitle"
    >
      Season {selected.season}, episode {selected.episode}
    </a>
    <h1 class="title">{selected.painting_title}</h1>
    <h3 class="subtitle">By Bob Ross</h3>
    <div class="purchase-container">
      <button>
        <a
          href={selected.youtube_src}
          target="_blank"
          rel="noopener noreferrer"
          class="subtitle">Sales inquiry</a
        ></button
      >
      <button
        style="margin: 0 auto"
        on:click={() => {
          ind.set(Math.floor(Math.random() * 403));
        }}>Show me another</button
      >
    </div>
  </div>
  <div class="color-container">
    <h3>Colors used</h3>
    <div class="colors">
      {#each colors as { color, hex, text_color }}
        <div style="background: {hex}; color: {text_color}" class="color-label">
          {color}
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 1rem;

    a {
      text-decoration: none;
      color: black;
      font-weight: lighter;
    }
  }

  .title-container {
    margin-top: 2rem;

    .title {
      margin: 0.5rem 0 0.25rem 0;
    }

    .subtitle {
      margin-top: 0;
      font-weight: normal;
      font-size: 1rem;
    }
  }

  .purchase-container {
    margin-top: 4rem;

    button {
      text-transform: uppercase;
      font-weight: lighter;
      letter-spacing: 1px;
      margin-right: 0.5rem;

      a {
        font-weight: lighter !important;
      }
    }
  }

  .colors {
    display: flex;
    flex-direction: row;
    justify-content: left;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .color-label {
    display: inline-block;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    box-shadow: 3px 1px 6px 0px #cecece;
    font-size: 0.9rem;
  }
</style>
