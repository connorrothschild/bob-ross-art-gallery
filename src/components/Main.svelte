<script>
  import Hero from "./Hero.svelte";
  import GridHistogramWrapper from "./GridHistogramWrapper.svelte";
  import Gallery from "./Gallery.svelte";
  import ColorViz from "./ColorViz.svelte";
  import { processData } from "../utils/process.js";

  import copyData from "../data/copy.json";
  import data from "../data/bob_ross_paintings.csv";
  import long_data from "../data/colors_long.csv";

  processData(data);
  processData(long_data, true);

  console.log(data);
</script>

<Hero />

<section class="prose">
  <p>{copyData.paragraph1}</p>
</section>

<section>
  <GridHistogramWrapper {data} />
</section>

<section>
  <ColorViz data={long_data} />
</section>

<!-- <section> -->
<Gallery {data} {long_data} />
<!-- </section> -->


<!-- </section> -->
<style lang="scss">
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
