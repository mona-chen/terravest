#!/bin/bash

# Comprehensive E2E Test Runner for TerraVest
# Tests all features and modules

echo "======================================"
echo "TerraVest Comprehensive E2E Test Suite"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to run tests and report results
run_test_suite() {
    local suite_name=$1
    local spec_file=$2
    
    echo -e "${YELLOW}Running: $suite_name${NC}"
    echo "--------------------------------------"
    
    if npx playwright test "$spec_file" --reporter=line; then
        echo -e "${GREEN}✓ $suite_name passed${NC}"
        return 0
    else
        echo -e "${RED}✗ $suite_name failed${NC}"
        return 1
    fi
    echo ""
}

# Track overall results
FAILED=0

# Run all test suites
echo "Starting comprehensive test run..."
echo ""

run_test_suite "Landing Page Tests" "e2e/landing-page.spec.ts" || ((FAILED++))
run_test_suite "Authentication Tests" "e2e/auth.spec.ts" || ((FAILED++))
run_test_suite "Dashboard Tests" "e2e/dashboard.spec.ts" || ((FAILED++))
run_test_suite "Portfolio Tests" "e2e/portfolio.spec.ts" || ((FAILED++))
run_test_suite "Documents Tests" "e2e/documents.spec.ts" || ((FAILED++))
run_test_suite "Messages & Notifications Tests" "e2e/messages-notifications.spec.ts" || ((FAILED++))
run_test_suite "Profile & Settings Tests" "e2e/profile-settings.spec.ts" || ((FAILED++))
run_test_suite "Opportunities & Compliance Tests" "e2e/opportunities-compliance.spec.ts" || ((FAILED++))
run_test_suite "Admin Tests" "e2e/admin.spec.ts" || ((FAILED++))

echo ""
echo "======================================"
echo "Test Run Complete"
echo "======================================"

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All test suites passed!${NC}"
    exit 0
else
    echo -e "${RED}$FAILED test suite(s) failed${NC}"
    exit 1
fi
