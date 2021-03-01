<script>
  import * as d3 from "d3";
  export let data, width, height, padding, xScale, yScale;

  $: xTicks = xScale.domain();

  function handleMouseover(e) {
    console.log(e.target.attributes.text.value);
  }
</script>

<!-- RECTS (HISTOGRAM) -->
<g>
  {#each data as d}
    <rect
      text={d.painting_title}
      class="rects"
      width={width / d3.max(data, (d) => d.num_colors)}
      height={(height - padding.top - padding.bottom) /
        d3.max(data, (d) => d.yPos)}
      fill="black"
      x={xScale(d.num_colors)}
      y={yScale(d.yPos)}
      on:mouseover={handleMouseover}
    />
  {/each}
</g>

<!-- X AXIS -->
<g transform="translate(0, {height - padding.bottom})">
  {#each xTicks as x}
    <g class="tick" opacity="1" transform="translate({xScale(x)},0)">
      <line stroke="currentColor" y2="6" />
      <text fill="currentColor" y="9" dy="0.71em" x="-{padding.left}">
        {x}
      </text>
    </g>
  {/each}
</g>

<!-- X AXIS -->
<style lang="scss">
  .tick {
    line {
      stroke: none;
    }

    text {
      @media screen and (max-width: 768px) {
        font-size: 0.75rem;
      }
    }
  }
</style>
