<script>
</script>

<div class="hero-background">
  <div class="hero">
    <h1 class="headline">The Bob Ross Virtual Art Gallery</h1>
    <h2 class="subtitle">You deserve some calm.</h2>
    <h3>
      By <a href="https://twitter.com/CL_Rothschild">Connor Rothschild</a>
    </h3>
  </div>
</div>

<style>
  .hero-background {
    background: #1da1f290;
    background: linear-gradient(#1da1f290, var(--background));
  }

  .hero {
    text-align: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    max-width: 1168px;
    margin: 0 auto;
    font-family: var(--serif);
    place-items: center;
    justify-content: center;
  }

  .headline {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 6.5rem;
    padding: 0 1rem;
    color: white;
    line-height: 1.1;
    text-shadow: 1px 1px 2px black;
  }

  .subtitle {
    font-size: clamp(1vw, 2.5rem, 5vw);
    color: black;
    font-weight: 200;
  }

  a {
    color: black;
    text-decoration: none;
    font-weight: 600;
  }

  @media screen and (max-width: 1168px) {
    .headline {
      font-size: 6rem;
    }
  }

  @media screen and (max-width: 968px) {
    .headline {
      font-size: 4.5rem;
    }
  }

  @media screen and (max-width: 668px) {
    .headline {
      font-size: 3.5rem;
    }
    .subtitle {
      font-size: 2rem;
    }
    h3 {
      font-size: 1.4rem;
    }
  }
</style>
