CREATE TABLE users {
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    password TEXT NOT NULL,
    confirmPassword TEXT NOT NULL
}

CREATE TABLE stocks {
    stockid SERIAL PRIMARY KEY,
    userid INT NOT NULL,
    ticker TEXT NOT NULL,
    companyName TEXT NOT NULL,
    stockPrice FLOAT NOT NULL,
    quantity INT NOT NULL,
    lastPrice FLOAT NOT NULL,
    market_cap FLOAT NOT NULL,
    exchange FLOAT NOT NULL,
    last_date DATE NOT NULL,
}

CREATE TABLE watchlist {
    wathcid SERIAL PRIMARY KEY,
    userid INT NOT NULL,
    ticker TEXT NOT NULL,
    companyName TEXT NOT NULL,
    stockPrice FLOAT NOT NULL,
    quantity INT NOT NULL,
    lastPrice FLOAT NOT NULL,
    market_cap FLOAT NOT NULL,
    exchange CHAR NOT NULL,
    last_date DATE NOT NULL,
}

CREATE TABLE expense {
    expenseid SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    pName TEXT NOT NULL,
    pDescription TEXT NOT NULL,
    pPrice TEXT NOT NULL,
    pDate DATE NOT NULL,
    category TEXT NOT NULL
}

CREATE TABLE goals {
    goalId SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    gName TEXT NOT NULL,
    gDesc TEXT NOT NULL
}

