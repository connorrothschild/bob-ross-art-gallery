<script>
  import { scaleLinear } from "d3-scale";
  import { pannable } from "../utils/pannable.js";
  import { painting_index } from "../stores/global.js";

  export let width, height;

  const padding = { top: 0, bottom: 5 };

  const handleWidth = 5;
  const leftBound = -1;

  $: rightBound = width;
  $: xScale = scaleLinear().domain([0, width]).range([0, 402]);

  // Position of the handle itself
  $: pos = xScale.invert($painting_index);

  function setPos(x) {
    if (x > leftBound && x < rightBound) {
      pos = x;
      let i = Math.round(xScale(x));
      painting_index.set(i);
    }
  }
  function handleMove(event) {
    var x = pos + event.detail.dx;
    setPos(x);
  }

  function handleTouch(event) {
    var x = event.changedTouches[0].clientX;
    setPos(x);
  }

  function handleClick(event) {
    var x = event.layerX;
    setPos(x);
  }
</script>

<rect
  class="overlay"
  pointer-events="all"
  width="100%"
  height="100%"
  on:click={handleClick}
  on:touchstart={handleTouch}
  on:touchmove={handleTouch}
/>
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
    width={handleWidth}
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
  .overlay {
    fill: transparent;
  }
</style>
