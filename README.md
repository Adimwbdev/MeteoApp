
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
    CityID INT IDENTITY(1,1) PRIMARY KEY,
    CityName VARCHAR(100),
    lat DECIMAL(9, 4),
    lon DECIMAL(9, 4)
);
GO

-- Step 3: Create the `WeatherData` Table with Foreign Key Reference to `Cities`
CREATE TABLE MeteoApp.WeatherData (
    WeatherDataID INT IDENTITY(1,1) PRIMARY KEY,
    CityID INT FOREIGN KEY REFERENCES MeteoApp.Cities(CityID),
    Date DATETIME, 
    Temperature DECIMAL(10, 2),
    Pressure DECIMAL(10, 2),
    WindSpeed DECIMAL(10, 2),
    WeatherCondition INT
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
   - By default, the backend server will be available at `http://localhost:5000`.

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
3. Install Angular Material (required for UI components):
   ```bash
   ng add @angular/material
   ```
   - Choose a theme when prompted, and set up global typography and animations as preferred.

4. Start the Angular development server:
   ```bash
   ng serve
   ```

### Usage

1. Open the frontend at `http://localhost:4200` in your browser.
2. Select a city and filter dates to view weather data.
3. Use the provided charts to visualize temperature, pressure, and wind speed.

## API Endpoints

The following API endpoints are accessible via `http://localhost:5000`:

| Endpoint                           | Method | Description                                   |
|------------------------------------|--------|-----------------------------------------------|
| `/api/weatherdata/{cityId}`        | GET    | Get weather data for a city                   |
| `/api/weatherdata/fetchAndStore/{cityId}` | POST   | Fetch and store weather data for a city       |
| `/api/weatherdata/cities`          | GET    | Retrieve all cities                           |
| `/api/weatherdata/cities`          | POST   | Add a new city                                |

### API Call Examples

1. **Get Weather Data for a City**
   - **Request**:
     ```http
     GET http://localhost:5000/api/weatherdata/4
     ```
   - **Response** (example):
     ```json
     [
       {
         "id": 1,
         "date": "2023-10-31T14:00:00Z",
         "temperature": 15.3,
         "pressure": 1013,
         "windSpeed": 5.4,
         "weatherCondition": "Clear",
         "cityId": 4
       }
     ]
     ```

2. **Fetch and Store Weather Data**
   - **Request**:
     ```http
     POST http://localhost:5000/api/weatherdata/fetchAndStore/4
     ```
   - **Response** (example):
     ```json
     {
       "message": "Weather data for city 4 inserted successfully."
     }
     ```

3. **Get All Cities**
   - **Request**:
     ```http
     GET http://localhost:5000/api/weatherdata/cities
     ```
   - **Response** (example):
     ```json
     [
       {
         "id": 4,
         "cityName": "Paris",
         "lat": 48.8566,
         "lon": 2.3522
       }
     ]
     ```

4. **Add a New City**
   - **Request**:
     ```http
     POST http://localhost:5000/api/weatherdata/cities
     Content-Type: application/json

     {
       "cityName": "London",
       "lat": 51.5074,
       "lon": -0.1278
     }
     ```
   - **Response** (example):
     ```json
     {
       "message": "City 'London' added successfully."
     }
     ```

## Notes
1. When you first add a city the timeline is depicted as the "now" time plus the time the data were stored. As you fetch more data the x-axis shows the whole date.
2. The condition columns shows numbers. I could not find the classification of this numbers in the documentation.
3. When trying to get historical data, the availiabilty was limited and I was getting the following message:
Request with valid date 2024-10-07T00:00:00Z requires data access before 2024-10-27T00:00:00Z, which is not granted with this subscription type (e.g. trial). The valid time period for this account type starts at 2024-10-27T00:00:00Z and ends at 2024-11-07T00:00:00Z. Please contact sales@meteomatics.com and we are happy to provide an extended trial or an upgrade of your account.


## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.



