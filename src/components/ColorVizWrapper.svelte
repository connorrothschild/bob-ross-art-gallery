<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import debounceFn from "lodash.debounce";
  import mapToArray from "../utils/mapToArray";
  import ColorViz from "./ColorViz.svelte";
  import { windowWidth } from "../stores/global.js";

  export let data, height;

  let DELAY;

  const padding = { top: 0, right: 0, bottom: 30, left: 0 };

  $: width = null;
  $: activeStep = 0;
  $: lastResponse = null;

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
        response.direction == "down" ? (DELAY = 0) : (DELAY = 1000);
        init(DELAY);
      }
      if (response.index == 2) {
        response.direction == "down" ? (DELAY = 1000) : (DELAY = 0);
        createTimeline(DELAY);
      }
      if (response.index == 3) {
        highlight("#8A3324", "#5F2E1F");
      }
      if (response.index == 4) {
        highlight("#CD5C5C", null);
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

    function resizeWidth() {
      if (window.innerWidth != currWindowWidth) {
        if (lastResponse) {
          handleStepEnter(lastResponse);
        }
      }
    }

    window.addEventListener("resize", debounceFn(resizeWidth, 200));
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

  $: xTicksBar = xScaleBar.ticks(5);

  // FOR TIMELINE VIEW
  const num_paintings = d3.max(data, (d) => d.painting_index);

  $: xScaleTimeline = d3
    .scaleLinear()
    .domain([0, num_paintings])
    .range([padding.left, width - padding.right]);

  $: yScaleTimeline = d3
    .scaleBand()
    .domain(grouped.map((d) => d.key))
    .range([height - padding.bottom, padding.top]);

  // $: xTicksTimeline = xScaleTimeline.domain();
  $: xTicksTimeline = [
    ...new Set(data.filter((d) => d.episode == 1).map((d) => d.painting_index)),
  ];

  $: console.log(xTicksTimeline);
  // SCROLL STEPS
  function init(DELAY) {
    xTicksBar = xScaleBar.ticks(5);
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

    d3.selectAll(".colorText")
      .data(grouped)
      .attr("y", (d) => yScaleBar(d.key))
      .attr("dy", height / unique_colors / 1.7)
      .attr("fill", (d) =>
        (d.colors == "Indian Red") |
        (d.colors == "Burnt Umber") |
        (d.colors == "Phthalo Green")
          ? "black"
          : d.text_color
      )
      .transition("test")
      .duration(1000)
      .delay(DELAY)
      .ease(d3.easeExp)
      .attr("x", (d) => xScaleBar(d.value.length))
      .attr("dx", (d) =>
        (d.colors == "Indian Red") |
        (d.colors == "Burnt Umber") |
        (d.colors == "Phthalo Green")
          ? "8"
          : "-8"
      )
      .attr("text-anchor", (d) =>
        (d.colors == "Indian Red") |
        (d.colors == "Burnt Umber") |
        (d.colors == "Phthalo Green")
          ? "start"
          : "end"
      );
  }

  function createTimeline(DELAY) {
    xTicksBar = null;
    d3.selectAll(".colorBar")
      .data(grouped)
      .transition("bar-exit")
      .duration(1000)
      .ease(d3.easeExp)
      .attr("width", 0);

    d3.selectAll(".colorText")
      .data(grouped)
      .transition("text-exit")
      .duration(1000)
      .ease(d3.easeExp)
      .attr("x", 0)
      .attr("dx", "-8")
      .attr("text-anchor", "end");

    d3.selectAll(".timelineRect")
      .data(data)
      .attr("y", (d) => yScaleTimeline(d.color_hex))
      .attr("height", (height / unique_colors) * 0.9)
      .transition("timeline-enter")
      .duration(1000)
      .delay(DELAY)
      .ease(d3.easeExp)
      .attr("opacity", 1)
      .attr("x", (d) => xScaleTimeline(d.painting_index))
      .attr("width", width / num_paintings);
  }

  function highlight(color1, color2) {
    d3.selectAll(".timelineRect")
      .data(data)
      .transition("timeline-highlight")
      .duration(1000)
      .attr("x", (d) => xScaleTimeline(d.painting_index))
      .attr("y", (d) => yScaleTimeline(d.color_hex))
      .attr("opacity", (d) =>
        (d.color_hex == color1) | (d.color_hex == color2) ? 1 : 0.3
      )
      .attr("width", width / num_paintings)
      .attr("height", (height / unique_colors) * 0.9);
  }
</script>

<div class="scrollama-container last">
  <div class="scrollama-graphic">
    <div class="chart" bind:offsetWidth={width} style="height: {height}px">
      <div class="timelineTip" />
      <svg style="width: 100%; height: 100%;">
        <ColorViz
          {height}
          {padding}
          {grouped}
          {data}
          {xScaleBar}
          {xScaleTimeline}
          {xTicksBar}
          {xTicksTimeline}
          {yScaleBar}
        />
      </svg>
    </div>
  </div>

  <div class="scrollama-steps" id="colorSection">
    <div class="step" class:active={activeStep == 0} data-step="a">
      <p>
        So, what colors did Bob Ross use most often? This chart shows each color
        used in <em>The Joy of Painting</em>.
      </p>
    </div>
    <div class="step" class:active={activeStep == 1} data-step="b">
      <p>
        Unsurprisingly, the most common color in Bob Ross's palette is a <span
          class="highlight-text"
          style="color: black; background: white; border: 1px solid #cecece"
          >solid white</span
        >.
      </p>
      <p>
        Ross uses a solid, pure white in every painting, as both a base for the
        overall piece (in what he calls <strong>Liquid White</strong>) and
        throughout (in the form of <strong>Titanium White</strong>).
      </p>
    </div>
    <div class="step" class:active={activeStep == 2} data-step="b">
      <p>
        Another way to visualize Ross's use of colors is to look at each
        painting, one by one.
      </p>
      <p>
        Here, each line represents one use of that color in a painting (with the
        paintings arranged chronologically on the X axis).
      </p>
    </div>
    <div class="step" class:active={activeStep == 3} data-step="c">
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
        for the other without much aesthetic difference in his art.
      </p>
    </div>
    <div class="step" class:active={activeStep == 4} data-step="b">
      <p>
        We can also see which colors Bob Ross used least, and <em
          >where they appeared</em
        >.
      </p>
      <p>
        Here, for example, we see Ross's single use of the color <span
          class="highlight-text"
          style="background: #CD5C5C; color: white;">Indian Red</span
        >. That color occurred in one painting: Autumn Images.
      </p>
      <a
        href="https://www.youtube.com/embed/HMx34Am6RFg"
        target="_blank"
        rel="noopener noreferrer"
        class="frame"
        ><img
          class="painting-in-text"
          src="https://www.twoinchbrush.com/images/painting14.png"
          alt="Autumn Images by Bob Ross"
        /></a
      >
    </div>
  </div>
</div>

<style lang="scss">
  .timelineTip {
    opacity: 0;
    position: absolute;
    pointer-events: none;
    text-align: center;
    padding: 0.5rem;
    border-radius: 10px;
    box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.5);
  }

  :global(.timelineTip .title) {
    font-weight: normal;
  }

  :global(.timelineTip .subtitle) {
    font-weight: lighter;
  }

  :global(.painting-in-text) {
    aspect-ratio: 4/3;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 1px 1px 10px 1px #cecece;
    margin: 0 auto;
    max-width: 250px;
  }
</style>
