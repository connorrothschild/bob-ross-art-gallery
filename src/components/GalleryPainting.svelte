<script>
  export let selected;

  // Promise handling of images while new ones load
  const loadImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", (err) => reject(err));
      img.src = url;
    });
</script>

<div class="frame">
  {#await loadImage(selected.img_src)}
    <img src="./assets/placeholder.png" alt="Placeholder image" />
  {:then}
    <img
      src={selected.img_src}
      alt="A painting titled {selected.painting_title}"
    />
  {:catch error}
    <div />

  {/await}
</div>

<style lang="scss">
  img {
    aspect-ratio: 4/3;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 1px 1px 10px 1px #cecece;
  }

  a {
    font-weight: 300;
    color: black;
    margin: 0 0 1rem 0;
  }

  .frame {
    background-color: #ddc;
    border: solid 2vmin #eee;
    border-bottom-color: #fff;
    border-left-color: #eee;
    border-radius: 2px;
    border-right-color: #eee;
    border-top-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25) inset,
      0 3px 10px 3px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    display: inline-block;
    margin: 1vh 1vw;
    padding: 1vmin;
    position: relative;
    text-align: center;
    &:before {
      border-radius: 2px;
      bottom: -1vmin;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25) inset;
      content: "";
      left: -1vmin;
      position: absolute;
      right: -1vmin;
      top: -1vmin;
    }
    &:after {
      border-radius: 2px;
      bottom: -2vmin;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
      content: "";
      left: -2vmin;
      position: absolute;
      right: -2vmin;
      top: -2vmin;
    }
  }
</style>
