# Portfolio Website

A modern, responsive portfolio website showcasing projects, skills, and professional experience.

## Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles and CSS
├── js/
│   └── script.js       # JavaScript functionality
├── assets/
│   └── images/         # Image assets (place your images here)
└── README.md           # Project documentation
```

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Smooth Scrolling**: Enhanced navigation with smooth scroll effects
- **Contact Form**: Ready-to-integrate contact form
- **SEO Friendly**: Proper meta tags and semantic HTML

## Getting Started

### Prerequisites

No dependencies required! This is a pure HTML/CSS/JavaScript project.

### Running Locally

#### Option 1: Python HTTP Server (Recommended)
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

#### Option 2: Node.js http-server
```bash
npx http-server -p 8000
```

#### Option 3: Open Directly
Simply open `index.html` in your web browser (some features may be limited).

## Customization

### Update Personal Information
1. Replace "Your Name" throughout `index.html`
2. Update the About section with your story
3. Add your skills in the Skills section
4. Add your projects with descriptions and links
5. Update social media links in the footer

### Styling
All styles are in `css/styles.css`. Customize colors by modifying CSS variables:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... */
}
```

### Contact Form
The contact form currently shows an alert. To make it functional, integrate with:
- [Formspree](https://formspree.io/)
- [EmailJS](https://www.emailjs.com/)
- Your own backend API

Update the form submission logic in `js/script.js`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Author

Your Name - [Your Website/Portfolio](https://yourwebsite.com)


