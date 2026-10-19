const heading = document.querySelector("h1");
let clicked = false;

heading.addEventListener("click", () => {
  clicked = !clicked;
  heading.textContent = clicked ? "You clicked me!" : "Hello, World!";
});
