# 🚀 Mobile-Responsive Portfolio Builder & Resume Generator

This project is a **Mobile-Responsive Online Portfolio Builder and Resume Generator** with **Dark Mode** support, built using HTML, CSS, and vanilla JavaScript.

It functions as a single-page application (SPA) where users first fill out a detailed form (personal info, education, work, skills, etc.). Upon submission, it instantly transforms the input data into a clean, modern, and navigable online portfolio.

---

## ✨ Key Features

* **Conditional Navigation Bar:** The sticky navigation bar is **hidden** on the initial data entry page and **appears only after** the user clicks "Generate Portfolio."
* **Local File Support:** The user can select their **profile photo directly from their computer** using a file input, which is then displayed in the portfolio using the browser's `FileReader` API.
* **Custom Spacing:** The design maintains a precise **1.5cm gap** between the fixed navigation bar and the main content (the profile photo/name) on the portfolio view.
* **Intuitive Navigation:** The portfolio content is organized into separate sections (About, Education, Work, etc.) with both **top navigation buttons** and **in-section "Back/Next" buttons** for seamless browsing.
* **PDF Generation:** The user can **download the entire portfolio content as a PDF resume** using the `jsPDF` library.
* **Dark Mode Toggle:** Users can switch between a light and dark theme using a dedicated toggle button.
* **Dynamic Forms:** Includes JavaScript functionality to dynamically **add or remove** multiple entries for repeatable sections like Education, Work Experience, and Projects.

---

## 🛠️ How to Use

1.  **Clone the Repository** and open `index.html` in your browser.
2.  Fill in the required personal and experience details.
3.  Click **"Generate Portfolio"** to instantly see your live resume.
4.  Use the top navigation bar to jump between sections.
5.  Click **"Download Resume PDF"** to save a copy.
