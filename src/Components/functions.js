export const functions = {
    f1: {
        func: (x) => Math.pow(x, 2),
        latex: "f(x) = x^2",
    },
    f2: {
        func: (x) => Math.pow(Math.E, x),
        latex: "f(x) = e^x",
    },
    f3: {
        func: (x) => Math.sign(Math.sin(x)),
        latex: "f(x) = sign(\\sin(x))",
    },
    f4: {
        func: (x) =>
            Math.abs(x) <= 1
                ? Math.sqrt(Math.pow(1, 2) - Math.pow(x, 2))
                : 0,
        latex: "f(x) = \\sqrt{1^2 - x^2}",
    },
};
export const integrate = (f, a, b, n = 1000) => {
    const h = (b - a) / n;
    let sum = 0.5 * (f(a) + f(b));
    for (let i = 1; i < n; i++) {
        sum += f(a + i * h);
    }
    return sum * h;
};

export const calculateCoefficients = (n, f) => {
    const a = [];
    const b = [];
    for (let i = 0; i <= n; i++) {
        a[i] =
            (1 / Math.PI) *
            integrate((x) => f(x) * Math.cos(i * x), -Math.PI, Math.PI);
        b[i] =
            (1 / Math.PI) *
            integrate((x) => f(x) * Math.sin(i * x), -Math.PI, Math.PI);
    }
    return { a, b };
};

export const generateFourierSeries = (a, b, x) => {
    let sum = a[0] / 2;
    for (let i = 1; i < a.length; i++) {
        sum += a[i] * Math.cos(i * x) + b[i] * Math.sin(i * x);
    }
    return sum;
};