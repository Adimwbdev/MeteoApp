
# MeteoApp

MeteoApp is a web application for retrieving and displaying weather data for various cities. The application has both frontend and backend components: the frontend is built with Angular and utilizes several Angular Material components, while the backend is built with ASP.NET Core, using a REST API to interact with external weather data services and manage city and weather information in a database.

## Features

- Retrieve and display weather data for selected cities.
- Filter weather data by date range.
- Visualize weather data with charts (temperature, pressure, wind speed).
- Manage city information (add cities, fetch coordinates, and store weather data).

## Technologies and Tools

### Frontend (Angular)

- **Angular**: Framework for building the client-side interface and data management.
- **Angular Material**: UI components for design consistency, such as buttons, datepickers, selects, and tables.
  - Components used include:
    - `MatButtonModule`
    - `MatSelectModule`
    - `MatDatepickerModule`
    - `MatInputModule`
    - `MatCardModule`
    - `MatTableModule`
- **D3.js** (via custom components): Used to create interactive charts for temperature, pressure, and wind speed.
- **RxJS**: Manages asynchronous operations, including HTTP requests to the backend.

### Backend (ASP.NET Core)

- **ASP.NET Core Web API**: Creates RESTful endpoints for data retrieval and manipulation.
- **Entity Framework Core**: Manages database operations.
- **Weather API Service**: A custom service for retrieving weather data from an external API based on city coordinates.
- **Data Models**:
  - `WeatherData`: Stores weather information.
  - `City`: Manages city data such as name, latitude, and longitude.

## Database Setup in SQL Server

To set up the required tables in SQL Server, use the following SQL script. This will create the `MeteoApp` schema and add the necessary tables (`Cities` and `WeatherData`).

```sql
-- Step 1: Create the Schema
CREATE SCHEMA MeteoApp;
GO

-- Step 2: Create the `Cities` Table
CREATE TABLE MeteoApp.Cities (
    Id INT PRIMARY KEY IDENTITY,  -- Primary Key with auto-increment
    CityName NVARCHAR(100) NOT NULL,  -- Name of the city
    Lat FLOAT NOT NULL,  -- Latitude
    Lon FLOAT NOT NULL   -- Longitude
);
GO

-- Step 3: Create the `WeatherData` Table with Foreign Key Reference to `Cities`
CREATE TABLE MeteoApp.WeatherData (
    Id INT PRIMARY KEY IDENTITY,  -- Primary Key with auto-increment
    Date DATETIME NOT NULL,  -- Date of the weather data
    Temperature FLOAT NOT NULL,  -- Temperature reading
    Pressure FLOAT NOT NULL,  -- Pressure reading
    WindSpeed FLOAT NOT NULL,  -- Wind speed reading
    WeatherCondition NVARCHAR(100),  -- Description of weather condition
    CityId INT,  -- Foreign key to Cities table

    -- Define the foreign key constraint to link WeatherData with Cities
    CONSTRAINT FK_WeatherData_City FOREIGN KEY (CityId) REFERENCES MeteoApp.Cities(Id) ON DELETE CASCADE
);
GO
```

## Getting Started

### Prerequisites

- **Frontend**
  - Node.js and npm installed
  - Angular CLI installed globally
- **Backend**
  - .NET 6 SDK or later
  - Database server (e.g., SQL Server or SQLite for development)

### Installation

#### Clone the repository

```bash
git clone https://github.com/Adimwbdev/MeteoApp.git
cd MeteoApp
```

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies and build the project:
   ```bash
   dotnet restore
   dotnet build
   ```
3. Set up your database and apply migrations if needed.
4. Run the backend server:
   ```bash
   dotnet run
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd MeteoAngularApp
   ```
2. Install Angular and dependencies:
   ```bash
   npm install -g @angular/cli
   npm install
   ```
3. Start the Angular development server:
   ```bash
   ng serve
   ```

### Usage

1. Open the frontend at `http://localhost:4200` in your browser.
2. Select a city and filter dates to view weather data.
3. Use the provided charts to visualize temperature, pressure, and wind speed.

## API Endpoints

| Endpoint                           | Method | Description                                   |
|------------------------------------|--------|-----------------------------------------------|
| `/api/weatherdata/{cityId}`        | GET    | Get weather data for a city                   |
| `/api/weatherdata/fetchAndStore/{cityId}` | POST   | Fetch and store weather data for a city       |
| `/api/weatherdata/cities`          | GET    | Retrieve all cities                           |
| `/api/weatherdata/cities`          | POST   | Add a new city                                |

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.
