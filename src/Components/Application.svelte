<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import katexify from "../katexify";
    let matrix = [
            [
                255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
                255, 255, 255, 255, 255,
            ],
            [
                255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 255,
                255, 255, 255, 255,
            ],
            [
                255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 91, 91, 91, 0,
                255, 255, 255, 255,
            ],
            [
                255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 91, 91,
                0, 255, 255, 255,
            ],
            [
                255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 180, 255, 255,
                255, 180, 0, 255, 255,
            ],
            [
                255, 255, 0, 0, 255, 255, 255, 255, 255, 0, 255, 255, 0, 255,
                255, 0, 255, 255,
            ],
            [
                255, 0, 180, 180, 0, 0, 255, 255, 255, 0, 255, 255, 0, 255, 192,
                192, 0, 255,
            ],
            [
                255, 0, 180, 255, 255, 0, 0, 0, 0, 180, 255, 255, 255, 255, 255,
                0, 255, 255,
            ],
            [
                255, 0, 180, 255, 255, 255, 255, 180, 180, 255, 255, 255, 255,
                255, 255, 0, 255, 255,
            ],
            [
                255, 0, 0, 180, 180, 255, 255, 255, 180, 255, 255, 255, 255,
                255, 255, 180, 0, 255,
            ],
            [
                255, 0, 180, 180, 180, 0, 0, 180, 180, 255, 255, 255, 255, 255,
                255, 255, 0, 255,
            ],
            [
                255, 0, 180, 180, 180, 0, 255, 255, 255, 255, 0, 255, 255, 255,
                255, 255, 0, 255,
            ],
            [
                255, 255, 0, 180, 180, 180, 0, 0, 0, 0, 255, 0, 255, 255, 255,
                180, 0, 255,
            ],
            [
                255, 255, 255, 0, 180, 180, 180, 180, 180, 255, 255, 255, 255,
                180, 180, 0, 255, 255,
            ],
            [
                255, 255, 255, 255, 0, 0, 180, 0, 180, 180, 180, 180, 180, 0, 0,
                255, 255, 255,
            ],
            [
                255, 255, 255, 255, 255, 255, 0, 106, 0, 0, 0, 0, 0, 255, 255,
                255, 255, 255,
            ],
            [
                255, 255, 255, 255, 255, 255, 0, 106, 192, 192, 0, 192, 0, 255,
                255, 255, 255, 255,
            ],
            [
                255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
                255, 255, 255, 255, 255,
            ],
        ];
    let new_matrix = JSON.parse(JSON.stringify(matrix));
    console.log(new_matrix);
    let kernel = [
        [0.05, 0.1, 0.05],
        [0.1, 0.4, 0.1],
        [0.05, 0.1, 0.05],
    ];
    let svg;
    let svg1;
    let step = 0;
    let size = 18;
    let animate;

    const generateGraph = () => {
        const cellSize = window.innerWidth * 0.02;
        d3.select(svg).selectAll("*").remove();
        d3.select(svg1).selectAll("*").remove();

        const cells = d3
            .select(svg)
            .attr("width", cellSize * size)
            .attr("height", cellSize * size)
            .selectAll("g")
            .data(matrix.flat())
            .enter()
            .append("g")
            .attr(
                "transform",
                (d, i) =>
                    `translate(${(i % size) * cellSize}, ${Math.floor(i / size) * cellSize})`,
            );

        cells
            .append("rect")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("fill", (d, i) => {
                const x = i % size;
                const y = Math.floor(i / size);
                if (x === 0 || y === 0 || x === size - 1 || y === size - 1) {
                    return "none"; 
                } else {
                    return d3.interpolateGreys(1 - d / 255);
                }
            });

        cells
            .append("text")
            .attr("x", cellSize / 2)
            .attr("y", cellSize / 2)
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text((d) => Math.round(d))
            .attr("font-size", cellSize *0.4)
            .attr("fill", (d, i) => {
                const x = i % size;
                const y = Math.floor(i / size);
                if (x === 0 || y === 0 || x === size - 1 || y === size - 1) {
                    return "none";
                } else {
                    return "#4287f5";
                }
            });
        const x = (step % (size - 2)) * cellSize;
        const y = Math.floor(step / (size - 2)) * cellSize;
        let windowRect = d3
            .select(svg)
            .append("rect")
            .attr("width", cellSize * 3)
            .attr("height", cellSize * 3)
            .attr("stroke", "Red")
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .attr("class", "kernel")
            .attr("transform", `translate(${x}, ${y})`);

        let middleCell = d3
            .select(svg)
            .append("rect")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("stroke", "orange")
            .attr("stroke-width", 4)
            .attr("fill", "none")
            .attr("class", "kernel")
            .attr("transform", `translate(${x + cellSize}, ${y + cellSize})`);

        const cells1 = d3
            .select(svg1)
            .attr("width", cellSize * size)
            .attr("height", cellSize * size)
            .selectAll("g")
            .data(new_matrix.flat())
            .enter()
            .append("g")
            .attr(
                "transform",
                (d, i) =>
                    `translate(${(i % size) * cellSize}, ${Math.floor(i / size) * cellSize})`,
            );

        cells1
            .append("rect")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("fill", (d, i) => {
                const x = i % size;
                const y = Math.floor(i / size);
                if (x === 0 || y === 0 || x === size - 1 || y === size - 1) {
                    return "none";
                } else {
                    return d3.interpolateGreys(1 - d / 255);
                }
            });

        cells1
            .append("text")
            .attr("x", cellSize / 2)
            .attr("y", cellSize / 2)
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .attr("font-size", cellSize *0.4)
            .text((d) => Math.round(d))
            .attr("fill", (d, i) => {
                const x = i % size;
                const y = Math.floor(i / size);
                if (x === 0 || y === 0 || x === size - 1 || y === size - 1) {
                    return "none";
                } else {
                    return "#4287f5";
                }
            });

        let middleCell1 = d3
            .select(svg1)
            .append("rect")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("stroke", "orange")
            .attr("stroke-width", 4)
            .attr("fill", "none")
            .attr("class", "kernel")
            .attr("transform", `translate(${x + cellSize}, ${y + cellSize})`);
    };
    onMount(() => {
        generateGraph();
    });
    const convolve = () => {
        const x = step % (size - 2);
        const y = Math.floor(step / (size - 2));
        let sum = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                sum += matrix[y + i][x + j] * kernel[i][j];
            }
        }
        new_matrix[y + 1][x + 1] = sum;
    };

    function nextStep() {
        if (step < 168) {
            step++;
        }
        convolve();
        generateGraph();
    }
    function reset() {
        step = 0;
        new_matrix = JSON.parse(JSON.stringify(matrix));
        generateGraph();
        clearInterval(animate);
    }

    
    const startAnimation = () => {
        animate = setInterval(() => {
            if (step < 255) {
                step++;
                convolve();
                generateGraph();
            } else {
                clearInterval(animate);
            }
        }, 100);
    };
    window.addEventListener("resize", generateGraph);
