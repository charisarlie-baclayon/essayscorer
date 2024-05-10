## AI Score Feedback Generator Plugin

This plugin integrates an AI-powered service for generating score feedback based on uploaded images.

**Features:**

* Leverages an external API for image text extraction and text extraction (Google Vision OCR).
* Uses an external API of a fine-tuned Mistral 7b LLM for automated essay score and feedback generation.

**Requirements:**

* **Moodle Version:** Moodle 3.8
* **PHP Version:** PHP 7.1 
* **External API:** This plugin relies on a separate API endpoint for image text extraction (OCR) and feedback generation (NLP).

**Installation:**

1. Download the plugin folder and extract it into the `mod/assign/feedback` directory of your Moodle installation.
2. Visit **Site administration** and a prompt for installation will appear.
3. Proceed with installation.
4. After installation, you'll need to configure `externallib.php` file for the API calls.

**Configuration:**

The `externallib.php` file allows you to configure the following:

* **API Base URLs:** The base URL of your external API endpoint is responsible for image text extraction and feedback generation.
  
**Usage:**

1. Create a new assignment or quiz that allows file uploads.
2. Make sure to select **File submissions** for **Submission types**.
3. Unselect **Feedback comments** and select **Essay Scorer Feedback**.
4. Set max **Grade** to be **5**.
5. Students can upload images containing the handwritten essay content to be assessed.
6. Within your assignment grade view, there'll be a button that triggers the AI scoring process. 
7. Upon clicking the button, the plugin will get the current context's submission image file and assignment instructions to be used for the external function.
8. The uploaded image will be sent to the external API for processing.
9. Once processed, the AI-generated score feedback will be displayed in a modal window.

**Disclaimer:**

* This plugin utilizes an external API for image text extraction and feedback generation. 
* The accuracy and reliability of the generated feedback may vary. 
* It's recommended to use this plugin as a supplemental tool alongside your assessment practices.
