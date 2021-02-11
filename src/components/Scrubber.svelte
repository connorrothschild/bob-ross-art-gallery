<script>
  import * as d3 from "d3";
  import * as _ from "lodash";
  import Brush from "./Brush.svelte";
  import data from "../data/colors_long.csv";
  import { processData } from "../utils/process.js";

  processData(data, true);

  const unique_colors = new Set([...data.map((d) => d.colors)]).size;
  const num_paintings = 403; // d3.max(data.map(d => d.painting_index));

  const padding = { top: 0, right: 0, bottom: 0, left: 0 };

  let width = 1000;
  let height = 100;

  $: xScale = d3
    .scaleLinear()
    .domain([0, num_paintings])
    .range([padding.left, width - padding.right]);

  $: yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.color_hex))
    .range([height - padding.bottom, padding.top]);
</script>

<div class="chart" bind:offsetWidth={width} bind:offsetHeight={height}>
  <svg style="width: 100%;">
    <g class="rects">
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

<style>
  .chart {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
