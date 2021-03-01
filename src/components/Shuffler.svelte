<script>
  import Card from "./Card.svelte";
  import Scrubber from "./Scrubber.svelte";
  import { ind } from "../stores/global.js";

  export let data;

  // How many art pieces there are in the dataset
  const LENGTH = data.length - 1;

  // The selected art piece
  let selected = [];

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
    selected = data[$ind] ? data[$ind] : data[0];

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

<Scrubber />
<div class="button-container">
  <button
    on:click={() => {
      ind.update((n) => (n - 1 < 0 ? 0 : n - 1));
    }}
    class={$ind === 0 ? "disabled" : ""}
  >
    Previous
  </button>
  <Card data={selected} {colors} />
  <button
    on:click={() => {
      ind.update((n) => (n + 1 > LENGTH ? LENGTH : n + 1));
    }}
    class={$ind === LENGTH ? "disabled" : ""}
  >
    Next
  </button>
</div>
<div class="button-container">
  <button
    style="margin: 0 auto"
    on:click={() => {
      ind.set(Math.floor(Math.random() * LENGTH));
    }}>Random!</button
  >
</div>

<style lang="scss">
  .button-container {
    text-align: center;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }

  button {
    height: 50px;
    width: 200px;
    margin: auto 0;
    background: white;
    box-shadow: 1px 1px 3px 1px #cecece;

    @media screen and (max-width: 768px) {
      margin: 0 auto;
    }

    &.disabled {
      cursor: not-allowed;
      background: #e4e4e4;
      color: #a8a8a8;
      box-shadow: none;
    }
  }
</style>
