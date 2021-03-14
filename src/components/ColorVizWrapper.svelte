<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import debounceFn from "lodash.debounce";
  import mapToArray from "../utils/mapToArray";
  import ColorViz from "./ColorViz.svelte";
  import { windowHeight, windowWidth } from "../stores/global.js";

  export let data;

  let DELAY;

  const padding = { top: 0, right: 15, bottom: 30, left: 15 };

  $: width = null;
  $: height = $windowHeight * 0.9;
  $: lastResponse = 0;

  let currWindowHeight = $windowHeight;
  let currWindowWidth = $windowWidth;

  // SCROLL!
  onMount(async () => {
    // instantiate the scrollama
    const scroller = scrollama();

    function handleStepEnter(response) {
      activeStep = response.index;
      if (response.index == 0) {
        response.direction == "down" ? (DELAY = 0) : (DELAY = 1000);
        init(DELAY);
      }
      if (response.index == 1) {
        response.direction == "down" ? (DELAY = 1000) : (DELAY = 0);
        createTimeline(DELAY);
      }
      if (response.index == 2) {
        highlight();
      }
      lastResponse = response;
    }

    // setup the instance, pass callback functions
    scroller
      .setup({
        step: "#colorSection .step",
      })
      .onStepEnter((response) => handleStepEnter(response))
      .onStepExit((response) => {});

    window.addEventListener(
      "resize",
      debounceFn(() => {
        const heightChange = window.innerHeight - currWindowHeight;
        const widthChange = window.innerWidth - currWindowWidth;
        if (widthChange == 0) {
          if ((heightChange > 50) | (heightChange < -50)) {
            handleStepEnter(lastResponse);
            height = $windowHeight * 0.9;
            currWindowHeight = window.innerHeight;
          }
        } else if (widthChange != 0) {
          handleStepEnter(lastResponse);
          currWindowWidth = window.innerWidth;
        }
      }, 200)
    );
    window.addEventListener("resize", debounceFn(scroller.resize, 300));
  });

  const grouped = mapToArray(d3.group(data, (d) => d.color_hex)).sort(
    (a, b) => a.value.length - b.value.length
  );

  for (let i = 0; i < grouped.length; i++) {
    // Lookup and append color name/text color to grouped data
    grouped[i].colors = data.find((d) => d.color_hex == grouped[i].key).colors;
    grouped[i].text_color = data.find(
      (d) => d.color_hex == grouped[i].key
    ).text_color;
  }

  const unique_colors = grouped.length;
  const maxColor = d3.max(grouped, (d) => d.value.length);

  $: xScaleBar = d3
    .scaleLinear()
    .domain([0, maxColor])
    .range([padding.left, width - padding.right]);

  $: yScaleBar = d3
    .scaleBand()
    .domain(grouped.map((d) => d.key))
    .range([height - padding.bottom, padding.top]);

  $: xTicks = xScaleBar.ticks(5);

  // FOR TIMELINE VIEW
  const num_paintings = 403;

  $: xScaleTimeline = d3
    .scaleLinear()
    .domain([0, num_paintings])
    .range([padding.left, width - padding.right]);

  $: yScaleTimeline = d3
    .scaleBand()
    .domain(grouped.map((d) => d.key))
    .range([height - padding.bottom, padding.top]);

  // SCROLL STEPS
  function init(DELAY) {
    d3.selectAll(".timelineRect")
      .data(data)
      .transition("timeline-exit")
      .duration(1000)
      .ease(d3.easeExp)
      .attr("x", 0);

    d3.selectAll(".colorBar")
      .data(grouped)
      .attr("y", (d) => yScaleBar(d.key))
      .attr("x", 0)
      .attr("height", (height / unique_colors) * 0.9)
      .transition("bar-enter")
      .duration(1000)
      .delay(DELAY)
      .ease(d3.easeExp)
      .attr("width", (d) => xScaleBar(d.value.length));
  }

  function createTimeline(DELAY) {
    d3.selectAll(".colorBar")
      .data(grouped)
      .transition("bar-exit")
      .duration(1000)
      .ease(d3.easeExp)
      .attr("width", 0);

    d3.selectAll(".timelineRect")
      .data(data)
      .attr("y", (d) => yScaleTimeline(d.color_hex))
      .attr("opacity", 1)
      .attr("height", (height / unique_colors) * 0.9)
      .transition("timeline-enter")
      .duration(1000)
      .delay(DELAY)
      .ease(d3.easeExp)
      .attr("x", (d) => xScaleTimeline(d.painting_index))
      .attr("width", width / num_paintings);
  }

  function highlight() {
    d3.selectAll(".timelineRect")
      .data(data)
      .transition("timeline-highlight")
      .duration(1000)
      .attr("x", (d) => xScaleTimeline(d.painting_index))
      .attr("y", (d) => yScaleTimeline(d.color_hex))
      .attr("opacity", (d) =>
        (d.color_hex == "#8A3324") | (d.color_hex == "#5F2E1F") ? 1 : 0.3
      )
      .attr("width", width / num_paintings)
      .attr("height", (height / unique_colors) * 0.9);
  }

  $: activeStep = 0;
</script>

<div class="scrollama-container">
  <div class="scrollama-graphic">
    <div class="chart" bind:offsetWidth={width} style="height: {height}px">
      <div class="timelineTip" />
      <svg style="width: 100%; height: 100%;">
        <ColorViz
          {width}
          {height}
          {padding}
          {grouped}
          {data}
          {xScaleBar}
          {xScaleTimeline}
          {yScaleBar}
          {yScaleTimeline}
          {xTicks}
          {activeStep}
        />
      </svg>
    </div>
  </div>

  <div class="scrollama-steps" id="colorSection">
    <div class="step" class:active={activeStep == 0} data-step="a">
      <p>Content.</p>
    </div>
    <div class="step" class:active={activeStep == 1} data-step="b">
      <p>Content.</p>
    </div>
    <div class="step" class:active={activeStep == 2} data-step="c">
      <p>
        Here, we notice patterns. At the end of Season 6, Bob Ross moved away
        from <span
          class="highlight-text"
          style="background: #8A3324; color: white;">Burnt Umber</span
        >
        and moved toward
        <span class="highlight-text" style="background: #5F2E1F; color: white;"
          >Dark Sienna</span
        >.
      </p>
      <p>
        The two colors are similar enough that Ross could easily substitute one
        for the other without much functional difference in his art.
      </p>
    </div>
  </div>
</div>

<style lang="scss">
  .timelineTip {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }

  :global(.timelineTip .title) {
    text-align: center;
    padding: 0.5rem;
    border-radius: 10px;
    box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.5);
  }
</style>
