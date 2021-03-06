<script>
  import { fade } from "svelte/transition";
  import * as d3 from "d3";

  export let data,
    grouped,
    height,
    padding,
    xScaleBar,
    xScaleTimeline,
    xTicksBar,
    xTicksTimeline,
    yScaleBar;

  function tipper(d) {
    const tip = d3.select(".timelineTip");

    tip.style("background", d.fill.value).style("color", d.text_color.value);
    if (d.num) {
      tip.html(
        `<span class='title'>${d.background_color.value}</span><br/>
         <span class='subtitle'>${d.num.value} ${
          d.num.value == 1 ? "use" : "uses"
        }</span>`
      );
    } else {
      tip.html(`<span class='title'>${d.background_color.value}</span>`);
    }
  }

  function handleMouseover(e) {
    const tip = d3.select(".timelineTip");
    let d = e.currentTarget.attributes;

    tipper(d);

    const xPos =
      e.target.attributes.class.value == "colorBar"
        ? parseFloat(d.width.value)
        : parseFloat(d.x.value);
    const yPos = parseFloat(d.y.value);

    tip
      .style("opacity", 1)
      // Below handles offset on edges of screen
      .style(
        "left",
        (xPos > window.innerWidth * 0.5 ? xPos - 130 : xPos + 5) + "px"
      )
      .style("top", yPos + "px");
  }
  function handleMouseout() {
    d3.select(".timelineTip").style("opacity", 0);
  }
</script>

<!-- X AXIS -->
<g
  transform="translate({-padding.left}, {height -
    padding.bottom -
    padding.top})"
>
  {#if xTicksBar}
    {#each xTicksBar as x}
      <g
        class="tick"
        opacity="1"
        transform="translate({xScaleBar(x)},0)"
        transition:fade
      >
        <line stroke="#cecece" y2="6" y1={-height} />
        <text fill="currentColor" dy="1em" y="9" x={x == 0 ? 4 : null}>
          {x}
        </text>
      </g>
    {/each}
  {:else if xTicksTimeline}
    {#each xTicksTimeline as x}
      <g
        class="tick"
        opacity="1"
        transform="translate({xScaleTimeline(x)},0)"
        transition:fade
      >
        <line
          stroke={((xTicksTimeline.indexOf(x) + 1) % 10 === 0) | (x == 1)
            ? "#adadad"
            : "#cecece50"}
          y2="6"
          y1={-height}
        />
        <text
          fill="currentColor"
          dy="1em"
          y="9"
          style="text-anchor: {x == 1 ? 'start' : 'end'}"
        >
          <!-- Episode {x} -->
          {x == 1
            ? "Season 1"
            : (xTicksTimeline.indexOf(x) + 1) % 10 === 0
            ? `S${xTicksTimeline.indexOf(x) + 1}`
            : ""}
        </text>
      </g>
    {/each}
  {/if}
</g>

<!-- CHART (BARCHART) -->
<g>
  {#each grouped as d}
    <g>
      <rect
        class="colorBar"
        fill={d.key}
        stroke={d.key == "#FFFFFF" ? "#cecece" : null}
        background_color={d.colors}
        text_color={d.text_color}
        num={d.value.length}
        on:mouseover|preventDefault={handleMouseover}
        on:touchend|preventDefault={handleMouseover}
      />

      <text class="colorText" y={yScaleBar(d.key)} text-anchor="end"
        >{d.colors}
      </text>
    </g>
  {/each}
</g>

<!-- CHART (TIMELINE VIEW) -->
<g>
  <!-- Overlay rect that is transparent and triggers mouseout for mobile/touch devices -->
  <rect
    on:touchend|preventDefault={handleMouseout}
    width="100%"
    height="100%"
    fill="transparent"
  />
  {#each data as d}
    <rect
      fill={d.color_hex}
      background_color={d.colors}
      text_color={d.text_color}
      class="timelineRect"
      on:mouseover|preventDefault={handleMouseover}
      on:touchend|preventDefault={handleMouseover}
      on:mouseout|preventDefault={handleMouseout}
    />
  {/each}
</g>

<!-- CHART -->
<style lang="scss">
  text {
    font-weight: 300;
    // text-anchor: middle;
  }

  .tick {
    line {
      // stroke: #cecece52;
    }

    text {
      font-weight: 200;
      @media screen and (max-width: 768px) {
        font-size: 0.75rem;
      }
    }
  }

  .colorText {
    // text-anchor: end;
  }
</style>
