<script></script>

<footer>
<section class="notes">
<h2>Notes and data</h2>
  <p>
    This project was built with <a href="#">Svelte</a> and enhanced by The
    Pudding's <a href="#">Svelte Starter template</a>. Data is from
    <a href="https://github.com/jwilber/Bob_Ross_Paintings">Jared Wilber</a>
    and underwent
    <a
      href="https://github.com/connorrothschild/bob-ross-art-gallery/blob/master/cleaning.R"
      >some processing in R.</a
    >
  </p>
  <p>
    Code is available on <a
      href="https://github.com/connorrothschild/bob-ross-art-gallery">GitHub</a
    >. Follow me on <a href="https://twitter.com/CL_Rothschild">Twitter</a>!
  </p>
</section>
</footer>
<style lang="scss">
    footer {
    display: block;
    background-color: var(--text-main);
    color: var(--background-body);
    font-family: var(--sans);
    padding: 3rem 1rem;
  }

    a,
  a:visited,
  a:hover {
    color: var(--background-body);
  }
  
  .notes {
    max-width: 768px;
    margin: 0 auto;
    padding: 1rem;

    h2 {
        font-weight: bold;
        margin-bottom: 2rem;
    }
  }
</style>
