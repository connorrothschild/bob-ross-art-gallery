<script>
  import { fade } from "svelte/transition";
  import * as d3 from "d3";
  import { identity } from "svelte/internal";

  export let data, grouped, height, padding, xScaleBar, xTicks;

  function handleMouseover(e) {
    let d = e.originalTarget.attributes;
    const tip = d3.select(".timelineTip");

    if (d.num) {
      tip.html(
        `<p class='title' style="background: ${d.fill.value}; color: ${d.text_color.value}">${d.background_color.value}<br>${d.num.value} uses</p>`
      );
    } else {
      tip.html(
        `<p class='title' style="background: ${d.fill.value}; color: ${d.text_color.value}">${d.background_color.value}</p>`
      );
    }

    tip
      .style("opacity", 1)
      // Below handles offset on edges of screen
      .style(
        "left",
        (e.screenX > window.innerWidth * 0.7 ? e.layerX - 130 : e.layerX) + "px"
      )
      .style("top", e.layerY - 28 + "px");
  }
  function handleMouseout() {
    d3.select(".timelineTip").style("opacity", 0);
  }

  function handleTouch(e) {
    let d = e.originalTarget.attributes;
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

    const xPos = parseFloat(d.x.value);
    const yPos = parseFloat(d.y.value);

    tip
      .style("opacity", 1)
      .style(
        "left",
        (xPos > window.innerWidth * 0.5 ? xPos - 125 : xPos + 25) + "px"
      )
      .style("top", yPos - 25 + "px");
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
<g>
  {#each grouped as d}
    <rect
      class="colorBar"
      fill={d.key}
      stroke={d.key == "#FFFFFF" ? "#cecece" : null}
      background_color={d.colors}
      text_color={d.text_color}
      num={d.value.length}
      on:mouseover|preventDefault={handleMouseover}
      on:mouseout|preventDefault={handleMouseout}
      on:touchstart|preventDefault={handleTouch}
      on:touchend|preventDefault={handleMouseout}
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
      on:mouseover|preventDefault={handleMouseover}
      on:mouseout|preventDefault={handleMouseout}
      on:touchstart|preventDefault={handleTouch}
      on:touchend|preventDefault={handleMouseout}
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
