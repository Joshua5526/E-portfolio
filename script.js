const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// =========================================
// MOBILE NAVIGATION
// =========================================

if (menuToggle && navLinks) {

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

});


// Close menu when a link is clicked

const links = navLinks.querySelectorAll("a");

links.forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");
        navLinks.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});

}

// =========================================
// CONTACT FORM
// =========================================

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm) {

contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const submitButton =
        contactForm.querySelector(".contact-submit");

    const originalButtonText =
        submitButton.innerHTML;


    // Show loading state

    submitButton.disabled = true;

    submitButton.innerHTML =
        "<span>Sending...</span>";


    formStatus.textContent = "";
    formStatus.className = "form-status";


    // Collect form information

    const formData = new FormData(contactForm);

    const data = {

        name: formData.get("name"),

        email: formData.get("email"),

        message: formData.get("message"),

        _subject:
            `Portfolio Contact - ${formData.get("name")}`

    };


    try {

        const response = await fetch(
            "https://formsubmit.co/ajax/joshuadpierce08@gmail.com",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        const result = await response.json();


        if (response.ok && result.success) {

            formStatus.textContent =
                "Message sent successfully! I'll get back to you soon.";

            formStatus.classList.add("success");

            contactForm.reset();


        } else {

            throw new Error(
                "Form submission failed."
            );

        }


    } catch (error) {

        console.error(error);

        formStatus.textContent =
            "Something went wrong. Please try again.";

        formStatus.classList.add("error");


    } finally {

        submitButton.disabled = false;

        submitButton.innerHTML =
            originalButtonText;

    }

});

}