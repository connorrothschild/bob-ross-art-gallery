<script>
  import { scaleLinear, scaleBand } from "d3";
  import * as _ from "lodash";
  import Brush from "./Brush.svelte";

  export let data;

  const unique_colors = new Set([...data.map((d) => d.colors)]).size;
  const num_paintings = 403; // d3.max(data.map(d => d.painting_index));

  const padding = { top: 0, right: 0, bottom: 0, left: 0 };

  let width = null;
  let height = null;

  $: xScale = scaleLinear()
    .domain([0, num_paintings])
    .range([padding.left, width - padding.right]);

  $: yScale = scaleBand()
    .domain(data.map((d) => d.color_hex))
    .range([height - padding.bottom, padding.top]);
</script>

<div bind:offsetWidth={width} bind:offsetHeight={height}>
  <svg style="width: 100%;">
    <g>
      {#each data as d}
        <rect
          width={width / num_paintings}
          height={height / unique_colors}
          fill={d.color_hex}
          x={xScale(d.painting_index)}
          y={yScale(d.color_hex)}
        />
      {/each}
    </g>

    <Brush {width} {height} />
  </svg>
</div>

<style lang="scss">
</style>
