<script></script>

<footer>
  <section class="notes">
    <h2>Notes and data</h2>
    <p>
      <b>This project is in no way affiliated with Bob Ross, Inc.</b>
    </p>
    <p>
      Built with <a href="https://svelte.dev/">Svelte</a>,
      <a href="https://github.com/the-pudding/svelte-starter">Svelte Starter</a
      >, and
      <a href="https://github.com/russellgoldenberg/scrollama">Scrollama</a>.
      Data is from
      <a href="https://github.com/jwilber/Bob_Ross_Paintings">Jared Wilber</a>
      and underwent
      <a
        href="https://github.com/connorrothschild/bob-ross-art-gallery/blob/master/r/cleaning.R"
        >some processing in R</a
      >. The images of Bob Ross' paintings are from
      <a href="https://www.twoinchbrush.com/">TwoInchBrush</a>.
    </p>
    <p>
      Code is available on <a
        href="https://github.com/connorrothschild/bob-ross-art-gallery"
        >GitHub</a
      >. Questions? Reach out on
      <a href="https://twitter.com/CL_Rothschild">Twitter</a>!
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
    font-family: var(--serif);
  }

  a {
    color: var(--selection);
  }

  a:hover {
    text-decoration: underline;
  }

  .notes {
    max-width: 768px;
    margin: auto;

    h2 {
      font-weight: 400;
      margin-bottom: 2rem;
    }

    p {
      font-family: var(--sans);
    }

    b {
      font-family: var(--serif);
      font-weight: 600;
    }
  }
</style>
