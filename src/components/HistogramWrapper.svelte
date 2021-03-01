<script>
  import * as d3 from "d3";
  import Histogram from "./Histogram.svelte";
  export let data;

  const padding = { top: 0, right: 0, bottom: 30, left: 0 };

  let width = null;
  let height = null;

  // A painting can have between 1 and 15 (maxColors) colors
  // We want an array of 1-15 for our X axis
  //  Using the default data.map(d => d.num_colors).sort((a,b) => a - b) would result in missing numbers (2) to not appear
  const maxColors = d3.max(data, (d) => d.num_colors);
  const xDomain = Array(maxColors)
    .fill()
    .map((element, index) => index + 1);
  $: xScale = d3
    .scaleBand()
    .domain(xDomain)
    .range([padding.left, width - padding.right]);

  $: yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.yPos))
    .range([height - padding.bottom, padding.top]);

  function highlight() {
    d3.selectAll(".rects")
      .data(data)
      .transition()
      .duration(500)
      // .delay((d, i) => i )
      .attr("fill", (d) => (d.num_colors == 12 ? "steelblue" : "black"));
  }

  function init() {
    d3.selectAll(".rects")
      .attr("y", height - padding.bottom)
      .data(data)
      .transition()
      .duration(1000)
      .delay((d, i) => d.num_colors * 30)
      .attr("y", (d) => yScale(d.yPos));
  }
</script>

<button on:click={init}>Init</button>
<button on:click={highlight}>Highlight</button>

<div class="chart" bind:offsetWidth={width} bind:offsetHeight={height}>
  <svg style="width: 100%;">
    <Histogram {width} {height} {data} {padding} {xScale} {yScale} />
  </svg>
</div>

<style lang="scss">
  .chart {
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 768px) {
      margin-bottom: 1rem;
    }
  }
</style>
