# UI Automation -- Demoblaze (Playwright)

This project was developed as part of a technical assessment to automate
UI testing for the Demoblaze ecommerce platform.

The solution was implemented using **Playwright with JavaScript (ES
Modules)** and follows the **Page Object Model (POM)** design pattern to
ensure scalability, maintainability, and clean separation of concerns.

------------------------------------------------------------------------

# Tech Stack

-   Node.js\
-   Playwright\
-   JavaScript (ES Modules)\
-   Page Object Model (POM)

------------------------------------------------------------------------

# Project Structure

    DemoBlaze Project/
    │
    ├── components/
    │   ├── Navbar.js
    │   ├── ProductList.js
    │   ├── ProductCard.js
    │   ├── OrderModal.js
    │   ├── PurchaseConfirmationModal.js
    │   ├── SignUpModal.js
    │   └── LoginModal.js
    │
    ├── config/
    │   ├── constants.js
    │   └── env.js
    │
    ├── pages/
    │   ├── BasePage.js
    │   ├── HomePage.js
    │   ├── ProductDetailsPage.js
    │   └── CartPage.js
    │
    ├── utils/
    │   ├── networkHelper.js
    │   ├── dataGenerator.js
    │   ├── fileWriter.js
    │   └── productValidator.js
    │
    ├── tests/
    │   ├── productExtraction.spec.js
    │   ├── productExtraction-approach2.spec.js
    │   ├── purchase.spec.js
    │   ├── deleteFromCart.spec.js
    │   └── auth.spec.js
    │
    ├── exports/
    │   └── (Generated .txt product files)
    │
    ├── playwright.config.js
    └── README.md

------------------------------------------------------------------------

# Setup Instructions

## 1. Install Dependencies

``` bash
npm install
```

## 2. Install Playwright Browsers

``` bash
npx playwright install
```

------------------------------------------------------------------------

# Running Tests

Run all tests:

``` bash
npx playwright test
```

Run all tests sequentially with 1 worker:

``` bash
npx playwright test --workers=1
```

Run specific tests:

``` bash
npx playwright test tests/productExtraction.spec.js
npx playwright test tests/productExtraction-approach2.spec.js
npx playwright test tests/purchase.spec.js
npx playwright test tests/deleteFromCart.spec.js
npx playwright test tests/auth.spec.js
```

Run in headed mode:

``` bash
npx playwright test --headed
```

------------------------------------------------------------------------

# Implemented Test Cases

------------------------------------------------------------------------

## 1. Product Extraction (Official Requirement)

File:\
`tests/productExtraction.spec.js`

### Objective

Extract product information from the **first two pages** of the homepage
and export the results into a `.txt` file.

### Flow

-   Navigate to homepage\
-   Collect products from first page\
-   Click "Next"\
-   Collect products from second page\
-   Export:
    -   Product Name\
    -   Product Price\
    -   Full Product URL\
-   Save file inside `/exports` folder with timestamp in filename

### Why This Matches the Requirement

The assignment explicitly states:

> "Extract information from the first two pages of products"

This implementation strictly follows that instruction without
introducing additional filtering logic.

------------------------------------------------------------------------

## 2. Product Extraction -- Category-Based Approach (Alternative Implementation)

File:\
`tests/productExtraction-approach2.spec.js`

### Objective

Extract products by navigating through **each category** (Phones,
Laptops, Monitors), handling pagination within each category, and
exporting all collected products.

### Flow

-   Navigate to homepage\
-   Iterate through each category\
-   Wait for category API (`/bycat`) response\
-   Collect products\
-   Handle pagination (`/pagination`)\
-   Merge all products\
-   Export to `.txt` file

### Why This Approach Was Built

This version demonstrates:

-   API interception for stability\
-   Dynamic content synchronization\
-   Category-based filtering validation\
-   Scalable extraction logic

### Difference Between Official and Alternative Approach

  -----------------------------------------------------------------------
  Official (First Two Pages)         Category-Based (Approach 2)
  ---------------------------------- ------------------------------------
  Extracts homepage first two pages  Extracts products per category
  only                               

  Follows assignment strictly        Demonstrates advanced handling

  Simpler pagination logic           Includes category API
                                     synchronization

  Minimal scope                      Broader data coverage
  -----------------------------------------------------------------------

The first implementation fulfills the assignment exactly.\
The second demonstrates deeper architectural and synchronization
capabilities.

------------------------------------------------------------------------

## 3. Purchase Flow (End-to-End)

File:\
`tests/purchase.spec.js`

### Flow

-   Open product\
-   Validate name, price, tax label, description\
-   Add to cart\
-   Validate cart contents\
-   Complete order via modal\
-   Validate confirmation modal\
-   Validate redirect\
-   Validate cart empty state

------------------------------------------------------------------------

## 4. Delete From Cart

File:\
`tests/deleteFromCart.spec.js`

### Flow

-   Add product to cart\
-   Validate product presence\
-   Click delete\
-   Validate cart is empty

------------------------------------------------------------------------

## 5. Authentication Flow

File:\
`tests/auth.spec.js`

### Flow

-   Sign up with generated credentials\
-   Validate success dialog\
-   Log in with same credentials\
-   Validate "Welcome username" state\
-   Validate login/logout visibility toggling\
-   Log out\
-   Validate reset state

------------------------------------------------------------------------

# Exported Files

All extracted product files are stored in:

    /exports

File names include timestamp:

    Product List - MM-DD-YYYY - HH-MM-SS.txt

------------------------------------------------------------------------

# Architectural Decisions

-   Page Object Model implementation\
-   Reusable components (Navbar, Modals, ProductList)\
-   Network interception for API synchronization\
-   Separation between UI behavior and test logic\
-   Dynamic test data generation\
-   Clean test readability with minimal raw selectors

------------------------------------------------------------------------

# Possible Improvements

-   CI integration\
-   Cross-browser matrix execution\
-   Enhanced reporting configuration\
-   API-layer validation\
-   Data-driven testing

------------------------------------------------------------------------

# Author

Dhiego Bastos
