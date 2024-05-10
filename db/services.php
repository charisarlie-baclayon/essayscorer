<?php
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
 * External functions and service declaration for Essay Scorer Feedback
 *
 * Documentation: {@link https://moodledev.io/docs/apis/subsystems/external/description}
 *
 * @package    assignfeedback_essayscorer
 * @category   webservice
 * @copyright  2024 YOUR NAME <your@email.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

$functions = array(
    'assignfeedback_essayscorer_get_scorefeedback' => array(
        'classname'   => 'assignfeedback_essayscorer_external',
        'methodname'  => 'get_scorefeedback',
        'classpath'   => 'mod/assign/feedback/essayscorer/externallib.php',
        'description' => 'Web service function for getting score feedback.',
        'type'        => 'read',
        'ajax'        => true,
    ),
);

$services = [
    // The name of the service.
    // This does not need to include the component name.
    'Automated Essay Scorer Feedback' => [

        // A list of external functions available in this service.
        'functions' => $functions,

        // If enabled, the Moodle administrator must link a user to this service from the Web UI.
        'restrictedusers' => 0,

        // Whether the service is enabled by default or not.
        'enabled' => 1,

        // This field os optional, but requried if the `restrictedusers` value is
        // set, so as to allow configuration via the Web UI.
        'shortname' =>  'AI Essay Score Feedback',
    ]
];