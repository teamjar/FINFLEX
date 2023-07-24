CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE stocks (
    stockid SERIAL PRIMARY KEY,
    userid INT NOT NULL,
    ticker TEXT NOT NULL,
    companyName TEXT NOT NULL,
    stockPrice FLOAT NOT NULL,
    quantity INT NOT NULL,
);

CREATE TABLE watchlist (
    watchid SERIAL PRIMARY KEY,
    userid INT NOT NULL,
    ticker TEXT NOT NULL,
    companyName TEXT NOT NULL,
    stockPrice FLOAT NOT NULL,
    quantity INT NOT NULL,
);

CREATE TABLE expense (
    expenseid SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    pName TEXT NOT NULL,
    pDescription TEXT NOT NULL,
    pPrice TEXT NOT NULL,
    pDate DATE DEFAULT NOW() NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE goals (
    goalId SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    gName TEXT NOT NULL,
    gDesc TEXT NOT NULL,
    target FLOAT NOT NULL,
    dateCreated DATE DEFAULT NOW() NOT NULL,
    dateDue DATE NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE bills (
    billId SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    billName TEXT NOT NULL,
    desctripion TEXT NOT NULL,
    due DATE NOT NULL,
    status TEXT CHECK (status IN ('unpaid', 'paid', 'overdue')),
    price FLOAT NOT NULL
);

CREATE TABLE help (
    helpId SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
);

CREATE TABLE budget (
    budgetId SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    earnings FLOAT NOT NULL,
    budget FLOAT NOT NULL
)
