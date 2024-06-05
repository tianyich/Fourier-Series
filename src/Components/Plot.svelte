<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import katexify from "../katexify";
    import Scrolly from "./Scrolly.svelte";
    import {
        calculateCoefficients,
        generateFourierSeries,
        functions,
    } from "./functions.js"
    let svg;
    let sliderValue = 1;
    let selectedFunction = "f1";
    let scroll_value = 0;
     
    

    const generatePlot = () => {
        const f = (x) => functions[selectedFunction].func(x);
        const svg1 = d3.select(svg);
        svg1.selectAll("path").remove();
        svg1.selectAll("g").remove();
        const width = 700,
            height = 700,
            padding = 5;

        const xScale = d3
            .scaleLinear()
            .domain([-3, 3.2])
            .range([padding, width - padding]);
        const yScale = d3
            .scaleLinear()
            .domain([-3, 3])
            .range([height - padding, padding]);

        // Define the line generator
        const line = d3
            .line()
            .x((d) => xScale(d.x))
            .y((d) => yScale(d.y));

        // Generate the data
        const originalData = d3
            .range(-Math.PI, Math.PI, 0.1)
            .map((x) => ({ x: x, y: f(x) }));
        svg1.append("path")
            .datum(originalData)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Draw the axes
        const xAxis = d3
            .axisBottom(xScale)
            .tickValues(d3.range(-3, 3, 0.5))
            .tickFormat((d) => (d === 0 ? "0" : d3.format(".1f")(d)));
        const yAxis = d3.axisLeft(yScale).tickValues(d3.range(-3, 3.2, 0.5));
        const xAxisGroup = svg1
            .append("g")
            .attr("transform", `translate(0,${yScale(0)})`)
            .call(xAxis);
        const yAxisGroup = svg1
            .append("g")
            .attr("transform", `translate(${xScale(0)},0)`)
            .call(yAxis);
        xAxisGroup
            .selectAll("text")
            .filter((d) => d === 0)
            .attr("text-anchor", "end")
            .attr("dx", "-.8em");
        yAxisGroup
            .selectAll("text")
            .filter((d) => d === 0)
            .style("display", "none");

        const { a, b } = calculateCoefficients(sliderValue, f);
        const data = d3
            .range(-Math.PI, Math.PI, 0.1)
            .map((x) => ({ x: x, y: generateFourierSeries(a, b, x) }));

        svg1.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);
    };

    const selectFunction = (key) => {
        selectedFunction = key;
        generatePlot();
    };
    onMount(generatePlot);
</script>

<main>
    <section>
        <!-- scroll container -->
        <div class="section-container">
            <div class="plot-container" id="plot">
                <div class="plot">
                    <div class="buttons">
                        <ul>
                            {#each Object.keys(functions) as key}
                                <li>
                                    <button
                                        class="function-button"
                                        on:click={() => selectFunction(key)}
                                    >
                                        {@html katexify(
                                            functions[key].latex,
                                            true,
                                        )}
                                    </button>
                                </li>
                            {/each}
                            <li>
                                <div class='slider-container'>
                                <input
                                type="range"
                                min="1"
                                max="30"
                                bind:value={sliderValue}
                                on:input={generatePlot}
                            />
                            <label for="points">Number of terms: {sliderValue}</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                       
                    
                    <svg bind:this={svg} width="700" height="700"></svg>
                </div>
            </div>

            <div class="steps-container">
                <Scrolly bind:value={scroll_value} increments={50}>
                    <div class="step active">
                        <div class="step-content">
                            Pick a function {@html katexify("f(x)")} and an interval
                            {@html katexify("[a,b]")} to calculate the Fourier series.
                            For example, you can choose
                            {@html katexify("f(x) = x^2")} and the interval
                            {@html katexify("[-\\pi, \\pi]")}.
                        </div>
                    </div>
                    <div class="step active">
                        <div class="step-content">
                            Calculate the Fourier coefficient {@html katexify(
                                "\\hat{f}(n)",
                            )} using the formula:
                            {@html katexify(
                                "\\hat{f}(n) = \\frac{1}{T} \\int_{-\\pi}^{\\pi} f(x) e^{-2\\pi inx/ T} dx",
                                true,
                            )}
                            where {@html katexify("T = b - a")} is the length of
                            the interval. We choose the interval {@html katexify(
                                "[-\\pi, \\pi]",
                            )} for easier calculations, thus the formula becomes:
                            {@html katexify(
                                "\\hat{f}(n) = \\frac{1}{2\\pi} \\int_{-\\pi}^{\\pi} f(x) e^{-inx} dx",
                                true,
                            )}
                        </div>
                    </div>
                    <div class="step active">
                        <div class="step-content">
                            Calculate the Fourier series using the formula:
                            {@html katexify(
                                "f(x) \\sim \\sum_{n=-\\infty}^{\\infty} \\hat{f}(n) e^{inx}",
                                true,
                            )}
                        </div>
                    </div>
                    <div class="step active">
                        <div class="step-content">
                            If we expand the formula using Euler's formula {@html katexify(
                                "e^{inx} = \\cos(nx) + i \\sin(nx)",
                            )}, we get:
                            {@html katexify(
                                "f(x) \\sim \\sum_{n=-\\infty}^{\\infty} (a_n \\cos(nx) + b_n \\sin(nx))",
                                true,
                            )}
                            where {@html katexify(
                                "a_n=\\frac{1}{2\\pi} \\int_{-\\pi}^{\\pi} f(x) \\cos(nx) dx",
                                true,
                            )}{@html katexify(
                                "b_n=\\frac{1}{2\\pi} \\int_{-\\pi}^{\\pi} f(x) \\sin(nx) dx",
                                true,
                            )}
                        </div>
                        <div class="spacer"></div>
                    </div></Scrolly
                >
            </div>
        </div>
    </section>
</main>

<style>
    .function-button {
        position: relative;
        top: 10px;
        left: 10px;
        background-color: #4caf50;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 12px;
        transition-duration: 0.4s;
        width: 200px;
        height: 50px;
        overflow: hidden;
        top: 10px;
        left: 10px;
        align-items: center;
        justify-content: center;
        display: flex;
    }

    .function-button:hover {
        background-color: white;
        color: black;
        border: 2px solid #4caf50;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        position: relative;
        align-items: left;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 10;
    }

    .slider-container {
        margin-top: 20px;
    }

    .spacer {
        height: 85vh;
    }

    .plot-container {
        position: sticky;
        top: 10%;
        width: 50%;
        height: 80%;
        border: 3px solid black;
    }

    .section-container {
        margin: 40px;
        text-align: center;
        transition: background 100ms;
        display: flex;
    }

    .step {
        height: 110vh;
        display: flex;
        place-items: end;
        justify-content: center;
    }

    .step-content {
        font-size: 18px;
        background: var(--bg);
        color: #ccc;
        border-radius: 1px;
        padding: 0.5rem 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        transition: background 500ms ease;
        text-align: left;
        width: 75%;
        margin-left: 0;
        max-width: 500px;
        font-family: var(--font-main);
        line-height: 1.3;
        border: 5px solid var(--default);
        display: inline !important;
    }

    .step.active .step-content {
        background: #f1f3f3ee;
        color: var(--squid-ink);
    }

    .steps-container {
        height: 100%;
    }

    .steps-container {
        flex: 1 1 40%;
        z-index: 10;
    }
</style>
