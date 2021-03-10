<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import "intersection-observer";
  import scrollama from "scrollama";
  import Icon from "./helpers/Icon.svelte";
  import GridHistogram from "./GridHistogram.svelte";
  export let data;

  // SCROLL
  onMount(() => {
    // instantiate the scrollama
    const scroller = scrollama();

    // setup the instance, pass callback functions
    scroller
      .setup({
        step: "#gridSection .step",
      })
      .onStepEnter((response) => {
        activeStep = response.index;
        if (response.index == 0) {
          grid();
        }
        if (response.index == 1) {
          histogram();
        }
        if (response.index == 2) {
          highlight();
        }
      })
      .onStepExit((response) => {
        // { element, index, direction }
      });

    // setup resize event
    window.addEventListener("resize", scroller.resize);
  });

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

  $: xTicks = null;

  $: rectWidth = (width / 19) * 0.95;
  $: rectHeight = (height / 21) * 0.95;
  $: rectX = data.map((d) => xScale(d.gridX));
  $: rectY = data.map((d) => yScale(d.gridY));

  function grid() {
    xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.gridX))
      .range([padding.left, width - padding.right]);
    yScale = d3
      .scaleBand()
      .domain(data.map((d) => d.gridY))
      .range([0, height - padding.bottom - padding.top]);

    xTicks = null;

    rectWidth = (width / 19) * 0.95;
    rectHeight = (height / 21) * 0.95;

    d3.selectAll(".gridRect")
      .data(data)
      .transition("grid")
      .duration(500)
      .delay((d) => d.gridY * d.gridX)
      .attr("x", (d) => xScale(d.gridX))
      .attr("y", (d) => yScale(d.gridY))
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("fill", "grey")
      .attr("stroke", "white");
  }

  function histogram() {
    xScale = d3
      .scaleBand()
      .domain(xDomain)
      .range([padding.left, width - padding.right]);

    xTicks = xScale.domain();

    yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.yPos))
      .range([height - padding.bottom, padding.top]);

    rectWidth = width / d3.max(data, (d) => d.num_colors);
    rectHeight =
      (height - padding.top - padding.bottom) / d3.max(data, (d) => d.yPos);

    rectX = data.map((d) => yScale(d.yPos));
    rectY = data.map((d) => xScale(d.num_colors));

    d3.selectAll(".gridRect")
      .data(data)
      .transition("histogram")
      .duration(500)
      .delay((d) => d.num_colors * 30)
      .attr("x", (d) => xScale(d.num_colors))
      .attr("y", (d) => yScale(d.yPos))
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("fill", "grey")
      .attr("stroke", "white");
  }

  function highlight() {
    d3.selectAll(".gridRect")
      .data(data)
      .transition("highlight")
      .duration(500)
      .delay((d, i) => i)
      .attr("fill", (d) => (d.num_colors == 12 ? "steelblue" : "grey"))
      .attr("stroke", (d) => (d.num_colors == 12 ? "steelblue" : "grey"));
  }

  $: activeStep = 0;
</script>

<div class="scrollama-container">
  <div class="scrollama-graphic">
    <div class="chart" bind:offsetWidth={width} bind:offsetHeight={height}>
      <div class="gridTip" />
      <svg style="width: 100%; height: 100%;">
        <GridHistogram
          {width}
          {height}
          {rectWidth}
          {rectHeight}
          {rectX}
          {rectY}
          {data}
          {padding}
          {xScale}
          {yScale}
          {xTicks}
        />
      </svg>
    </div>
  </div>

  <div class="scrollama-steps" id="gridSection">
    <div class="step" class:active={activeStep == 0} data-step="a">
      <p>
        This is every piece Bob Ross painted in his series <strong
          >The Joy of Painting</strong
        >. Each rectangle
        <svg width="20" height="15">
          <rect width="100%" height="100%" fill="grey" />
        </svg>
        represents a painting. Go ahead and hover
        <Icon name="mouse-pointer" stroke="black" stroke-width="1" />
        over a rectangle to see the painting it represents!
      </p>
    </div>
    <div class="step" class:active={activeStep == 1} data-step="b">
      <p>
        We can organize the pieces by the <strong>number of colors</strong> used
        to paint them.
      </p>
    </div>
    <div class="step" class:active={activeStep == 2} data-step="c">
      <p>
        Most commonly, paintings have <span
          class="highlight-text"
          style="background: steelblue; color: white;">12 colors</span
        >. Of the {data.length} pieces Bob Ross painted, {data.filter(
          (d) => d.num_colors == 12
        ).length} used 12 colors.
      </p>
    </div>
  </div>
</div>

<style lang="scss">
  .gridTip {
    opacity: 0;
    position: absolute;
    background: white;
    border: 0px;
    border-radius: 3px;
    pointer-events: none;
    width: 200px;
  }
</style>
