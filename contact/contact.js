const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

let stars = [];
let starCount = window.innerWidth <= 600 ? 50 : 120;
for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach((s, i) => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.x += s.dx; s.y += s.dy;
    if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.dy *= -1;

    // Connect nearby stars
    for (let j = i + 1; j < stars.length; j++) {
      let dx = stars[i].x - stars[j].x, dy = stars[i].y - stars[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.strokeStyle = "rgba(255,255,255," + (1 - dist / 100) + ")";
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(animate);
}
animate(); 



// 3D Card Hover Effect
const card = document.getElementById("card");
document.addEventListener("mousemove", (e) => {
  let x = (window.innerWidth / 2 - e.pageX) / 25;
  let y = (window.innerHeight / 2 - e.pageY) / 25;
  card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});
document.addEventListener("mouseleave", () => card.style.transform = "rotateY(0) rotateX(0)");