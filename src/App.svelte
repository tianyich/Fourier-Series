<script>
    import Title from "./Components/Title.svelte";
    import Plot from "./Components/Plot.svelte";
    import Scrolly from "./Components/Scrolly.svelte";
    import Derivation from "./Components/Derivation.svelte";
    import Application from "./Components/Application.svelte";
    import DFT from "./Components/DFT.svelte";
    import Reference from "./Components/Reference.svelte";
</script>

<main>
    <Title />
    <Plot />
    <Scrolly />
    <Derivation />
    <Application />
    <DFT />
    <Reference />
</main>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
    main {
        margin: 0px;
        font-family: "Roboto", sans-serif;
        padding: 0.5em;
        top: 0px;
        left: 20em;
        right: 20em;
        width: 100%;
        height: 100vh;
        box-sizing: border-box;
        -ms-overflow-style: none;
        scrollbar-width: none;
        margin-bottom: 4em;
    }
    main::-webkit-scrollbar {
        display: none;
    }
</style>
