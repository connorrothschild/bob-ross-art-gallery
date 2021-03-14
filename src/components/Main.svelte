<script>
  import Hero from "./prose/Hero.svelte";
  import Intro from "./prose/Intro.svelte";
  import GridHistogramWrapper from "./GridHistogramWrapper.svelte";
  import Gallery from "./Gallery.svelte";
  import ColorVizWrapper from "./ColorVizWrapper.svelte";
  import { processData, getTextColor } from "../utils/process.js";

  import data from "../data/bob_ross_paintings.csv";
  import long_data from "../data/colors_long.csv";
  import { onMount } from "svelte";

  processData(data);
  processData(long_data, true);

  long_data.forEach(function (d) {
    d.text_color = getTextColor(d.color_hex);
  });

  console.log(data);
</script>

<Hero />

<Intro />

<section>
  <GridHistogramWrapper {data} />
</section>

<section>
  <ColorVizWrapper data={long_data} />
</section>

<!-- <section> -->
<Gallery {data} {long_data} />
<!-- </section> -->

<!-- </section> -->
<style lang="scss" global>
  section {
    padding: 1rem;
    margin: 0 auto;

    &.prose {
      max-width: 78ch;
    }

    &.visual {
      max-width: 800px;
    }
  }
</style>
