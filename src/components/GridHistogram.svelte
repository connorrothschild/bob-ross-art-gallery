<script>
  import * as d3 from "d3";
  import { fade } from "svelte/transition";
  export let data, height, padding, xScaleHist, yScaleHist, xTicks, yTicks;

  function handleMouseover(e) {
    let d = e.originalTarget.attributes;
    const tip = d3.select(".gridTip");

    tip.html(`<p class='title'>${d.title.value}</p>
              <p class='subtitle'>${d.subtitle.value}</p>
              <img class="painting" src=${d.img.value}></img>`);

    const paintingHeight = parseFloat(tip.style("height"));
    const paintingWidth = parseFloat(tip.style("width"));

    tip
      .style("opacity", 1)
      // Below handles offset on edges of screen
      .style(
        "left",
        (e.clientX > window.innerWidth - paintingWidth
          ? e.layerX - paintingWidth
          : e.layerX) + "px"
      )
      .style(
        "top",
        (e.clientY > window.innerHeight - paintingHeight
          ? e.layerY - paintingHeight
          : e.layerY - 28) + "px"
      );
  }

  function handleMouseout() {
    d3.select(".gridTip").style("opacity", 0);
  }

  function handleTouch(e) {
    let d = e.originalTarget.attributes;

    const tip = d3.select(".gridTip");

    tip.html(`<p class='title'>${d.title.value}</p>
              <p class='subtitle'>${d.subtitle.value}</p>
              <img class="painting" src=${d.img.value}></img>`);

    const xPos = parseFloat(d.x.value);
    const yPos = parseFloat(d.y.value);
    const paintingHeight = parseFloat(tip.style("height"));
    const paintingWidth = parseFloat(tip.style("width"));

    tip
      .style("opacity", 1)
      // Below handles offset on edges of screen
      .style(
        "left",
        (xPos > window.innerWidth / 2 // Right side of screen
          ? xPos - paintingWidth
          : xPos + 25) + "px"
      )
      .style(
        "top",
        (yPos > window.innerHeight * 0.75 // Bottom of screen
          ? yPos - paintingHeight
          : yPos + 25) + "px"
      );
  }
</script>

<!-- X AXIS -->
<g transform="translate(0, {height - padding.bottom})">
  {#if xTicks}
    {#each xTicks as x}
      <g
        class="tick"
        opacity="1"
        transform="translate({xScaleHist(x)},0)"
        transition:fade
      >
        <text fill="currentColor" y="12" dy="1em" x="-{padding.left}">
          {x}
        </text>
      </g>
    {/each}
  {/if}
</g>

<!-- Y AXIS -->
<g transform="translate({padding.left}, 0)">
  {#if yTicks}
    {#each yTicks as y}
      <g
        class="tick"
        opacity="1"
        transform="translate(0, {yScaleHist(y)})"
        transition:fade
      >
        <text fill="currentColor" y="5" dy="1em" x="-{padding.left}">
          {y == 0 ? "" : y + " paintings"}
        </text>
        <line stroke="#cecece" x2={1000} />
      </g>
    {/each}
  {/if}
</g>

<!-- RECTS -->
<g
  on:mouseover|preventDefault={handleMouseover}
  on:mouseout|preventDefault={handleMouseout}
>
  {#each data as d}
    <rect
      title={d.painting_title}
      subtitle={"Season " + d.season + ", episode " + d.episode}
      img={d.img_src}
      class="gridRect"
      fill="grey"
      stroke="white"
    />
  {/each}
</g>

<!-- RECTS -->
<style lang="scss">
  .tick {
    line {
      // stroke: none;
    }

    text {
      font-weight: 200;
      @media screen and (max-width: 768px) {
        font-size: 0.75rem;
      }
    }
  }

  :global(.gridTip .painting) {
    width: 100%;
  }

  :global(.gridTip .title) {
    text-align: center;
    font-weight: normal;
    font-size: 1rem;
    margin: 0.5rem 0 0 0;
    padding: 0 0.1rem;
  }

  :global(.gridTip .subtitle) {
    text-align: center;
    font-weight: 100;
    font-size: 0.75rem;
    margin: 0 0 0.5rem 0;
  }
</style>
