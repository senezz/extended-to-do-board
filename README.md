# Extended To-Do Board

## Project Overview

A modern, interactive **Kanban-style to-do board** built with vanilla JavaScript, HTML, and CSS. Manage your tasks across multiple columns with full CRUD operations and persistent local storage.

**[🚀 Live Demo](https://senezz.github.io/extended-to-do-board/)**

## Features

✨ **Multi-Column Board**

- Create unlimited columns to organize tasks by status (e.g., To-Do, In Progress, Done)
- Edit column titles inline
- Delete entire columns with a single click

📝 **Task Management**

- Add tasks to any column
- Edit task text directly (click to edit)
- Delete individual tasks
- Move tasks between columns using left/right navigation buttons

🔄 **Advanced Operations**

- Sort tasks by creation date (ascending)
- Reverse task order for flexible arrangement
- Drag-like experience with keyboard support

💾 **Persistent Storage**

- All data automatically saved to browser's localStorage
- Data persists across browser sessions
- Automatic error recovery for corrupted data

🎨 **Modern UI/UX**

- Clean, intuitive interface with blue gradient background
- Glass-morphism design with backdrop blur effects
- Smooth animations and hover states
- Responsive layout with horizontal scrolling
- Contextual button visibility (actions appear on hover)

⌨️ **Keyboard Support**

- Press **Enter** to confirm edits
- Press **Esc** to cancel (via blur)
- Tab navigation for accessibility

## Technologies Used

- **JavaScript (ES6+)** - Object-oriented design with Task, Column, and Board classes
- **HTML5** - Semantic markup with template elements
- **CSS3** - Modern styling with flexbox, transitions, and backdrop filters
- **localStorage API** - Client-side data persistence
- **No External Dependencies** - Pure vanilla implementation

## Usage

1. **Installation**:
   - Clone the repository: `git clone https://github.com/senezz/extended-to-do-board.git`
   - Navigate into the directory: `cd extended-to-do-board`
   - Install dependencies: `npm install`

2. **Running the Application**:
   - Start the development server: `npm start`
   - Access the application by going to `http://localhost:3000` in your web browser.

3. **Managing Tasks**:
   - Use the dashboard to add, edit, complete, or delete tasks. The interface is intuitive and guides you through the process.

## Contributing

If you would like to contribute to the project, please fork the repository and submit a pull request with your changes. Ensure to follow coding standards and include tests where applicable.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
