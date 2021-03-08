<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import "intersection-observer";
  import scrollama from "scrollama";
  import mapToArray from "../utils/mapToArray"
  export let data;

   // SCROLL!
  onMount(() => {
    // instantiate the scrollama
    const scroller = scrollama();

    // setup the instance, pass callback functions
    scroller
      .setup({
        step: "#colorSection .step",
      })
      .onStepEnter((response) => {
        activeStep = response.index;
        console.log(activeStep)
        if (response.index == 0) {
        //   grid();
        }
        if (response.index == 1) {
        //   histogram();
        }
        if (response.index == 2) {
        //   highlight();
        }
      })
      .onStepExit((response) => {
        // { element, index, direction }
      });

    // setup resize event
    window.addEventListener("resize", scroller.resize);
  });
  
  const padding = { top: 0, right: 10, bottom: 30, left: 10 };

  let width = null;
  let height = null;

  const grouped = 
    mapToArray(d3.group(data, d => d.color_hex))
    .sort((a, b) => a.value.length - b.value.length)

  const maxColor = d3.max(grouped, d => d.value.length);

  $: xScale = d3
    .scaleLinear()
    .domain([0, maxColor])
    .range([padding.left, width - padding.right]);

  $: yScale = d3
    .scaleBand()
    .domain(grouped.map((d) => d.key))
    .range([height - padding.bottom, padding.top]);

  $: xTicks = null;

  $: activeStep = 0;
</script>

<div class="scrollama-container">
  <div class="scrollama-graphic">
    <div class="chart" bind:offsetWidth={width} bind:offsetHeight={height}>
      <div class="tip" />
      <svg style="width: 100%; height: 100%;">
          <g>
            {#each grouped as d}
                <rect
                width={xScale(d.value.length)}
                height={(height / grouped.length) * .9}
                fill={d.key}
                x={0}
                y={yScale(d.key)}
                />
            {/each}
        </g>
      </svg>
    </div>
  </div>

  <div class="scrollama-steps" id="colorSection">
    <div class="step" class:active={activeStep == 0} data-step="a">
      <p>
        Content.
      </p>
    </div>
    <div class="step" class:active={activeStep == 1} data-step="b">
      <p>
        Content.
      </p>
    </div>
    <div class="step" class:active={activeStep == 2} data-step="c">
      <p>
        Content.
      </p>
    </div>
  </div>
</div>

<style lang="scss">
</style>
