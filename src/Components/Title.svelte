<script>
    import katexify from "../katexify";
    const def = `f(x) \\sim \\sum_{n=-\\infty}^\\infty \\hat{f}(n) e^{inx}`;


</script>
<section id='intro'>
    <h1> Fourier Series and Fourier Transform</h1>
    <h2> Author: Tianyi Chen, Yihui Zhang </h2>
    <p> Fourier series and Fourier transform are mathematical tools that are used to analyze and synthesize functions. They are widely used in signal processing, 
        image processing, and many other fields. Fourier series uses linear combinations of sines and cosines to approximate a function. 
    </p>
    <p> 
        The Fourier series of a function {@html katexify('f(x)')} is given by: 
    </p>
    <p>
        {@html katexify(def,true)}
        Where {@html katexify('\\hat{f}(n)')} is the {@html katexify('n^{th}')} Fourier coefficient of the function {@html katexify('f(x)')}.
    </p>
    <p>
        Below is an interactive plot that shows the Fourier series approximation of a function. You can select different functions and adjust the number of terms in the series using the slider bar.
        And we will go through the steps of deriving the Fourier series of a function.
    </p>
   
</section>
<style>
    #intro {
        background-color: #f9f9f9;
        padding: 20px;
        margin: 40px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    #intro h1 {
        color: #333;
        font-size: 2em;
        margin-bottom: 10px;
    }

    #intro p {
        color: #666;
        line-height: 1.6;
    }
    #intro h2 {
        color: #333;
        font-size: 1.2em;
        margin-bottom: 10px;
    }
</style>