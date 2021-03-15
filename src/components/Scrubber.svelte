<script>
  import * as d3 from "d3";
  import * as _ from "lodash";
  import Brush from "./Brush.svelte";
  import mapToArray from "../utils/mapToArray";
  import { hoveredColor } from "../stores/global.js";

  export let data;

  const unique_colors = new Set([...data.map((d) => d.colors)]).size;
  const num_paintings = 403; // d3.max(data.map(d => d.painting_index));

  // Domain is in order of frequency
  const yDomain = mapToArray(d3.group(data, (d) => d.color_hex))
    .sort((a, b) => a.value.length - b.value.length)
    .map((d) => d.key);

  const padding = { top: 0, right: 0, bottom: 0, left: 0 };

  let width = null;
  let height = null;

  $: xScale = d3
    .scaleLinear()
    .domain([0, num_paintings])
    .range([padding.left, width - padding.right]);

  $: yScale = d3
    .scaleBand()
    .domain(yDomain)
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
          opacity={$hoveredColor
            ? d.color_hex == $hoveredColor
              ? 1
              : 0.2
            : null}
          x={xScale(d.painting_index)}
          y={yScale(d.color_hex)}
        />
      {/each}
    </g>

    <Brush {width} {height} />
  </svg>
</div>

<style lang="scss">
  rect {
    transition: opacity 400ms linear;
  }
</style>
