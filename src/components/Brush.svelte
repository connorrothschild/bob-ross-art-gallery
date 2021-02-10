<script>
  import { scaleLinear } from "d3-scale";
  import { pannable } from "../utils/pannable.js";
  import data from "../data/bob_ross_paintings.csv";
  import { ind } from "../stores/global.js";

  export const padding = { top: 100, right: 0, bottom: 10, left: 0 };

  export let width, height;

  var leftmin = padding.right;
  $: leftmax = width - padding.right - handlewidth;

  let left = padding.right;

  let handlewidth = 5;

  $: xScale = scaleLinear()
    .domain([0, width])
    .range([0, data.length - 1]);

  function handlePanLeft(event) {
    var x = left + event.detail.dx;
    if (x > leftmin && x < leftmax) {
      left = x;
      let i = Math.round(xScale(x));
      ind.set(i);
    }
  }
</script>

<!-- <rect class="overlay" pointer-events="all" cursor="crosshair" width="100%" height="100%" on:click={updatePan}></rect> -->

<g
  class="brush"
  fill="none"
  pointer-events="all"
  style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"
>
  <rect
    use:pannable
    on:panmove={handlePanLeft}
    class="handle handle--w"
    cursor="ew-resize"
    x={left}
    y="0"
    width="5"
    {height}
  />
</g>

<!-- <rect class="overlay" pointer-events="all" cursor="crosshair" width="100%" height="100%" on:click={updatePan}></rect> -->
<style>
  .handle {
    visibility: visible;
    stroke: black;
    stroke-width: 1px;
    fill: whitesmoke;
  }

  /* .overlay {
    fill: transparent;
} */
</style>
