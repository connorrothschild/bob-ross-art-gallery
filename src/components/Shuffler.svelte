<script>
  import Card from "./Card.svelte";
  import Scrubber from "./Scrubber.svelte";
  import { ind } from "../stores/global.js";

  export let data;

  // How many art pieces there are in the dataset
  const LENGTH = data.length + 1;

  // The selected art piece
  let selected = [];
  // The selected art piece's colors
  let colors = [];
  // The index of the art piece
  // let ind = 0;
  // How many colors there are in the selected art piece
  let colors_length = 0;

  function getTextColor(bgColor) {
    if (!bgColor) {
      return "";
    }
    return parseInt(bgColor.replace("#", ""), 16) > 0xffffff / 2
      ? "#000"
      : "#fff";
  }

  function selectRandom() {
    ind.set(Math.floor(Math.random() * LENGTH));
  }

  function decrement() {
    ind.update((n) => n - 1);
  }

  function increment() {
    ind.update((n) => n + 1);
  }

  $: {
    // Bound ind by the upper limit (data.length) and by 0
    // ind.set(ind > LENGTH | ind < 0 ? 0 : ind)
    selected = data[$ind] ? data[$ind] : data[0];

    // Grab how many colors for the for loop below
    // (The cell value for selected.colors is an array formatted as a string)
    colors_length = selected.colors.length;

    // Reset colors to be blank lest duplication occur
    colors = [];

    // The cell value for selected.colors and selected.color_hex is an array formatted as a string
    for (let i = 0; i < colors_length; i++) {
      colors[i] = { color: selected.colors[i], hex: selected.color_hex[i] };
    }

    // Apply text color function to get proper text color based on background
    colors.forEach(function (d) {
      d.text_color = getTextColor(d.hex);
    });
  }
</script>

<div class="button-container">
  <button on:click={decrement}>Previous</button>
  <button on:click={selectRandom}>Random!</button>
  <button on:click={increment}>Next</button>
</div>

<Card data={selected} {colors} />
<Scrubber />

<style>
  .button-container {
    text-align: center;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
