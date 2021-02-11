<script>
  import { scaleLinear } from "d3-scale";
  import { pannable } from "../utils/pannable.js";
  import { ind } from "../stores/global.js";

  export let width, height;
  
  // const padding = { top: 100, right: 0, bottom: 10, left: 0 };
  const handlewidth = 5;
  const leftBound = -5;
  
  $: pos = 0;
  $: rightBound = width;
  
  $: xScale = scaleLinear()
    .domain([0, width])
    .range([0, 403]);

  function handleMove(event) {
    var x = pos + event.detail.dx;
    if (x > leftBound && x < rightBound) {
      pos = x;
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
    on:panmove={handleMove}
    class="handle"
    cursor="ew-resize"
    x={pos}
    y="0"
    width={handlewidth}
    {height}
  />
</g>

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
