<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import "intersection-observer";
  import scrollama from "scrollama";
  import Icon from "./helpers/Icon.svelte";
  import Histogram from "./Histogram.svelte";
  export let data;

  // SCROLL
  onMount(() => {
    // instantiate the scrollama
    const scroller = scrollama();

    // setup the instance, pass callback functions
    scroller
      .setup({
        step: ".step",
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

  function histogram() {
  xScale = d3
    .scaleBand()
    .domain(xDomain)
    .range([padding.left, width - padding.right]);

  yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.yPos))
    .range([height - padding.bottom, padding.top]);
    
    d3.selectAll(".rects")
      .data(data)
      .transition('restore')
      .duration(500)
      .delay((d, i) => d.num_colors * 30)
      .attr("y", (d) => yScale(d.yPos))
      .attr("x", d => xScale(d.num_colors))
      .attr('width', width / d3.max(data, (d) => d.num_colors))
      .attr('height', (height - padding.top - padding.bottom) /
        d3.max(data, (d) => d.yPos))
      .attr("fill", "grey");
  }
  function highlight() {
    d3.selectAll(".rects")
      .data(data)
      .transition('highlight')
      .duration(500)
      .delay((d, i) => i)
      .attr("fill", (d) => (d.num_colors == 12 ? "steelblue" : "grey"))
  }

  function grid() {
    xScale = d3.scaleBand().domain(data.map(d => d.gridX)).range([padding.left, width - padding.right]);
    yScale = d3.scaleBand().domain(data.map(d => d.gridY)).range([0, height - padding.bottom - padding.top]);

    d3.selectAll(".rects")
      .data(data)
      .transition('grid')
      .duration(500)
      .delay((d, i) => d.num_colors * 30)
      .attr('x', (d) => xScale(d.gridX))
      .attr("y", (d) => yScale(d.gridY))
      .attr('width', (width / 19) * .95)
      .attr('height', (height / 21) * .95)
      .attr("fill", "grey");

  }

  $: activeStep = 0;
</script>

<div class="scrollama-container">
  <div class="scrollama-graphic">
    <div class="chart" bind:offsetWidth={width} bind:offsetHeight={height}>
      <div class="tip" />
      <svg style="width: 100%; height: 100%;">
        <Histogram {width} {height} {data} {padding} {xScale} {yScale} />
      </svg>
    </div>
  </div>

  <div class="scrollama-steps">
    <div class="step" class:active={activeStep == 0} data-step="a">
      <p>This is every piece Bob Ross has painted. Each rectangle 
        <svg width="20" height="15">
					<rect width="100%" height="100%" fill="grey"/>
				</svg>
        represents a painting. Go ahead and hover 
              <Icon name="mouse-pointer"/>
              <!-- <Icon name="crosshair" /> -->
        on a rectangle to see the painting it represents!
      </p>
    </div>
    <div class="step" class:active={activeStep == 1} data-step="b">
      <p>We can organize the pieces by the <strong>number of colors</strong> used to paint them.</p>
    </div>
    <div class="step" class:active={activeStep == 2} data-step="c">
      <p>
        Most commonly, paintings have <span class="highlight">12 colors</span>.
        Of the {data.length} pieces Bob Ross painted, {data.filter(
          (d) => d.num_colors == 12
        ).length} used 12 colors.
      </p>
    </div>
  </div>
</div>

<!-- <button on:click={init}>Init</button>
<button on:click={highlight}>Highlight</button> -->
<style lang="scss">
  /* SCROLLAMA */
  .chart {
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    margin-top: 10vh;
  }

  .step {
    padding: 3%;
    // min-width: 300px;
    width: 90%;
    margin: 30rem auto; // 0 auto 50%
    background-color: whitesmoke;
    border-left: 2px solid #cecece;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #cecece;
    text-align: center;
    line-height: 1.5;
    z-index: 999;
    opacity: 0.85;
    transition: 500ms all ease;
    // border-radius: 3px;

    &.active {
      color: black;
      border-left: 2px solid black;
      box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.12);
      opacity: 1;
      pointer-events: auto;
      background: white;

      .highlight {
        color: white;
        background-position: left;
      }
    }
  }

  .scrollama-container {
    display: flex;
    flex-direction: row-reverse;

    .scrollama-graphic {
      flex: 2;
      height: 95%;
    }
    .scrollama-steps {
      flex: 1;
      z-index: 1000;
    }

    @media screen and (max-width: 968px) {
      flex-direction: column;
      // align-items: center;
      // justify-content: center;
    }

    margin-bottom: 500px;
  }

  .scrollama-graphic {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }

  .highlight {
    font-weight: 600;
    padding: 3px;
    border-radius: 3px;
    /* white-space: nowrap; */
    display: inline-block;
    background: steelblue;
    background: linear-gradient(to left, white 50%, steelblue 50%) right;
    background-size: 200% 1.2em;
    transition: 1s ease-out 200ms;
  }

  .tip {
    opacity: 0;
    position: absolute;
    background: white;
    border: 0px;
    border-radius: 3px;
    pointer-events: none;
    width: 200px;
  }
</style>
