const initDatabase =[
    'DROP TABLE IF EXISTS Companies;',
    'DROP TABLE IF EXISTS Users;',
    'DROP TABLE IF EXISTS Models;',
    'DROP TABLE IF EXISTS Sets;',
    'DROP TABLE IF EXISTS Orders;',
    'DROP TABLE IF EXISTS Files;',
    'DROP TABLE IF EXISTS Reports;',
    'DROP TABLE IF EXISTS Items;',
    'DROP TABLE IF EXISTS Activities;',
`CREATE TABLE IF NOT EXISTS Companies (
    Deleted INT DEFAULT 0,
    Active INT DEFAULT 0,
    CompanyId INT UNIQUE AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    City INT NOT NULL,
    State INT NOT NULL,
    Country INT NOT NULL,
    Phone VARCHAR(255) UNIQUE NOT NULL,
    Doc VARCHAR(255) NOT NULL,
    TypeDoc VARCHAR(255) NOT NULL,
    Admin INT DEFAULT 0,
    Image VARCHAR(255),
    Coors VARCHAR(255),
    PRIMARY KEY (CompanyId)
);`,
`CREATE TABLE IF NOT EXISTS Users (
    Deleted INT DEFAULT 0,
    UserId INT UNIQUE AUTO_INCREMENT,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Position VARCHAR(255) NOT NULL,
    Phone VARCHAR(255) UNIQUE NOT NULL,
    CompanyId INT,
    Image VARCHAR(255),
    Rol VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    PRIMARY KEY (UserId)
);`,
`CREATE TABLE IF NOT EXISTS Models (
    Deleted INT DEFAULT 0,
    ModelId INT UNIQUE AUTO_INCREMENT,
    Model VARCHAR(255),
    Reference1 VARCHAR(255) UNIQUE NOT NULL,
    Reference2 VARCHAR(255),
    LimitLife INT,
    Frecuency INT,
    Capacity INT,
    Unit VARCHAR(100),
    Reload INT DEFAULT 0,
    Description TEXT,
    Image VARCHAR(255) NOT NULL,
    ParentId INT DEFAULT NULL,
    ProviderId INT,
    MakerId INT,
    PRIMARY KEY (ModelId)
);`,
`CREATE TABLE IF NOT EXISTS Sets (
    Deleted INT DEFAULT 0,
    SetId INT UNIQUE AUTO_INCREMENT,
    Address VARCHAR(255) NOT NULL,
    City INT NOT NULL,
    State INT NOT NULL,
    Country INT NOT NULL,
    InitDate INT,
    LastMtto INT,
    Coors VARCHAR(255),
    Image VARCHAR(255),
    Notes TEXT,
    ModelId INT,
    OnwerId INT,
    RentalId INT,
    ParentId INT,
    PRIMARY KEY (SetId)
);`,
`CREATE TABLE IF NOT EXISTS Orders (
    Deleted INT DEFAULT 0,
    OrderId VARCHAR(255) UNIQUE,
    DateBase INT,
    DateInit INT,
    DateFinal INT,
    TypeOrder INT DEFAULT 0,
    Stateorder INT DEFAULT 0,
    Description VARCHAR(1000),
    UserId INT,
    SupportRw INT DEFAULT NULL,
    SellerRw INT DEFAULT NULL,
    TechIdRw INT DEFAULT NULL,
    SupportId INT,
    SellerId INT,
    TechId INT,
    SetId INT,
    ClientId INT,
    ReportId VARCHAR(255),
    PRIMARY KEY (OrderId) 
  );`,
`CREATE TABLE IF NOT EXISTS Files (
    Deleted INT DEFAULT 0,
    FileId INT UNIQUE AUTO_INCREMENT,
    OrderId VARCHAR(255),
    SetId INT,
    DateFile INT,
    File VARCHAR(255),
    Title VARCHAR(255),
    Description VARCHAR(1000),
    TypeFile INT,
    PRIMARY KEY (FileId)
);`,
`CREATE TABLE IF NOT EXISTS Reports (
    Deleted INT DEFAULT 0,
    ReportId VARCHAR(255) UNIQUE,
    Date INT,
    UserId INT,
    SetId INT, 
    PRIMARY KEY (ReportId) 
);`,
`CREATE TABLE IF NOT EXISTS Items (
    Deleted INT DEFAULT 0,
    ItemId INT UNIQUE AUTO_INCREMENT,
    ReportId VARCHAR(255),
    DataInfo INT,
    Unit VARCHAR(10),
    StateItem INT,
    Alarm INT,
    SetId INT,
    PRIMARY KEY (ItemId)
);`,
`CREATE TABLE IF NOT EXISTS Activities (
    Deleted INT DEFAULT 0,
    ActivityId INT UNIQUE AUTO_INCREMENT,
    UserId INT,
    CompanyId INT,
    Activity VARCHAR(255),
    date INT,
    EntityId INT,
    PRIMARY KEY (ActivityId)
);`
];

module.exports = initDatabase;