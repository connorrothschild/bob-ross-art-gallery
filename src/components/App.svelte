<script>
  import Meta from "./Meta.svelte";
  import Window from "./helpers/Window.svelte";
  import Header from "./prose/Header.svelte";
  import Main from "./Main.svelte";
  import Footer from "./prose/Footer.svelte";
</script>

<Meta />

<Window />

<Main />

<Footer />

<style lang="scss" global>
/* SCROLLAMA */
.chart {
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    margin-top: 10vh;
}

.step {
    padding: 3%;
    // min-width: 300px;
    width: 90%;
    margin: 30rem auto; // 0 auto 50%
    background-color: whitesmoke;
    border-left: 2px solid #cecece;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #cecece;
    text-align: center;
    line-height: 1.5;
    z-index: 999;
    opacity: 0.85;
    transition: 500ms all ease;
    // border-radius: 3px;

    &.active {
        color: black;
        border-left: 2px solid black;
        box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.12);
        opacity: 1;
        pointer-events: auto;
        background: white;

        .highlight {
            color: white;
            background-position: left;
        }
    }
}

.scrollama-container {
    display: flex;
    flex-direction: row-reverse;

    .scrollama-graphic {
        flex: 2;
        height: 95%;
    }

    .scrollama-steps {
        flex: 1;
        z-index: 1000;
        pointer-events: none;
    }

    @media screen and (max-width: 968px) {
        flex-direction: column;
        // align-items: center;
        // justify-content: center;
    }

    margin-bottom: 500px;
}

.scrollama-graphic {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}
</style>
