# Stock Graph Viewer

A responsive single-page frontend application that dynamically updates stock graphs using a given API. The project adheres to the requirements of using Redux Toolkit for state management, thunk for API calls, and pre-built UI libraries for a clean and modern interface.

## Video Demonstration
[Watch the Demo](https://drive.google.com/file/d/1VI80Ko-E3H0Se9A7xV8aAzi1rm5yYss-/view?usp=sharing)

## Features

✅ **Stock Selection Dropdown** - Users can select a stock from a dropdown list.  
✅ **Duration Selection** - Users can switch between different durations for the selected stock.  
✅ **Dynamic Graph Updates** - The graph updates dynamically based on the selected stock and duration.  
✅ **Responsive UI** - The application is fully responsive and adapts to different screen sizes.  
✅ **Redux Toolkit for State Management** - Ensures efficient global state management.  
✅ **Minimal Prop Drilling** - Props are not drilled beyond level 2.  
✅ **Pre-built Libraries** - Uses UI libraries like MUI and react-chartjs-2 for better design and performance.  
✅ **Data Table** - Displays detailed stock information including timestamp, price, change, percentage change, and volume.  

## Bonus Features (Brownie Points)

✨ **Multiple Graphs at the Same Time** - Users can view multiple stock trends concurrently.  
✨ **Hosted Version** - The app can be deployed for live access.  

## Tech Stack

- **React** - Frontend framework.
- **Redux Toolkit** - For global state management.
- **Thunk Middleware** - For handling API calls.
- **Chart.js & react-chartjs-2** - For data visualization.
- **Tailwind CSS** - For responsive design.

## Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/tewarishash12/intern-assignment.git
```

### 2. Install Dependencies
#### Frontend
```sh
cd frontend
npm install
```

#### Backend
```sh
cd backend
npm install
```

### 3. Run the Application
#### Start the Frontend
```sh
cd frontend
npm run dev
```

#### Start the Backend
```sh
cd backend
npm start
```

## API Integration
The application fetches stock data dynamically from the provided API, updating the graphs in real time based on user selections.

## Deployment
For deployment, consider using services like Vercel, Netlify (for frontend), and Render or Heroku (for backend).

## License
This project is licensed under the MIT License.

---
### Contributors
- **Shashwat Tewari** - [GitHub](https://github.com/tewarishash12)

