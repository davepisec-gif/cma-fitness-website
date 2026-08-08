const menuButton = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));

document.querySelectorAll("[data-image-fallback]").forEach((image) => {
  image.addEventListener("error", () => {
    const frame = image.closest(".screenshot-frame");
    if (!frame) return;

    frame.innerHTML = `
      <div class="screenshot-placeholder">
        Add <strong>${image.getAttribute("src")}</strong> to display this screenshot.
      </div>
    `;
  });
});
