# SK Saira Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. This website features a dark theme with orange accent colors, smooth animations, and is fully responsive across all devices.

## Features

- 🎨 **Modern Design**: Dark theme with orange accent colors
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Smooth Animations**: Fade-in effects, progress bar animations, and hover effects
- 🍔 **Mobile Menu**: Hamburger menu for mobile devices
- 🎯 **Interactive Elements**: Progress bars, hover effects, and smooth scrolling
- 📧 **Newsletter Subscription**: Working email subscription form
- 🌟 **Testimonials**: Client testimonials with star ratings
- 🛠️ **Skills Section**: Visual representation of skills with progress bars
- 🎭 **Services Showcase**: Professional services with hover effects

## Sections

1. **Header**: Fixed navigation with logo and menu
2. **About Me**: Hero section with profile image and contact information
3. **Skills**: Work skills with progress bars and icons
4. **Services**: Professional services showcase
5. **Testimonials**: Client feedback and ratings
6. **Footer**: Contact information, navigation, and newsletter signup

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Getting Started

1. **Download or Clone**: Get all the files in your project directory
2. **Open in Browser**: Simply open `index.html` in your web browser
3. **Local Development**: Use a local server for development (recommended)

### Using a Local Server

If you have Python installed:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

If you have Node.js installed:
```bash
npx serve .
```

Then open `http://localhost:8000` in your browser.

## Customization

### Colors
The main colors are defined in CSS variables. You can easily change them in `styles.css`:

```css
/* Primary accent color */
--primary-color: #ff6b35;
--secondary-color: #ff8c42;

/* Background colors */
--bg-primary: #0a0a0a;
--bg-secondary: #0f0f0f;
--bg-card: #1a1a1a;
```

### Content
- **Profile Image**: Replace the Unsplash image URL in `index.html` with your own image
- **Personal Information**: Update the contact details, name, and description
- **Skills**: Modify the skills list and percentages in the HTML
- **Services**: Update the services offered and their descriptions
- **Testimonials**: Replace with real client feedback

### Images
The website uses placeholder images from Unsplash. Replace them with your own:
- Profile photo
- Service images
- Any other images you want to include

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Performance Features

- **Lazy Loading**: Images load only when needed
- **Optimized Animations**: Smooth 60fps animations
- **Throttled Events**: Scroll events are optimized for performance
- **CSS Transitions**: Hardware-accelerated animations

## Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 767px and below
- **Small Mobile**: 480px and below

## JavaScript Features

- Mobile menu toggle
- Smooth scrolling navigation
- Active navigation highlighting
- Intersection Observer for animations
- Progress bar animations
- Newsletter form handling
- Button click effects
- Parallax scrolling effects

## CSS Features

- CSS Grid and Flexbox layouts
- CSS custom properties (variables)
- Modern CSS animations and transitions
- Backdrop filters for glassmorphism effects
- Responsive typography
- Custom scrollbar styling

## Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select your source branch
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to Netlify
2. Your site will be deployed automatically
3. Get a custom domain or use the provided Netlify subdomain

### Vercel
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push
3. Get a custom domain and CDN

## Customization Examples

### Changing the Color Scheme
To change from orange to blue, update these CSS values:

```css
.btn-primary {
    background: linear-gradient(135deg, #3498db, #2980b9);
}

.logo-accent {
    background: linear-gradient(135deg, #3498db, #2980b9);
}

.progress-fill {
    background: linear-gradient(90deg, #3498db, #2980b9);
}
```

### Adding New Sections
To add a new section, follow this pattern:

```html
<section id="new-section" class="new-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">New Section</h2>
            <p class="section-description">Description here</p>
        </div>
        <!-- Your content here -->
    </div>
</section>
```

Then add corresponding CSS:

```css
.new-section {
    padding: 80px 0;
    background: #0a0a0a;
}
```

## Troubleshooting

### Common Issues

1. **Images not loading**: Check if the image URLs are accessible
2. **Mobile menu not working**: Ensure JavaScript is enabled
3. **Animations not smooth**: Check if hardware acceleration is enabled
4. **Fonts not loading**: Verify internet connection for Google Fonts

### Performance Tips

1. **Optimize images**: Use WebP format and appropriate sizes
2. **Minify CSS/JS**: Compress files for production
3. **Use CDN**: Host external resources on CDN
4. **Lazy load**: Implement lazy loading for images

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you need help customizing or have questions:
1. Check the code comments for guidance
2. Review the CSS classes and structure
3. Test on different devices and browsers
4. Use browser developer tools for debugging

## Credits

- **Design**: Based on the provided portfolio design
- **Icons**: Font Awesome 6.0
- **Fonts**: Google Fonts (Inter)
- **Images**: Unsplash (placeholder images)
- **Built with**: HTML5, CSS3, and Vanilla JavaScript

---

**Happy coding! 🚀**


