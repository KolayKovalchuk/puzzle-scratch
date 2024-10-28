
# Localisation and Config Update Process

## Prerequisites

Before each update step, ensure you’re working with the latest version of the repository on the `main` branch. Run the following commands to fetch and switch to the latest code on `main`:

```bash
git checkout main
git pull origin main
```

> **Note**: Only the `main` branch is part of the automated delivery to infrastructure. Other branches are not included in this automation.

## Localisation File Update Process

Follow these steps to update the localisation files.

### Step 1: Download the Localisation File
1. Open the localisation Google Sheet.
2. Download the sheet as a CSV file.

### Step 2: Convert CSV to JSON
1. Use [https://csvjson.com/csv2json](https://csvjson.com/csv2json) to convert the CSV file to JSON format.
2. Download the converted JSON file.

### Step 3: Rename the File with a New Version
1. In the project repository under the `localisation` directory, identify the current highest version of the localisation file (e.g., `v1.2.json`).
2. Rename the downloaded file to the next version increment (e.g., `v1.3.json`).

### Step 4: Copy the New File to the Repo
1. Copy the newly renamed JSON file into the `localisation` folder in the repository.

### Step 5: Update Configuration Files
1. In the `config` directory, locate the configuration files for each environment (`dev-config.json`, `qa-config.json`, and `config.json` for production).
2. Update the `"LOCALISATION"` key in each environment’s configuration file to point to the new JSON file (e.g., update `"v1.2.json"` to `"v1.3.json"`).

### Step 6: Testing the Localisation Update
1. If you’re deploying to production, it is **strongly recommended** to test the new localisation on `dev` or `qa` environments first.
2. Only after successful testing on `dev` or `qa`, update the production configuration file.

### Step 7: Clean Up Old Localisation Files
1. Remove older localisation files from the `localisation` directory, keeping only the latest two versions (compared to the current production version).

### Step 8: Validate the Localisation File
There are scripts available to validate the structure of localisation files before uploading. Run these scripts by passing the file name as a parameter in the `localisation` folder.

#### Linux/Mac Validation

1. Open a terminal and navigate to the project’s root directory.
2. Make the script executable if it’s not already:

   ```bash
   chmod +x validate_localisation.sh
   ```

3. Run the validation script:

   ```bash
   ./validate_localisation.sh localisation/v1.3.json
   ```

#### Windows Validation

1. Open a command prompt or PowerShell and navigate to the project’s root directory.
2. Run the validation script:

   ```cmd
   validate_localisation.bat localisation\v1.3.json
   ```

### Step 9: Commit and Push Changes
1. Stage and commit the new localisation file and any configuration file updates:

   ```bash
   git add localisation/v1.3.json config/dev-config.json config/qa-config.json config/config.json
   git commit -m "Update localisation to v1.3 and update configuration files"
   ```

2. Push your changes to the repository:

   ```bash
   git push origin main
   ```

### Step 10: Wait for Deployment
After about a minute, the changes will automatically apply to the corresponding environment.

### Step 11: Manual Validation (Optional)
To manually verify that the changes are applied, open the updated config file in the respective environment:

- Dev: [https://puzzle-config.storage.googleapis.com/config/dev-config.json](https://puzzle-config.storage.googleapis.com/config/dev-config.json)
- QA: [https://puzzle-config.storage.googleapis.com/config/qa-config.json](https://puzzle-config.storage.googleapis.com/config/qa-config.json)
- Prod: [https://puzzle-config.storage.googleapis.com/config/config.json](https://puzzle-config.storage.googleapis.com/config/config.json)

## Configuration File Update Process

To update a configuration file:
1. Modify the file’s contents as needed.
2. Commit and push the updated file:

   ```bash
   git add config/your-config-file.json
   git commit -m "Update configuration settings"
   git push origin main
   ```

To validate manually, open the respective environment’s URL (see Step 11 above).

--- 

This process ensures that localisation and configuration updates are applied consistently and reliably across environments.
