const DEFAULT_COLOR = "#4a5fd8";
const MIN_CONTRAST = 3; // WCAG minimum for large text
const CARD_BACKGROUND = "#ffffff";

const heading = document.querySelector("#heading");
const toggle = document.querySelector("#heading-toggle");
const colorInput = document.querySelector("#color-input");
const resetButton = document.querySelector("#color-reset");
const warning = document.querySelector("#color-warning");

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground, background) {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort(
    (a, b) => b - a
  );
  return (lighter + 0.05) / (darker + 0.05);
}

function setHeadingColor(color) {
  heading.style.color = color;
  colorInput.value = color;
  warning.hidden = contrastRatio(color, CARD_BACKGROUND) >= MIN_CONTRAST;
}

if (heading && toggle && colorInput && resetButton && warning) {
  const DEFAULT_TEXT = "Hello, World!";
  const CLICKED_TEXT = "You clicked me!";
  let clicked = false;

  toggle.addEventListener("click", () => {
    clicked = !clicked;
    toggle.textContent = clicked ? CLICKED_TEXT : DEFAULT_TEXT;
  });

  colorInput.addEventListener("input", () => setHeadingColor(colorInput.value));
  resetButton.addEventListener("click", () => setHeadingColor(DEFAULT_COLOR));

  setHeadingColor(DEFAULT_COLOR);
}
