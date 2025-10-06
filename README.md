# FashionHub Test Automation Suite

[![Playwright Tests](https://github.com/nasrwiz/LuxExperienceAssignment/actions/workflows/playwright-tests.yml/badge.svg)](https://github.com/nasrwiz/LuxExperienceAssignment/actions/workflows/playwright-tests.yml)

> **Prepared by Nasr Ullah on October 05, 2025**

A comprehensive test automation suite for the FashionHub website using Playwright, supporting cross-browser testing and multiple environments.

## 🚀 Features

- **Cross-browser Testing**: Chrome, Firefox, Safari, and mobile browsers
- **Multi-environment Support**: Local, staging, and production environments
- **Docker Support**: Containerized testing with Docker and Docker Compose
- **Comprehensive Test Cases**: Website functionality, link validation, login testing, and GitHub API integration
- **CSV Export**: Automated pull request data extraction and export
- **CI/CD Ready**: Jenkins pipeline compatible

## 📋 Test Cases Implemented

### Test Case 1: Basic Website Functionality
- ✅ **Website Loading**: Verifies FashionHub website loads successfully
- ✅ **Navigation Elements**: Checks that navigation elements are present and visible
- ✅ **Page Title Validation**: Confirms correct page title "Home - FashionHub"
- ✅ **Cross-browser Compatibility**: Tests across all supported browsers

### Test Case 2: Link Status Code Validation
- ✅ **Link Discovery**: Automatically finds all links on the FashionHub website
- ✅ **Status Code Verification**: Ensures all links return 200 or 30x status codes
- ✅ **Error Prevention**: Validates no 40x status codes are present
- ✅ **Link Processing**: Handles both internal and external links correctly
- ✅ **Success Rate Reporting**: Provides detailed link validation statistics
- ✅ **Dynamic URL Resolution**: Uses configuration for base URL instead of hardcoded values

### Test Case 3: Login Functionality Verification
- ✅ **Valid Login**: Tests successful login with credentials from environment variables
- ✅ **Environment Configuration**: Uses TEST_USERNAME and TEST_PASSWORD from .env file
- ✅ **Invalid Login**: Validates proper handling of invalid credentials
- ✅ **Form Elements**: Verifies username, password, and submit button presence
- ✅ **Success Indicators**: Detects successful login via URL redirect and welcome message
- ✅ **Error Handling**: Confirms appropriate error messages for failed attempts
- ✅ **Screenshot Capture**: Takes before/after login screenshots for debugging
- ✅ **Security**: No hardcoded credentials in source code

### Test Case 4: GitHub Pull Request Data Extraction
- ✅ **API Integration**: Fetches data from GitHub API (configurable repository)
- ✅ **Open PRs**: Retrieves all open pull requests with full details
- ✅ **All PRs**: Fetches both open and closed pull requests
- ✅ **CSV Export**: Exports data in CSV format with PR name, created date, author, URL
- ✅ **Data Validation**: Validates CSV format and content structure
- ✅ **File Management**: Creates organized output files in test-results directory
- ✅ **Configuration**: Uses environment variables for GitHub API URL and repository

## 🛠️ Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (for containerized testing)
- Git

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LuxExperienceAssignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run install:browsers
   ```

4. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env file with your configuration
   # IMPORTANT: Set TEST_USERNAME and TEST_PASSWORD for login tests
   ```

## 🚀 Running Tests

### Local Development

1. **Run all tests**
   ```bash
   npm test
   ```

2. **Run tests in headed mode (visible browser)**
   ```bash
   npm run test:headed
   ```

3. **Run tests with UI mode**
   ```bash
   npm run test:ui
   ```

4. **Run specific test cases**
   ```bash
   # Run only Test Case 1
   npx playwright test tests/test-case-1.spec.ts
   
   # Run only Test Case 2
   npx playwright test tests/test-case-2.spec.ts
   
   # Run only Test Case 3
   npx playwright test tests/test-case-3.spec.ts
   
   # Run only Test Case 4
   npx playwright test tests/test-case-4.spec.ts
   ```

## 📊 Test Results

### Latest Test Execution Results
- **Total Tests**: 50 tests
- **Status**: ✅ All Passed
- **Execution Time**: ~22 seconds
- **Browser Coverage**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari

### Test Case Results Summary
- **Test Case 1**: ✅ 10 tests passed - Basic website functionality
- **Test Case 2**: ✅ 10 tests passed - Link validation (100% success rate)
- **Test Case 3**: ✅ 15 tests passed - Login functionality (valid & invalid)
- **Test Case 4**: ✅ 15 tests passed - GitHub API & CSV export

### Generated Files
After running tests, the following files are created in `test-results/`:
- `pull-requests.csv` - Open pull requests data
- `all-pull-requests.csv` - All pull requests (open & closed)
- `sample-pull-requests.csv` - Sample data for validation
- `before-login.png` & `after-login.png` - Login screenshots
- `results.json` - Detailed test results
- `results.xml` - JUnit format results

## 📊 Test Reports

After running tests, you can view detailed reports:

```bash
# View HTML report
npm run test:report
```

## 🔧 Configuration Files

- `playwright.config.ts` - Main Playwright configuration
- `tsconfig.json` - TypeScript configuration
- `env.example` - Environment variables template

## 📁 Project Structure

```
├── src/
│   └── utils/
│       └── config.ts    # Configuration utility
├── tests/               # Test files
│   ├── test-case-1.spec.ts  # Basic website functionality tests
│   ├── test-case-2.spec.ts  # Link status code validation tests
│   ├── test-case-3.spec.ts  # Login functionality tests
│   └── test-case-4.spec.ts  # GitHub API & CSV export tests
├── test-results/        # Test output and reports
│   ├── pull-requests.csv     # GitHub PR data
│   ├── all-pull-requests.csv # All PRs data
│   ├── before-login.png      # Login screenshots
│   ├── after-login.png       # Login screenshots
│   ├── results.json          # Test results
│   └── results.xml           # JUnit results
├── playwright.config.ts # Playwright configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
├── env.example          # Environment variables template
└── README.md           # This file
```

## 🐛 Troubleshooting

### Common Issues

1. **Browser installation fails**
   ```bash
   npx playwright install --force
   ```

2. **Permission issues on Linux**
   ```bash
   sudo chown -R $USER:$USER test-results/
   ```

### Debug Mode

Run tests in debug mode to troubleshoot issues:

```bash
npm run test:debug
```

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review test logs in `test-results/`
3. Create an issue in the repository

---

**Note**: This test suite is designed for the FashionHub demo application. Make sure the target application is running before executing tests.