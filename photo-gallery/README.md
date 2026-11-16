# Photo Gallery Application

A responsive photo gallery built using **React.js and Tailwind CSS**, integrated with the Picsum Photos API to fetch and display photographs with author information and interactive like functionality.

## Features

- **Photo Gallery:** Displays photographs fetched from the Picsum Photos API.
- **Author Information:** Shows the photographer's name below each image.
- **Like Functionality:** Like individual photos with an incrementing like counter.
- **Automatic Infinite Scrolling:** Automatically fetches the next page when the user approaches the bottom of the page.
- **Pagination:** Fetches photos page by page and appends new photos without replacing existing ones.
- **Lazy Loading:** Images load as they approach the visible area.
- **Responsive Design:** Minimal and responsive interface styled with Tailwind CSS.

## Tech Stack

**Frontend**
- React.js
- JavaScript
- Vite
- Tailwind CSS
- Font Awesome

**API**
- [Picsum Photos API](https://picsum.photos/)

## Project Structure

```text
photo-gallery/
├── src/
│   ├── components/
│   │   ├── PhotoCard.jsx
│   │   └── PhotoGallery.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/dharmateja19/Exactspace-React-Assignment
cd photo-gallery
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open the application at:

`http://localhost:5173`

## API Integration

The application uses the Picsum Photos API to retrieve photographs.

**Endpoint:**

```text
https://picsum.photos/v2/list?page=1&limit=10
```

**API Response Fields Used:**

| Field | Description |
|---|---|
| `id` | Unique photo identifier |
| `author` | Photographer's name |
| `download_url` | Image URL |

Pagination is implemented through the `page` query parameter. Newly fetched photos are appended to the existing gallery.

## How to Use

1. Launch the application.
2. Browse the displayed photographs.
3. View the photographer's name below each image.
4. Click the thumbs-up icon to like a photo.
5. Click **Load More** to fetch additional photographs.

## Future Improvements

- Search and filter photographs.
- Persistent like counts using local storage or a backend.
- Photo preview modal with detailed information.

---

**Built with React.js and Tailwind CSS.**