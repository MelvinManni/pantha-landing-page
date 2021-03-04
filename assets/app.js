window.onload = (event) => {
  setTimeout(() => {
    document.getElementById("preloader").classList.add("off");
  }, 1000);
};

window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");

  if (pageYOffset > 200) {
    nav.style.position = "fixed";
  } else {
    nav.style.position = "relative";
  }
});

function contactForm(e) {
  e.preventDefault();
  const form = e.target.elements;
  let formBtn;
  Object.keys(form).forEach((key) => {
    if (form[key].type === "submit") formBtn = form[key];
  });
  const { name, email, company, message } = e.target.elements;
  const payload = {
    Name: name.value,
    Email: email.value,
    Company: company.value,
    Mesage: message.value,
  };
  submitContactForm(payload, formBtn);
  e.target.reset();
}

async function submitContactForm(data, elem) {
  const loader = document.createElement("img");
  loader.width = 50;
  loader.src = "assets/icon/spinner.svg";
  elem.inerHTML = "";
  elem.append(loader);
  try {
    await fetch("https://formspree.io/f/meqpbnvn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    elem.innerHTML = elem.title;
    customAlert("success", "Message successfully sent!");
  } catch (e) {
    console.log(e);
    elem.innerHTML = elem.title;
    customAlert("error", "Error sending message!");
  }
}

function customAlert(type = "", message) {
  const alertHolder = document.createElement("div");
  alertHolder.id = "alert-modal";
  alertHolder.innerHTML = `
  <div class="alert">
  <div class="alert-card">
  <img src="assets/icon/${type.toLowerCase()}.svg" alt=""/>
  <p class="fw-5">
  ${message}
  </p>
  <button onclick="removeModal()" class="btn">
    Okay
  </button>
  </div>
</div>
  `;

  document.body.append(alertHolder);
}

function removeModal() {
  document.getElementById("alert-modal").remove();
}

function toggleMenu() {
  const menu = document.querySelector(".nav__list");
  menu.classList.toggle("open");
}
