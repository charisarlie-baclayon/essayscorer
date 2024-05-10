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
 * TODO describe file externallib
 *
 * @package    assignfeedback_essayscorer
 * @copyright  2024 YOUR NAME <your@email.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

 use external_api;
 use external_function_parameters;
 use external_value;
 use external_single_structure;
 use external_multiple_structure;
 
 class assignfeedback_essayscorer_external extends external_api {

    public static function get_scorefeedback($instruction, $imagefilepath) {
        // Validate all parameters.
        $params = self::validate_parameters(
            self::get_scorefeedback_parameters(), 
            array(
                'instruction' => $instruction, 
                'imagefilepath' => $imagefilepath
            ));

        // Your logic here to retrieve score feedback.
        $instruction = $params['instruction'];
        $imagefilepath = $params['imagefilepath'];

        global $CFG;

        // Check if file exists
        if (file_exists($imagefilepath)) {
            // Get image data
            $imagepath = $imagefilepath;
            $imageText = '';

            // Prepare data for API request
            $postData = [
                'file_path' => $imagepath,
            ];
        }

        // Call Image to Text API
        $ch = curl_init('http://127.0.0.1:8000/convert');
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // Set timeout options (adjust as needed)
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0); // Connect timeout in seconds
        curl_setopt($ch, CURLOPT_TIMEOUT, 0); // Total operation timeout in seconds
        $imageresponseText = curl_exec($ch);
        curl_close($ch);

        if ($imageresponseText) {
            $imageresponseData = json_decode($imageresponseText);
            if (isset($imageresponseData->text)) {
                $imageText = $imageresponseData->text;
            }
        }

        if ($imageresponseData === null) {
            // Handle JSON decoding error
            throw new Exception("Error decoding JSON response: " . json_last_error_msg());
        }

        // Call Score and Feedback Generator API
        $feedback = '';
        // $imageText = 'The article entitled “HOW THE GLOBAL TECH ELITE IMAGINE THE FUTURE” have made me aware what kinds of ideas of the future guide wealthy entrepreneurs in their investments and what are its impact to the global future. The article is just a glimpse into these hypothetical futures, but it also explores where these tech entrepreneurs think the world is heading in the near future, and how they are managing those expectations. Tech billionaires tend to be at the forefront of global challenges, often with a technological solution in tow, Jeff Bezos is the richest person in the world, Elon Musk is the co-founder of Tesla, and Elon Musk has plans to colonize Mars by 2025, Bezos is firmly embedded in the capitalist mindset, and sees growth as an imperative, and Musk has serious concerns about the low birth rate globally and its implications for the future of humanity. If the fate of mankind really depends on the management and allocation of resources, then surely these tech entrepreneurs manage the allocation of vast resources. They work hard to create the world, or future, in their own image, investing in very selective futures that clearly benefit certain groups of people more than others. After reading the article I want to learn more about the future and how these billionaires will change our everyday lives. The question I want to ask is How unstoppable wealthy entrepreneurs are building the future while also taking care of the impact?';
        if (!empty($imageText)) {
            $postData = [
                'instruction' => $instruction,
                'essay' => $imageText
            ];
            $ch = curl_init('https://357d-35-204-126-47.ngrok-free.app/score');
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            // Set timeout options (adjust as needed)
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0); // Connect timeout in seconds
            curl_setopt($ch, CURLOPT_TIMEOUT, 0); // Total operation timeout in seconds
            $responseText = curl_exec($ch);
            curl_close($ch);

            $responseData = json_decode($responseText);

            if ($responseData === null) {
                // Handle JSON decoding error
                throw new Exception("Error decoding JSON response: " . json_last_error_msg());
            }
            if (isset($responseData->result)) {
                $feedback = $responseData->result;
            }
        }

        $result = array(
            'feedback' => $feedback 
        );

        return $result;
    }
    public static function get_scorefeedback_parameters() {
        return new external_function_parameters([
            'instruction' => new external_value(PARAM_TEXT, 'Instruction for scoring'),
            'imagefilepath' => new external_value(PARAM_TEXT, 'Path to image file'),
        ]);
    }

    public static function get_scorefeedback_returns(){
        return new external_single_structure(
            array(
            'feedback' => new external_value(PARAM_TEXT, 'Score feedback'),
        ));
    }
 }