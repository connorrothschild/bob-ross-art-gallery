<script></script>

<footer>
  <section class="notes">
    <h2>Notes and data</h2>
    <p>
      This project was built with <a href="https://svelte.dev/">Svelte</a> and
      enhanced by The Pudding's
      <a href="https://github.com/the-pudding/svelte-starter"
        >Svelte Starter template</a
      >. Data is from
      <a href="https://github.com/jwilber/Bob_Ross_Paintings">Jared Wilber</a>
      and underwent
      <a
        href="https://github.com/connorrothschild/bob-ross-art-gallery/blob/master/r/cleaning.R"
        >some processing in R</a
      >. The images of Bob Ross' paintings are from
      <a href="https://www.twoinchbrush.com/">TwoInchBrush</a>
    </p>
    <p>
      Code is available on <a
        href="https://github.com/connorrothschild/bob-ross-art-gallery"
        >GitHub</a
      >. Follow me on <a href="https://twitter.com/CL_Rothschild">Twitter</a>!
    </p>
  </section>
</footer>

<style lang="scss">
  footer {
    display: flex;
    place-items: center;
    background-color: var(--text-main);
    color: white;
    padding: 3rem 1rem;
    min-height: 50vh;
    margin: auto;
  }

  a,
  a:visited,
  a:hover {
    color: var(--background-body);
  }

  .notes {
    max-width: 768px;
    margin: auto;

    h2 {
      font-weight: bold;
      margin-bottom: 2rem;
    }
  }
</style>
