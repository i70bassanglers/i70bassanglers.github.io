# I-70 Bass Anglers Website

A static website built with [Eleventy](https://www.11ty.dev/) for the I-70 Bass Anglers fishing club.

## Project Structure

```
i70bassanglers/
├── _includes/
│   └── layout.liquid          # Main layout template
├── _data/
│   ├── site.json           # Site-wide data
│   └── navigation.json     # Navigation menu data
├── _site/                  # Generated output (don't edit)
├── blog/
│   ├── index.md           # Blog index page
│   └── [blog-posts].md    # Individual blog posts
├── club/
│   ├── index.md           # Club overview
│   ├── history.md         # Club history
│   ├── organization.md    # Club officers and structure
│   └── members.md         # Member roster
├── tournaments/
│   ├── club/
│   │   ├── index.md       # Club tournaments overview
│   │   ├── upcoming.md    # Upcoming club tournaments
│   │   └── results.md     # Club tournament results
│   └── mlts/
│       ├── index.md       # MLTS overview
│       ├── upcoming.md    # Upcoming MLTS events
│       └── results.md     # MLTS results
├── css/
│   └── style.css          # Main stylesheet
├── images/                # Image assets
├── .eleventy.js           # Eleventy configuration
├── package.json           # Node.js dependencies
├── index.md              # Homepage
├── sponsors.md           # Sponsors page
└── calendar.md           # Area fishing calendar
```

## Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Blog System** - Dynamic blog with posts and categories
- **Tournament Management** - Separate sections for club and MLTS tournaments
- **Member Directory** - Club member information and achievements
- **Conservation Focus** - Highlights club conservation efforts
- **Sponsor Recognition** - Dedicated sponsor pages and recognition

## Technologies Used

- **[Eleventy](https://www.11ty.dev/)** - Static site generator
- **Liquid** - Template engine for dynamic content
- **Markdown** - Content authoring
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Front Matter** - Metadata for pages and posts

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the project directory:
   ```bash
   cd /Users/trentnovelly/Projects/i70bassanglers
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser to `http://localhost:8080`

### Available Scripts

- `npm start` - Start development server with live reload
- `npm run build` - Build the site for production
- `npm run debug` - Run with debug output

## Content Management

### Adding Blog Posts

1. Create a new `.md` file in the `blog/` directory
2. Add front matter with title, date, author, tags, and excerpt
3. Write content in Markdown format

Example:
```markdown
---
layout: layout.liquid
title: "Your Post Title"
date: 2024-10-26
author: "Your Name"
tags: ["tournament-report", "fishing-tips"]
excerpt: "Brief description of the post content."
---

## Your Content Here

Write your blog post content in Markdown...
```

### Updating Tournament Results

1. Edit the appropriate results file:
   - Club tournaments: `tournaments/club/results.md`
   - MLTS tournaments: `tournaments/mlts/results.md`

2. Update standings tables and add new tournament results

3. Update upcoming tournaments in respective `upcoming.md` files

### Managing Members

1. Edit `club/members.md`
2. Update member roster, standings, and achievements
3. Add new members to appropriate sections

### Adding Sponsors

1. Edit `sponsors.md`
2. Add new sponsor information with contact details and benefits
3. Include sponsor logos in the `images/` directory

## Site Configuration

### Global Settings

Edit `_data/site.json` to update:
- Site name and description
- Contact information
- Social media links
- Founded date

### Navigation Menu

Edit `_data/navigation.json` to:
- Add/remove menu items
- Update URLs
- Modify menu structure

### Layout Customization

Edit `_includes/layout.liquid` to:
- Modify HTML structure
- Update header/footer content
- Add new sections

## Styling

The site uses a custom CSS framework with:
- CSS Custom Properties (variables) for consistent theming
- Responsive design with mobile-first approach
- Accessible color contrast and focus styles
- Print-friendly styles

### Color Scheme

- **Primary Blue**: #1e3a8a (navigation, headings)
- **Secondary Green**: #059669 (accents, success states)
- **Accent Gold**: #f59e0b (highlights, calls-to-action)
- **Text Dark**: #1f2937 (main text)
- **Text Light**: #6b7280 (secondary text)

### Customizing Styles

Edit `css/style.css` to:
- Modify colors in the `:root` section
- Update typography and spacing
- Add new component styles
- Adjust responsive breakpoints

## Content Guidelines

### Writing Style

- Use clear, concise language
- Write in active voice
- Include specific details (dates, locations, results)
- Maintain consistent terminology

### Image Guidelines

- Use high-quality images (minimum 1200px wide)
- Optimize for web (JPEG for photos, PNG for graphics)
- Include descriptive alt text for accessibility
- Store in appropriate subdirectories in `images/`

### SEO Best Practices

- Include descriptive page titles
- Write compelling meta descriptions
- Use proper heading hierarchy (H1, H2, H3)
- Include relevant keywords naturally

## Deployment

### Building for Production

```bash
npm run build
```

This generates the complete static site in the `_site/` directory.

### Hosting Options

The generated site can be hosted on:
- **Netlify** - Automatic deployments from Git
- **Vercel** - Fast global CDN
- **GitHub Pages** - Free hosting for public repositories
- **Traditional Web Hosting** - Upload `_site/` contents via FTP

### Domain Setup

1. Purchase a domain (suggested: i70bassanglers.com)
2. Configure DNS to point to hosting provider
3. Set up SSL certificate (usually automatic with modern hosts)

## Maintenance

### Regular Updates

- **Weekly**: Add tournament results and upcoming events
- **Monthly**: Update member standings and blog posts
- **Seasonally**: Review and update sponsor information
- **Annually**: Update officer information and club statistics

### Backup Strategy

1. Keep source files in version control (Git)
2. Backup database of images and assets
3. Document any custom configuration changes

## Support

For questions about the website:

- **Technical Issues**: Contact webmaster
- **Content Updates**: Contact club communications chair
- **Eleventy Documentation**: [11ty.dev](https://www.11ty.dev/)

## License

This website template is created for the I-70 Bass Anglers club. Content and design are proprietary to the club.

---

**Built with ❤️ for the I-70 Bass Anglers community**
