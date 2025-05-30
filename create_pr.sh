#!/bin/bash

# create_pr.sh - Script to create pull requests using GitHub CLI or API
# This script reads PR data from pr_data.json and creates a pull request

set -e  # Exit on any error

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PR_DATA_FILE="${SCRIPT_DIR}/pr_data.json"
DEFAULT_REMOTE="origin"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if required tools are installed
check_dependencies() {
    log_info "Checking dependencies..."
    
    if ! command -v git &> /dev/null; then
        log_error "Git is not installed or not in PATH"
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        log_warning "jq is not installed. JSON parsing will be limited."
        return 1
    fi
    
    return 0
}

# Function to check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log_error "Not in a git repository"
        exit 1
    fi
}

# Function to read PR data from JSON file
read_pr_data() {
    if [[ ! -f "$PR_DATA_FILE" ]]; then
        log_error "PR data file not found: $PR_DATA_FILE"
        exit 1
    fi
    
    log_info "Reading PR data from $PR_DATA_FILE"
    
    if command -v jq &> /dev/null; then
        # Use jq for proper JSON parsing
        PR_TITLE=$(jq -r '.title' "$PR_DATA_FILE")
        PR_BODY=$(jq -r '.body' "$PR_DATA_FILE")
        PR_HEAD=$(jq -r '.head' "$PR_DATA_FILE")
        PR_BASE=$(jq -r '.base' "$PR_DATA_FILE")
    else
        # Fallback to basic parsing (less robust)
        log_warning "Using fallback JSON parsing. Install jq for better reliability."
        PR_TITLE=$(grep -o '"title"[[:space:]]*:[[:space:]]*"[^"]*"' "$PR_DATA_FILE" | sed 's/.*"title"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')
        PR_BODY=$(grep -o '"body"[[:space:]]*:[[:space:]]*"[^"]*"' "$PR_DATA_FILE" | sed 's/.*"body"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')
        PR_HEAD=$(grep -o '"head"[[:space:]]*:[[:space:]]*"[^"]*"' "$PR_DATA_FILE" | sed 's/.*"head"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')
        PR_BASE=$(grep -o '"base"[[:space:]]*:[[:space:]]*"[^"]*"' "$PR_DATA_FILE" | sed 's/.*"base"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')
    fi
    
    # Validate required fields
    if [[ -z "$PR_TITLE" || "$PR_TITLE" == "null" ]]; then
        log_error "PR title is required"
        exit 1
    fi
    
    if [[ -z "$PR_HEAD" || "$PR_HEAD" == "null" ]]; then
        log_error "PR head branch is required"
        exit 1
    fi
    
    if [[ -z "$PR_BASE" || "$PR_BASE" == "null" ]]; then
        PR_BASE="main"
        log_warning "PR base branch not specified, defaulting to 'main'"
    fi
    
    log_info "PR Title: $PR_TITLE"
    log_info "PR Head: $PR_HEAD"
    log_info "PR Base: $PR_BASE"
}

# Function to create PR using GitHub CLI
create_pr_with_gh() {
    if ! command -v gh &> /dev/null; then
        log_error "GitHub CLI (gh) is not installed"
        return 1
    fi
    
    log_info "Creating PR using GitHub CLI..."
    
    # Create the PR
    if gh pr create --title "$PR_TITLE" --body "$PR_BODY" --head "$PR_HEAD" --base "$PR_BASE"; then
        log_success "Pull request created successfully using GitHub CLI"
        return 0
    else
        log_error "Failed to create PR using GitHub CLI"
        return 1
    fi
}

# Function to display PR information (fallback when GitHub CLI is not available)
display_pr_info() {
    log_warning "GitHub CLI not available. Here's the PR information:"
    echo
    echo "Title: $PR_TITLE"
    echo "Head: $PR_HEAD"
    echo "Base: $PR_BASE"
    echo
    echo "Body:"
    echo "$PR_BODY"
    echo
    log_info "To create this PR manually, use the GitHub web interface or install GitHub CLI"
}

# Main function
main() {
    log_info "Starting PR creation process..."
    
    check_git_repo
    check_dependencies
    read_pr_data
    
    if ! create_pr_with_gh; then
        display_pr_info
    fi
}

# Run main function if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
