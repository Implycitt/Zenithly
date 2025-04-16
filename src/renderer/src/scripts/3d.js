const d = document.querySelectorAll(".calendar-day");

document.addEventListener("mousemove", (e) => {
    d.forEach((el) => rotateElement(e, el));
  });
  

function rotateElement(event, element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = event.clientX;
    const y = event.clientY;

    const offsetX = ((x - centerX) / (rect.width / 2)) * 45;
    const offsetY = ((y - centerY) / (rect.height / 2)) * 45;

    element.style.setProperty("--rotateX", offsetX + "deg")
    element.style.setProperty("--rotateY", -offsetY + "deg")
}