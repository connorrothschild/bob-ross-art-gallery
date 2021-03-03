<!-- <script>
  export let data;
  export let colors;

  // Promise handling of images while new ones load
  const loadImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", (err) => reject(err));
      img.src = url;
    });
</script>

<div class="card">
  <div class="frame">
    {#await loadImage(data.img_src)}
      <img src="./assets/placeholder.png" alt="Placeholder image" />
    {:then}
      <a href={data.youtube_src} target="_blank" rel="noopener noreferrer">
        <img src={data.img_src} alt="A painting titled {data.painting_title}" />
      </a>
    {:catch error}
      <div>{error.message}</div>
    {/await}
  </div>
  <h1>{data.painting_title}</h1>
  <a href={data.youtube_src} target="_blank" rel="noopener noreferrer">
    Season {data.season}, episode {data.episode}
  </a>

  <div class="color-container">
    {#each colors as { color, hex, text_color }}
      <div style="background: {hex}; color: {text_color}" class="color-label">
        {color}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 750px;
    width: 750px;
    padding: 1rem;
    background: white;
    border-radius: 1rem;
    margin: 1rem;
    box-shadow: 1px 1px 10px 1px #cecece;

    @media screen and (max-width: 768px) {
      min-width: auto;
      min-height: auto;
      width: auto;
    }
  }

  .color-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  .color-label {
    display: inline-block;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    box-shadow: 3px 1px 6px 0px #cecece;
    font-size: 0.9rem;
  }

  img {
    height: 332px;
    width: 444px;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 1px 1px 10px 1px #cecece;
  }

  a {
    // text-decoration: none;
    font-weight: 300;
    color: black;
    margin: 0 0 1rem 0;
  }

  .frame {
    background-color: #ddc;
    border: solid 1rem #eee;
    border-bottom-color: #fff;
    border-left-color: #eee;
    border-radius: 2px;
    border-right-color: #eee;
    border-top-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25) inset,
      0 3px 10px 3px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    display: inline-block;
    padding: 1rem;
    position: relative;
    text-align: center;
    &:before {
      border-radius: 2px;
      bottom: 0.2rem;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25) inset;
      content: "";
      left: 0.2rem;
      position: absolute;
      right: 0.2rem;
      top: 0.2rem;
    }
    &:after {
      border-radius: 2px;
      bottom: -0.2rem;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
      content: "";
      left: -0.2rem;
      position: absolute;
      right: -0.2rem;
      top: -0.2rem;
    }
  }
</style> -->
