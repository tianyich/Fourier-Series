<script>
    import katexify from "../katexify";
    import {
        integrate,
        calculateCoefficients,
        generateFourierSeries,
        functions,
    } from "./functions.js";
    import * as d3 from "d3";
    import { onMount } from "svelte";

    let sliderValue = 1;
    let selectedFunction = "f1";
    let svg;
    let integral = integrate(Math.sin, 0, Math.PI);
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
            .domain([-10, 10])
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
            .range(-10, 10, 0.1)
            .map((x) => ({ x: x, y: f(x) }));
        svg1.append("path")
            .datum(originalData)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Draw the axes
        const xAxis = d3.axisBottom(xScale).tickValues(d3.range(-10, 10, 1));
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
            .range(-10, 10, 0.1)
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
    <div class="container">
        <section id="intro">
            <h2> Fourier Transform </h2>
            <p>
                The problem is, we now only have Fourier series for function in
                a chosen interval. If we zoom out the plot of function given
                above, we can see that the Fourier series is only valid in the
                interval {@html katexify("[-\\pi, \\pi]")}. and becomes periodic
                outside the interval.
            </p>
        </section>
        <div class="plot-container">
            <div class="plot">
                <div class="buttons">
                    <ul>
                        {#each Object.keys(functions) as key}
                            <li>
                                <button
                                    class="function-button"
                                    on:click={() => selectFunction(key)}
                                >
                                    {@html katexify(functions[key].latex, true)}
                                </button>
                            </li>
                        {/each}
                        <li>
                            <div class="slider-container">
                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    bind:value={sliderValue}
                                    on:input={generatePlot}
                                />
                                <label for="points"
                                    >Number of terms: {sliderValue}</label
                                >
                            </div>
                        </li>
                    </ul>
                </div>

                <svg bind:this={svg} width="700" height="700"></svg>
            </div>

        </div>
        <section id='intro'>
            What if we want to analyze a function that
            is not periodic? This is where the Fourier transform comes in.
            The Fourier transform is a generalization of the Fourier series
            that extend the interval to the real numbers. The Fourier
            transform of a function {@html katexify("f(x)")} is given by:
            {@html katexify(
                "\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x) e^{-2\\pi i x\\xi} dx", true
            )}
            where {@html katexify("\\xi \\in \\mathbb{R}")}.
            To get back to the original function, we can use the inverse Fourier transform:
            {@html katexify(
                "f(x) = \\int_{-\\infty}^{\\infty} \\hat{f}(\\xi) e^{2\\pi i x\\xi} d\\xi", true
            )}
            </section>
    </div>
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
        margin-right: 20px;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 10;
    }

    .slider-container {
        margin-top: 20px;
    }

    .plot {
        display: flex;
        flex-direction: row;
        align-items: start;
    }
    .plot-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #intro {
        background-color: #f9f9f9;
        padding: 20px;
        margin: 40px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    #intro h2 {
        color: #333;
        font-size: 1.5em;
        margin-bottom: 10px;
        
    }
    #intro p {
        color: #666;
        line-height: 1.6;
    }
</style>
