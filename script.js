
/* -------------------------------------------------------------- ELEMENTS ------------------------------------------------------ */

const steps = document.querySelectorAll(".checkout-step");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const countryInput = document.getElementById("country");
const cityInput = document.getElementById("city");
const streetInput = document.getElementById("street");
const zipInput = document.getElementById("zip");

const cardNumberInput = document.getElementById("cardNumber");
const expiryInput = document.getElementById("expiry");

const toStep2Btn = document.getElementById("toStep2");
const toStep3Btn = document.getElementById("toStep3");
const back1Btn = document.getElementById("back1");
const back2Btn = document.getElementById("back2");
const payBtn = document.getElementById("payBtn");

const checkoutWrapper = document.getElementById("checkoutWrapper");
const successScreen = document.getElementById("successMessage");
const summary = document.querySelector(".summary");

/* ---------------------------------------------------------STEP CONTROL (IMPORTANT FIX) -----------------------------------------------*/

function showStep(index) {

    steps.forEach((step, i) => {

        step.classList.remove("active", "completed");

        // completed steps
        if (i < index) {
            step.classList.add("completed");
        }

        // active step
        if (i === index) {
            step.classList.add("active");
        }

    });

    steps.forEach((step, i) => {
        const content = step.querySelector(".step-content");
        if (!content) return;

        content.style.display = (i === index) ? "block" : "none";
    });
}

/* --------------------------------------------------------------------------- ERROR HANDLING -------------------------------------------*/

function showError(input, message) {

    const error = input.nextElementSibling;

    input.classList.add("error");

    if (error) {
        error.textContent = message;
        error.style.display = "block";
    }

}

function clearError(input) {

    const error = input.nextElementSibling;

    input.classList.remove("error");

    if (error) {
        error.style.display = "none";
    }

}

/* ---------------------------------------------------------------------------- VALIDATION STEP 1 --------------------------------------- */

function validateStep1() {

    let valid = true;

    if (!nameInput.value.trim()) {
        showError(nameInput, "Name is required");
        valid = false;
    } else clearError(nameInput);

    if (!emailInput.value.trim()) {
        showError(emailInput, "Email is required");
        valid = false;
    } else clearError(emailInput);

    if (!phoneInput.value.trim()) {
        showError(phoneInput, "Phone is required");
        valid = false;
    } else clearError(phoneInput);

    return valid;
}

/* ---------------------------------------------------------------- VALIDATION STEP 2 --------------------------------------------------*/

function validateStep2() {

    let valid = true;

    if (!countryInput.value.trim()) {
        showError(countryInput, "Country required");
        valid = false;
    } else clearError(countryInput);

    if (!cityInput.value.trim()) {
        showError(cityInput, "City required");
        valid = false;
    } else clearError(cityInput);

    if (!streetInput.value.trim()) {
        showError(streetInput, "Street required");
        valid = false;
    } else clearError(streetInput);

    if (!zipInput.value.trim()) {
        showError(zipInput, "ZIP required");
        valid = false;
    } else clearError(zipInput);

    return valid;
}

/* ---------------------------------------------------------------- BUTTON EVENTS -------------------------------------------------------*/

toStep2Btn.addEventListener("click", () => {
    if (!validateStep1()) return;
    showStep(1);
});

toStep3Btn.addEventListener("click", () => {
    if (!validateStep2()) return;
    showStep(2);
});

back1Btn.addEventListener("click", () => {
    showStep(0);
});

back2Btn.addEventListener("click", () => {
    showStep(1);
});

/* ---------------------------------------------------------------- CARD FORMATTING -----------------------------------------------------*/

cardNumberInput.addEventListener("input", (e) => {

    let value = e.target.value.replace(/\D/g, "");
    value = value.match(/.{1,4}/g)?.join(" ") || value;
    e.target.value = value;

});

expiryInput.addEventListener("input", (e) => {

    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }

    e.target.value = value;

});

/* -------------------------------------------------------------- PAYMENT -------------------------------------------------------*/

payBtn.addEventListener("click", () => {

    payBtn.disabled = true;
    payBtn.classList.add("loading");

    payBtn.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Processing...
    `;

    setTimeout(() => {

        // hide checkout + summary
        checkoutWrapper.style.display = "none";
        summary.style.display = "none";

        // show success properly
        successScreen.style.display = "flex";

    }, 2000);

});

/* -------------------------------------------------------------------- INIT FIX ---------------------------------------------- */

showStep(0);

steps.forEach((step, i) => {
    const content = step.querySelector(".step-content");
    if (!content) return;
    content.style.display = (i === 0) ? "block" : "none";
});