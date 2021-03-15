<script>
  import { scaleLinear } from "d3-scale";
  import { pannable } from "../utils/pannable.js";
  import { painting_index } from "../stores/global.js";

  export let width, height;

  const padding = { top: 0, bottom: 5 };

  const handlewidth = 5;
  const leftBound = -1;

  $: rightBound = width;
  $: xScale = scaleLinear().domain([0, width]).range([0, 403]);

  // Position of the handle itself
  $: pos = xScale.invert($painting_index);

  function handleMove(event) {
    var x = pos + event.detail.dx;
    if (x > leftBound && x < rightBound) {
      pos = x;
      let i = Math.round(xScale(x));
      painting_index.set(i);
    }
  }
</script>

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
    height={height - padding.bottom - padding.top}
  />
</g>

<style>
  .handle {
    visibility: visible;
    stroke: black;
    stroke-width: 1px;
    fill: whitesmoke;
  }
</style>
