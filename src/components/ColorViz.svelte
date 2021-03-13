<script>
  import { fade } from "svelte/transition";
  import * as d3 from "d3";

  export let data,
    grouped,
    width,
    height,
    padding,
    xScaleBar,
    yScaleBar,
    xScaleTimeline,
    yScaleTimeline,
    xTicks,
    activeStep;

  const num_paintings = 403;
  const unique_colors = grouped.length;

  function handleMouseover(e) {
    let d = e.target.attributes;
    const tip = d3.select(".timelineTip");

    if (d.num) {
      tip.html(
        `<p class='title' style="background: ${d.fill.value}; color: ${d.text_color.value}">${d.background_color.value}: ${d.num.value} uses</p>`
      );
    } else {
      tip.html(
        `<p class='title' style="background: ${d.fill.value}; color: ${d.text_color.value}">${d.background_color.value}</p>`
      );
    }

    tip
      // .transition("tip-in")
      // .duration(200)
      .style("opacity", 1)
      // Below handles offset on edges of screen
      .style("left", e.layerX + "px")
      .style("top", e.layerY - 28 + "px");
  }
  function handleMouseout() {
    d3.select(".timelineTip")
      // .transition("tip-out")
      // .duration(200)
      .style("opacity", 0);
  }
</script>

<!-- X AXIS -->
<g
  transform="translate({-padding.left}, {height -
    padding.bottom -
    padding.top})"
>
  {#if xTicks}
    {#each xTicks as x}
      <g
        class="tick"
        opacity="1"
        transform="translate({xScaleBar(x)},0)"
        transition:fade
      >
        <line stroke="#000" y2="6" y1={-height} />
        <text fill="currentColor" dy="1em" y="9" x={x == 0 ? 4 : null}>
          {x}
        </text>
      </g>
    {/each}
  {/if}
</g>

<!-- CHART (BARCHART) -->
<g on:mouseover={handleMouseover} on:mouseout={handleMouseout}>
  {#each grouped as d}
    <rect
      class="colorBar"
      fill={d.key}
      background_color={d.colors}
      text_color={d.text_color}
      num={d.value.length}
    />
  {/each}
</g>

<!-- CHART (TIMELINE VIEW) -->
<g>
  {#each data as d}
    <rect
      fill={d.color_hex}
      background_color={d.colors}
      text_color={d.text_color}
      class="timelineRect"
      on:mouseover={handleMouseover}
      on:mouseout={handleMouseout}
    />
  {/each}
</g>

<!-- CHART -->
<style lang="scss">
  text {
    font-weight: 300;
    text-anchor: middle;
  }

  .tick {
    line {
      stroke: #cecece80;
    }

    text {
      font-weight: 200;
      @media screen and (max-width: 768px) {
        font-size: 0.75rem;
      }
    }
  }
</style>
