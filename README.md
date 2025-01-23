# HTML Metadata Extractor

A modern web application built with Next.js that extracts and displays metadata from any website URL. The tool analyzes HTML content and extracts essential SEO elements including titles, descriptions, keywords, canonical URLs, and schema.org structured data.

## Features

- 🔍 Extracts key metadata elements:
  - Page title
  - Meta description
  - Meta keywords
  - Canonical URL
  - Schema.org JSON-LD data
- 💫 Real-time analysis
- 🎨 Clean, modern UI with Tailwind CSS
- 📱 Responsive design
- 🔧 JSON viewer for structured data

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- react-json-view (for JSON data visualization)

## Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd [project-directory]
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a website URL in the textarea
2. Click the "Check" button
3. View the extracted metadata:
   - Page title
   - Meta description
   - Meta keywords
   - Canonical URL
   - Schema.org data (expandable JSON view)

## Project Structure

```
├── app/
│   ├── actions/
│   │   └── check-order-website.ts    # Metadata extraction logic
│   ├── page.tsx                      # Main page component
│   └── layout.tsx                    # App layout
├── public/
└── package.json
```

## Component Types

```typescript
interface WebsiteMetadata {
  title: string | null;
  description: string | null;
  keywords: string | null;
  canonical: string | null;
  schema: object | null;
}
```

## API Reference

### `checkOrderWebsite`

```typescript
async function checkOrderWebsite(url: string): Promise<WebsiteMetadata>;
```

Analyzes a website and returns its metadata.

#### Parameters:

- `url` (string): The URL of the website to analyze

#### Returns:

- `Promise<WebsiteMetadata>`: Object containing extracted metadata

## Styling

The project uses Tailwind CSS for styling with a clean, modern design:

- Responsive layout with flex containers
- Dark mode support
- Custom rounded corners
- Consistent spacing using gap utilities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Built with Next.js 15+
- Uses Tailwind CSS for styling
- Integrates react-json-view for JSON visualization

---

For more information or support, please open an issue in the repository.
