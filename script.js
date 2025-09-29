(() => {
  const body = document.body;
  const header = document.getElementById('header');
  const navButtons = document.querySelectorAll('.nav-button');

  const formSection = document.getElementById('formSection');
  const portfolioSection = document.getElementById('portfolioSection');

  const profilePic = document.getElementById('profilePic');
  const displayName = document.getElementById('displayName');
  const displayCareerObjective = document.getElementById('displayCareerObjective');
  const displayEducation = document.getElementById('displayEducation');
  const displayWork = document.getElementById('displayWork');
  const displaySkills = document.getElementById('displaySkills');
  const displayProjects = document.getElementById('displayProjects');
  const displayCertifications = document.getElementById('displayCertifications');
  const displayLanguages = document.getElementById('displayLanguages');
  const displayHobbies = document.getElementById('displayHobbies');
  const displayEmail = document.getElementById('displayEmail');
  const displayPhone = document.getElementById('displayPhone');
  const displayLinkedIn = document.getElementById('displayLinkedIn');
  const displayGitHub = document.getElementById('displayGitHub');

  const downloadBtn = document.getElementById('downloadResume');
  const darkModeToggle = document.getElementById('darkModeToggle');
  
  // --- Core Functions ---

  // Helper function to show only one portfolio section at a time
  function showSection(id) {
    document.querySelectorAll(".portfolio-item").forEach((sec) => {
      sec.classList.toggle("active", sec.id === id);
    });
  }

  // Function to set up "Back" and "Next" button functionality
  function setupNavButtons() {
    const portfolioSections = document.querySelectorAll('.portfolio-item');
    const navButtons = document.querySelectorAll('.nav-button');
    const totalSections = portfolioSections.length;

    portfolioSections.forEach((section, index) => {
      const nextBtn = section.querySelector('[id$="NextBtn"]');
      const backBtn = section.querySelector('[id$="BackBtn"]');

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          const nextSectionIndex = (index + 1) % totalSections;
          const nextSection = portfolioSections[nextSectionIndex];
          showSection(nextSection.id);
          navButtons.forEach(btn => btn.classList.remove('active'));
          navButtons[nextSectionIndex].classList.add('active');
        });
      }

      if (backBtn) {
        backBtn.addEventListener('click', () => {
          const prevSectionIndex = (index - 1 + totalSections) % totalSections; 
          const prevSection = portfolioSections[prevSectionIndex];
          showSection(prevSection.id);
          navButtons.forEach(btn => btn.classList.remove('active'));
          navButtons[prevSectionIndex].classList.add('active');
        });
      }
    });
  }
  
  // --- Initialization ---

  // User clicks a top nav button, show that portfolio section
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      showSection(button.getAttribute('data-section'));
    });
  });

  // Setup dynamic add/remove for repeatable entries
  function setupDynamicAdder(buttonId, containerId, entryClass) {
    const addBtn = document.getElementById(buttonId);
    const container = document.getElementById(containerId);

    addBtn.addEventListener('click', () => {
      const firstEntry = container.querySelector(`.${entryClass}`);
      if (!firstEntry) return;

      const newEntry = firstEntry.cloneNode(true);
      newEntry.querySelectorAll('input,textarea').forEach(i => i.value = '');
      container.appendChild(newEntry);

      newEntry.querySelector('.remove-entry-btn').addEventListener('click', () => newEntry.remove());
    });

    container.querySelectorAll('.remove-entry-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.target.closest('.entry').remove();
      });
    });
  }

  setupDynamicAdder('addEducationBtn', 'educationFieldset', 'education-entry');
  setupDynamicAdder('addWorkBtn', 'workFieldset', 'work-entry');
  setupDynamicAdder('addProjectBtn', 'projectsFieldset', 'project-entry');
  setupDynamicAdder('addCertBtn', 'certificationsFieldset', 'certification-entry');

  // Dark Mode Toggle
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
  });

  // --- Form Submission and Data Handling ---

  document.getElementById('resumeForm').addEventListener('submit', e => {
    e.preventDefault();

    // 1. Gather Required Data
    const fullName = document.getElementById('fullName').value.trim();
    const photoFile = document.getElementById('photoFile').files[0]; 
    const email = document.getElementById('email').value.trim();
    const careerObjective = document.getElementById('careerObjective').value.trim();
    const skillsInput = document.getElementById('skills').value.trim();

    if (!fullName || !photoFile || !email || !careerObjective || !skillsInput) {
      alert('Please fill all required fields, including selecting a photo.');
      return;
    }
    
    // 2. Gather Optional Data (Fixes the [object] issue by correctly using .value.trim())
    const phone = document.getElementById('phone').value.trim();
    const linkedin = document.getElementById('linkedin').value.trim();
    const github = document.getElementById('github').value.trim();
    const languages = document.getElementById('languages').value.trim();
    const hobbies = document.getElementById('hobbies').value.trim();

    
    // 3. Handle File Upload (FileReader)
    const reader = new FileReader();
    reader.onload = function(event) {
        // Set the image source to the generated data URL
        profilePic.src = event.target.result;
        profilePic.alt = fullName + " Profile Picture";

        // Show the fixed header now that the portfolio is generated
        header.classList.remove('hidden');

        formSection.classList.add('hidden');
        portfolioSection.classList.remove('hidden');
        
        // --- Populate Portfolio Data ---
        displayName.textContent = fullName;
        displayCareerObjective.textContent = careerObjective;

        // Extract and display Education
        const educationEls = [...document.querySelectorAll('#educationFieldset .education-entry')];
        const educations = educationEls.map(edu => ({
          institution: edu.querySelector('.education-institution').value.trim(),
          degree: edu.querySelector('.education-degree').value.trim(),
          years: edu.querySelector('.education-years').value.trim(),
          achievement: edu.querySelector('.education-achievement').value.trim()
        }));
        displayEducation.innerHTML = educations.map(edu => {
            let html = `<div class="entry-item"><strong>${edu.institution}</strong>`;
            if (edu.degree) html += ` - ${edu.degree}`;
            html += ` (${edu.years})`;
            if (edu.achievement) html += `<br><em>${edu.achievement}</em>`;
            return html + "</div>";
        }).join('');


        // Extract and display Work Experience
        const workEls = [...document.querySelectorAll('#workFieldset .work-entry')];
        const workExperiences = workEls.map(work => ({
          company: work.querySelector('.work-company').value.trim(),
          role: work.querySelector('.work-role').value.trim(),
          duration: work.querySelector('.work-duration').value.trim(),
          responsibilities: work.querySelector('.work-responsibilities').value.trim()
        }));
        displayWork.innerHTML = workExperiences.map(work => {
            return `<div class="entry-item"><strong>${work.role}</strong> at ${work.company} (${work.duration})<br>${work.responsibilities}</div>`;
        }).join('');


        // Display Skills
        displaySkills.innerHTML = "";
        skillsInput.split(",").map(s => s.trim()).forEach(skill => {
          if(skill) {
              const li = document.createElement("li");
              li.textContent = skill;
              displaySkills.appendChild(li);
          }
        });


        // Extract and display Projects
        const projectEls = [...document.querySelectorAll('#projectsFieldset .project-entry')];
        const projects = projectEls.map(proj => ({
          title: proj.querySelector('.project-title').value.trim(),
          description: proj.querySelector('.project-desc').value.trim(),
          technologies: proj.querySelector('.project-tech').value.trim(),
          link: proj.querySelector('.project-link').value.trim()
        }));
        displayProjects.innerHTML = projects.map(proj => {
            let html = `<div class="project-item"><strong>${proj.title}</strong>`;
            if (proj.link) html += `<br><a href="${proj.link}" target="_blank" rel="noopener">Link</a>`;
            if (proj.technologies) html += `<br><em>Technologies: ${proj.technologies}</em>`;
            return html + `<p>${proj.description}</p></div>`;
        }).join('');


        // Extract and display Certifications
        const certEls = [...document.querySelectorAll('#certificationsFieldset .certification-entry')];
        const certifications = certEls.map(cert => ({
          title: cert.querySelector('.certification-title').value.trim(),
          issuer: cert.querySelector('.certification-issuer').value.trim(),
          date: cert.querySelector('.certification-date').value.trim()
        }));
        displayCertifications.innerHTML = certifications.map(cert => {
            let html = `<div class="entry-item"><strong>${cert.title}</strong>`;
            if (cert.issuer) html += `<br><em>${cert.issuer}</em>`;
            if (cert.date) html += `<br>${cert.date}`;
            return html + "</div>";
        }).join('');


        // Display Languages and Hobbies (This section is now guaranteed to receive strings)
        displayLanguages.textContent = languages || "Not specified";
        displayHobbies.textContent = hobbies || "Not specified";

        // Display Contact Info
        displayEmail.innerHTML = `<a href="mailto:${email}" target="_blank">${email}</a>`;
        displayPhone.textContent = phone ? `Phone: Phone: ${phone}` : "";
        displayLinkedIn.innerHTML = linkedin ? `<a href="${linkedin}" target="_blank" rel="noopener">LinkedIn</a>` : "";
        displayGitHub.innerHTML = github ? `<a href="${github}" target="_blank" rel="noopener">GitHub</a>` : "";

        // Final UI updates
        gsap.fromTo(portfolioSection, { opacity: 0 }, { opacity: 1, duration: 1 });
        navButtons.forEach(b => b.classList.remove("active"));
        navButtons[0].classList.add("active");
        showSection(navButtons[0].getAttribute("data-section"));
        setupNavButtons();
    };
    
    reader.readAsDataURL(photoFile);
  });

  // --- PDF Download Functionality ---
  downloadBtn.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // NOTE: Including the image in the PDF is possible but complex. 
    // This code focuses on text content.

    doc.setFontSize(22);
    doc.setTextColor("#5e35b1");
    doc.text(displayName.textContent, 20, 30);

    doc.setFontSize(14);
    doc.text("Career Objective:", 20, 45);
    doc.setFontSize(12);
    doc.text(doc.splitTextToSize(displayCareerObjective.textContent, 170), 20, 55);

    let y = 75;

    function addEntry(title, content) {
      doc.setFontSize(14);
      doc.text(title, 20, y);
      y += 8;
      doc.setFontSize(12);
      doc.text(doc.splitTextToSize(content, 170), 20, y);
      y += doc.splitTextToSize(content, 170).length * 6 + 10;
    }

    addEntry("Education:", Array.from(displayEducation.children).map((div) => div.textContent).join("\n\n"));
    addEntry("Work Experience:", Array.from(displayWork.children).map((div) => div.textContent).join("\n\n"));
    addEntry("Skills:", Array.from(displaySkills.children).map((li) => li.textContent).join(", "));
    addEntry(
      "Projects:",
      Array.from(displayProjects.children)
      .map((div) => div.textContent.replace(/\n/g, " - "))
      .join("\n\n")
    );
    addEntry("Certifications:", Array.from(displayCertifications.children).map((div) => div.textContent).join("\n\n"));
    addEntry("Languages:", displayLanguages.textContent);
    addEntry("Hobbies:", displayHobbies.textContent);

    if (y + 40 > 280) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(14);
    doc.text("Contact:", 20, y);
    y += 7;
    doc.setFontSize(12);
    doc.text(`Email: ${displayEmail.textContent}`, 20, y);
    if (displayPhone.textContent) y += 7, doc.text(displayPhone.textContent, 20, y);
    if (displayLinkedIn.textContent) y += 7, doc.text(displayLinkedIn.textContent, 20, y);
    if (displayGitHub.textContent) y += 7, doc.text(displayGitHub.textContent, 20, y);

    doc.save(`${displayName.textContent.replace(/\s+/g, "_").toLowerCase()}_resume.pdf`);
  });
})();