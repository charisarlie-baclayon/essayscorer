// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Module for generating score feedback based on image data.
 * @module assignfeedback_essayscorer/scorefeedback
 */

/**
 * Generates a score based on feedback text.
 * This function retrieves feedback text from a TinyMCE editor, performs basic validation
 * Prepares data, makes an AJAX call to a PHP function, and updates the editor with the generated score.
 */

define(['jquery', 'core/ajax', 'core/notification', 'core/str'], function($, Ajax, Notification, str) {

    /**
     * Handles the generation of score based on feedback.
     * @memberof module:assignfeedback_essayscorer/scorefeedback
     * @function generateScore
     * @inner
     */
    function generateScore() {
        // Get content from TinyMCE editor
        var feedbackText = tinyMCE.get('assignfeedbackcomments_editor').getContent();

        // Prepare data for external function
        var instruction = 'Your instruction text'; // Replace with appropriate function to get instruction text
        var imagefilepath = 'path/to/image/file'; // Replace with actual image path (modify if needed)
        var courseid = 'Your course ID'; // Replace with function to get current course ID

        // AJAX call to PHP function
        Ajax.call([{
            methodname: 'assignfeedback_essayscorer_get_scorefeedback', // Replace with the actual name of your PHP function
            args: {
                instruction: instruction,
                imagefilepath: imagefilepath,
                courseid: courseid,
                feedbackText: feedbackText
            },
            done: function(response) {
                // Handle response from external function
                if (response) {
                    // Update feedback comments field with the generated score (if provided)
                    tinyMCE.get('assignfeedbackcomments_editor').setContent(response);
                    Notification.alert(str.get_string('score_generated_success', 'assignfeedback_essayscorer'));
                } else {
                    Notification.alert(str.get_string('score_generation_error', 'assignfeedback_essayscorer'));
                }
            },
            fail: function() {
                Notification.alert(str.get_string('ajax_error', 'assignfeedback_essayscorer'));
            }
        }]);
    }

    // Expose the function for initialization
    return {
        /**
         * Initializes the generateScore function by adding an event listener to the button.
         * @memberof module:assignfeedback_essayscorer/scorefeedback
         * @function init
         * @inner
         */
        init: function() {
            // Add event listener to the button
            document.getElementById('assignfeedbackessayscorer_generatescore').addEventListener('click', generateScore);
        }
    };
});


// Function generateScore() {
//     // 1. Get feedback text from the editor (replace 'assignfeedbackcomments_editor' with the actual ID)
//     const feedbackText = document.getElementById('assignfeedbackcomments_editor').value;
//     // 2. (Optional) Perform basic validation on feedback text (e.g., not empty)
//     // 3. Prepare data for external function
//     const instruction = get_string('instruction_for_scoring', 'assignfeedback_esscorer'); 
//     // Replace with appropriate function to get instruction text
//     const course = get_course_id(); // Replace with function to get current course ID
//     // 4. Call external function using AJAX
//     fetch('/your/moodle/path/to/local_assignfeedback_essayscorer_get_scorefeedback.php', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         instruction: instruction,
//         imagefilepath: 'path/to/image/file', // Replace with actual image path (modify if needed)
//         course: course,
//         feedbackText: feedbackText, // Include feedback text from editor
//       })
//     })
//     .then(response => response.json())
//     .then(data => {
//       // 5. Handle response from external function
//       if (data) {
//         // Update feedback comments field with the generated score (if provided)
//         document.getElementById('assignfeedbackcomments').value = data || '';
//         alert('Score generated successfully!');
//       } else {
//         alert('Error generating score. Please try again later.');
//       }
//     })
//     .catch(error => {
//       console.error('Error sending feedback:', error);
//       alert('An error occurred. Please try again later.');
//     });
//   }
//   // 6. Add event listener to the button
//   document.getElementById('assignfeedbackessayscorer_generatescore').addEventListener('click', generateScore);