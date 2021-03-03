<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import "intersection-observer";
  import scrollama from "scrollama";
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
          init();
        }
        if (response.index == 1) {
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

  function init() {
    d3.selectAll(".rects")
      .attr("y", height - padding.bottom)
      .data(data)
      .transition()
      .duration(1000)
      .delay((d, i) => d.num_colors * 30)
      .attr("y", (d) => yScale(d.yPos));
  }

  function highlight() {
    d3.selectAll(".rects")
      .data(data)
      .transition()
      .duration(500)
      // .delay((d, i) => i )
      .attr("fill", (d) => (d.num_colors == 12 ? "steelblue" : "black"));
  }

  $: activeStep = 0;
</script>

<!-- <button on:click={init}>Init</button>
<button on:click={highlight}>Highlight</button> -->

<div class="scrollama-container">
  <div class="scrollama-graphic">
    <div class="chart" bind:offsetWidth={width} bind:offsetHeight={height}>
      <div class="tip"></div>
      <svg style="width: 100%; height: 100%;">
        <Histogram {width} {height} {data} {padding} {xScale} {yScale} />
      </svg>
    </div>
  </div>

  <div class="scrollama-steps">
    <div class="step" class:active={activeStep == 0} data-step="a">
      <p>This is a histogram.</p>
    </div>
    <div class="step" class:active={activeStep == 1} data-step="b">
      <p>
        The most common number of colors per painting is <span class="highlight"
          >12 colors</span
        >.
      </p>
    </div>
    <div class="step" class:active={activeStep == 2} data-step="c" />
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
