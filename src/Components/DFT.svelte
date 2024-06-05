<script>
    import katexify from "../katexify";
    const fft = "\\hat{x}[k] = \\sum_{n=0}^{N-1} x[n] e^{-2\\pi ikn/N} = \\sum_{n=0}^{N/2-1} x[2n] e^{-2\\pi ik(2n)/N} + \\sum_{n=0}^{N/2-1} x[2n+1] e^{-2\\pi ik(2n+1)/N}";
        
</script>

<main>
    <section id="intro">
        <h2>Discrete Fourier Transform (DFT)</h2>
        <p>
            How does computer calculate the Fourier transform? The Fourier
            series and Fourier transform are continuous transforms. However,
            computers can only work with discrete data. The Discrete Fourier
            Transform (DFT) is a discrete version of the Fourier transform.
            Instead of integrating over a continuous interval, the DFT sums over
            a finite number of samples of the original function. The formula for
            the DFT is given by:
            {@html katexify(
                "x[n] = \\frac{1}{N} \\sum_{n=0}^{N-1} \\hat{x}[k] e^{2\\pi ikn/N}",
                true,
            )}
            Where {@html katexify("x[n]")} is the {@html katexify("n^{th}")} sample
            of the function, {@html katexify("\\hat{x}[k]")} is the {@html katexify(
                "k^{th}",
            )} Fourier coefficient of the signal, and {@html katexify("N")} is the
            number of samples. And the coefficients are given by:
            {@html katexify(
                "\\hat{x}[k] = \\sum_{n=0}^{N-1} x[n] e^{-2\\pi ikn/N}",
                true,
            )}
            which are very similar to the continuous Fourier transform.
        </p>

        <h2>Fast Fourier Transform (FFT)</h2>
        <p>
            Imagine we wants to compute the DFT of a function with N samples
            using the formula above. For each {@html katexify("k")} we need to sum
            over all {@html katexify("n")} samples, which requires {@html katexify(
                "O(N^2)",
            )} operations. This can be computationally expensive for large number
            of samples. The Fast Fourier Transform (FFT) is an algorithm that reduces
            the number of operations to {@html katexify("O(N\\log N)")}.
            The Idea is divide and conquer. By the above formula, we have:
            {@html katexify(fft, true)}
            In this way, if {@html katexify("N")} is even, we can
            divide the sum into two parts, the part with even indices and odd indices, each with {@html katexify("N/2")} samples.
            Then we can divide each smaller sum again and again until we have only one sample.
            This gives the reccurence relation for the FFT algorithm.
            {@html katexify("T(N) = 2T(N/2) + O(N)", true)}
            which gives the time complexity of {@html katexify("O(N\\log N)")} operations.
            In practice, we usually perform zero-padding to the samples to the nearest power of 2 to fully use the ecfficiency of FFT.
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
</style>
