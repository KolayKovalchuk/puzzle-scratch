#!/bin/bash

# Check if the file name is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <file_name>"
    exit 1
fi

# Path to the JSON file
FILE="./localisation/$1"

# Check if the file exists
if [ ! -f "$FILE" ]; then
    echo "File not found!"
    exit 1
fi

# Validate JSON structure
if ! jq empty "$FILE" 2>/dev/null; then
    echo "Invalid JSON format."
    exit 1
fi

# Get the expected set of language keys from the first item
EXPECTED_KEYS=$(jq -r '.[0] | keys_unsorted | .[]' "$FILE" | grep -v 'Key')

# Check each item for the same language keys
jq -c '.[]' "$FILE" | while read -r item; do
    # Extract the Key for the current item
    ITEM_KEY=$(echo "$item" | jq -r '.Key')
    # Extract language keys from the current item
    CURRENT_KEYS=$(echo "$item" | jq -r 'keys_unsorted | .[]' | grep -v 'Key')

    # Identify missing keys by comparing the expected and current keys
    MISSING_KEYS=$(echo "$EXPECTED_KEYS $CURRENT_KEYS" | tr ' ' '\n' | sort | uniq -u)

    if [ -n "$MISSING_KEYS" ]; then
        echo "Error: Inconsistent languages in item: $ITEM_KEY"
        echo "Missing keys: $MISSING_KEYS"
        exit 0
    fi
done

echo "JSON is valid"
exit 0
