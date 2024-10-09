# GitHub Trending Repositories Browser Extension

This project is a browser extension that displays trending GitHub repositories on new tabs. It provides an easy way to discover popular and up-and-coming projects on GitHub.

## Features

- View trending repositories from various time ranges (weekly, monthly, 6 months, yearly)
- Filter repositories by programming language
- Dark mode support
- Responsive design for various screen sizes
- Displays repository details including stars, forks, and primary language

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Lucide React icons

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/github-trending-extension.git
   cd github-trending-extension
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Development

To run the project in development mode:

```
npm run dev
```

This will start a development server, typically at `http://localhost:5173`. The page will reload if you make edits to the source files.

### Building for Production

To build the project for production:

```
npm run build
```

This will generate a `dist` folder with the production-ready files.

### Loading the Extension in Chrome

1. Build the project as described above.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the `dist` folder from your project directory.

The extension should now be loaded and will replace the new tab page in Chrome.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- [GitHub API](https://docs.github.com/en/rest) for providing repository data
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide](https://lucide.dev/) for the icon set