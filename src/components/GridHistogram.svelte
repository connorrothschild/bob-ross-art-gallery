<script>
  import * as d3 from "d3";
  import { fade } from "svelte/transition";
  import { windowWidth, windowHeight } from "../stores/global.js";
  export let data, height, padding, xScaleHist, yScaleHist, xTicks, yTicks;

  function handleMouseover(e) {
    let d = e.currentTarget.attributes;
    const tip = d3.select(".gridTip");

    tip.html(`<p class='title'>${d.title.value}</p>
              <p class='subtitle'>${d.subtitle.value}</p>
              <img class="painting" src=${d.img.value}></img>`);

    const paintingHeight = parseFloat(tip.style("height"));
    const paintingWidth = parseFloat(tip.style("width"));
    const xPos = parseFloat(d.x.value) - parseFloat(d.width.value);
    const yPos = parseFloat(d.y.value);

    tip
      .style("opacity", 1)
      // Below handles offset on edges of screen
      .style(
        "left",
        (xPos > $windowWidth - paintingWidth ? xPos - paintingWidth : xPos) +
          "px"
      )
      .style(
        "top",
        (yPos > $windowHeight / 2 ? yPos - paintingHeight : yPos + 28) + "px"
      );
  }

  function handleMouseout() {
    d3.select(".gridTip").style("opacity", 0);
  }

  function wtf() {
    console.log("wtf");
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
          {x == 2 ? "" : x == 1 ? "1 color" : x}
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
<g>
  {#each data as d}
    <rect
      title={d.painting_title}
      subtitle={"Season " + d.season + ", episode " + d.episode}
      img={d.img_src}
      class="gridRect"
      fill="grey"
      stroke="white"
      on:mouseout|preventDefault={handleMouseout}
      on:mouseover|preventDefault={handleMouseover}
      on:touchend={handleMouseover}
    />
  {/each}
</g>

<!-- RECTS -->
<style lang="scss">
  .tick {
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