</script>

<main>
    <section id="intro">
        <h2>Application</h2>
        <p>
            One great advantage of using Fourier Series and Fourier Transform is
            that they can be used to calculate the convolution of two functions
            efficiently. The convolution of two functions {@html katexify(
                "f(x)",
            )} and {@html katexify("g(x)")} is defined as:
            {@html katexify(
                "f(x) * g(x) = \\int_{-\\infty}^{\\infty} f(t)g(x-t)dt",
                true,
            )}
            It is generally difficult to calculate the convolution of two functions
            directly. However, using the Fourier Transform, we can calculate the
            convolution of two functions by using following properties of the Fourier
            Transform:
            {@html katexify("\\hat{f * g}(n) = \\hat{f}(n)\\hat{g}(n)", true)}
            Nice! The Fourier coefficient of the convolution of two functions is
            the product of the Fourier coefficients of the two functions. We can
            easily calculate the Fourier Transform of the two functions, multiply
            them, and then take the inverse Fourier Transform to get the convolution
            of the two functions.
        </p>
        <p>
            Convolution has a wide range of applications in image processing.
            The well-known jpeg compression algorithm uses convolution to
            compress images. It can also be used to apply filters to images,
            such as blurring, sharpening, edge detection, etc. Below is a
            visualization of how convolution works to apply a blurry filter to
            an image.
        </p>
    </section>
    <div class="graph-container">
        <svg bind:this={svg}></svg>

        <svg bind:this={svg1}></svg>
    </div>
    <div class="buttons">
        <button on:click={reset}>Reset</button>
        <button on:click={startAnimation}>Run</button>
    </div>
    <section id='intro'>
        <p>
            In the above visualization, the left image is the original image, and the right image is the image after applying a blur filter. The blur filter is represented by the kernel matrix:
            {@html katexify(
                "\\begin{bmatrix} 0.05 & 0.1 & 0.05 \\\\ 0.1 & 0.4 & 0.1 \\\\ 0.05 & 0.1 & 0.05 \\end{bmatrix}",
                true,
            )}
            The kernel matrix is convolved with the original image to produce the blurred image. The convolution is done by sliding the kernel matrix over the original image and multiplying the corresponding elements of the kernel matrix and the image matrix and summing them up.
            The image above is only 16x16 and the kernel matrix is 3x3 for simplicity. In practice, images are much larger, and the kernel matrix can be of different sizes depending on the desired effect. That's where Fourier Transform kicks in to make the convolution process more computationally efficient.
        </p>
         </section>
</main>

<style>
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
    button {
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

    button:hover {
        background-color: white;
        color: black;
        border: 2px solid #4caf50;
    }
    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: relative;
        align-items: left;
        margin-right: 20px;
    }
    .graph-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    @media screen and (max-width: 600px) {
        .graph-container {
            flex-direction: column;
        }
    }
</style>
