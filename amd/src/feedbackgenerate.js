/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable require-jsdoc */
/* eslint-disable no-console */
/* eslint-disable no-trailing-spaces */
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
 * @module     assignfeedback_essayscorer/feedbackgenerate
 * @copyright  2024 YOUR NAME <your@email.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
// Define a JavaScript module
import ModalFactory from 'core/modal_factory';
import Ajax from 'core/ajax';
// Import {get_string as getString} from 'core/str';

let initialized = false;

export const init = ({instruction, imagefilepath}) => {
    if (!initialized) {
        const handleClick = (e) => {
            // Check if the clicked element is the button
            if (e.target.id === 'id_assignfeedbackessayscorer_generatescore') {
                // window.console.log('Generate score button clicked\n' + imagefilepath);
                // Call the external function to get the score feedback
                getScoreFeedback(instruction, imagefilepath).then(feedback => {
                    feedback = feedback.replace(/\\n/g, '<br>');

                    // Create options for the modal
                    const options = {
                        title: 'AI Generated Score and Feedback',
                        body: `<p>${feedback}</p>`,
                        large: true,
                    };
                    // Create and display the modal with the feedback
                    ModalFactory.create(options).then(modalInstance => {
                        modalInstance.show();
                    }).catch(error => {
                        console.error('Error displaying modal:', error);
                    });
                }).catch(error => {
                    console.error('Error getting score feedback:', error);
                });
            }
        };

        // Add event listener only once
        document.addEventListener('click', handleClick);
        initialized = true;
    }
};

// Function to call the get_scorefeedback external function using AJAX
const getScoreFeedback = (instruction, imagefilepath) => {
    return new Promise((resolve, reject) => {
        // Prepare data for the AJAX request
        const data = {
            instruction: instruction,
            imagefilepath: imagefilepath,
        };

        // Make an AJAX request to call the external function
        Ajax.call([{
            methodname: 'assignfeedback_essayscorer_get_scorefeedback',
            args: data,
            done: function(response) {
                // Resolve with the feedback received from the external function
                resolve(response.feedback);
            },
            fail: function(jqXHR, textStatus, errorThrown) {
                // Reject with the error if there is any
                const error = {
                    jqXHR: jqXHR,
                    textStatus: textStatus,
                    errorThrown: errorThrown
                };
                reject(error);
                console.error('AJAX call failed:', error);
            }
        }]);
    });
};
// Function to handle the click event sample only for testing
// export const init = ({instruction, imagefilepath}) => {
//     if (!initialized) {
//         const handleClick = (e) => {
//             // Create options for the modal
//             const options = {
//                 title: 'AI Generated Score and Feedback',
//                 body: `
//                         <p>Instruction: ${instruction}</p>
//                         <p>Image File Path: ${imagefilepath}</p>
//                     `,
//                 large: true,
//             };

//             // Check if the clicked element is the button
//             if (e.target.id === 'id_assignfeedbackessayscorer_generatescore') {
//                 // Create and display the modal
//                 ModalFactory.create(options).then(modalInstance => {
//                     modalInstance.show();
//                 });

//                 window.console.log('Generate score button clicked');
//             }
//         };

//         // Add event listener only once
//         document.addEventListener('click', handleClick);
//         initialized = true;
//     }

// };