
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");
  if (menuToggle && navbar) {
    menuToggle.addEventListener("change", () => {
      navbar.classList.toggle("active");
    });
    document.querySelectorAll("nav a").forEach(link => {
      link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuToggle.checked = false;
      });
    });
  }

  // Active section + fade-in on scroll
  function handleScroll() {
    const scrollPosition = window.scrollY + 180;
    document.querySelectorAll("section[id]").forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute("id");
      const navLink = document.querySelector('nav a[href="#' + id + '"]');
      if (navLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLink.classList.add("active");
        } else {
          navLink.classList.remove("active");
        }
      }
    });
    document.querySelectorAll(".fade-in").forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) el.classList.add("visible");
    });
  }
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // run once on load
// Modal + form logic
const modal = document.getElementById("messageModal");
const openBtn = document.getElementById("sendMessageBtn");
const closeBtns = document.querySelectorAll(".close-btn");
const form = document.getElementById("messageForm");

function toggleModal(show) {
  if (show) {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  } else {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
    if (form) {
      form.reset();
      clearErrors();
      const success = form.querySelector(".success-message");
      if (success) success.remove();
    }
  }
}

if (openBtn) openBtn.addEventListener("click", () => toggleModal(true));
closeBtns.forEach((btn) => btn.addEventListener("click", () => toggleModal(false)));
window.addEventListener("click", (e) => {
  if (e.target === modal) toggleModal(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("show")) toggleModal(false);
});

function clearErrors() {
  form.querySelectorAll(".error-message").forEach((e) => (e.textContent = ""));
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function validate() {
  clearErrors();
  let valid = true;
  const name = form.Name.value.trim();
  const contact = form.Contact.value.trim();
  const message = form.Message.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[+]?\d{10,15}$/;

  if (name.length < 2) {
    showError("nameError", "Name must be at least 2 characters");
    valid = false;
  }
  if (!emailRegex.test(contact) && !mobileRegex.test(contact)) {
    showError("contactError", "Enter valid email or mobile");
    valid = false;
  }
  if (message.length < 10) {
    showError("messageError", "Message must be at least 10 characters");
    valid = false;
  }

  return valid;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validate()) return;

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      form.innerHTML = `
        <div class="success-message">
          <h4>Message Sent Successfully!</h4>
          <p>Thank you for reaching out. A reply will follow soon.</p>
        </div>
      `;
    } else {
      const data = await response.json();
      alert(data?.errors?.[0]?.message || "Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("An error occurred while sending your message.");
  }
});});
