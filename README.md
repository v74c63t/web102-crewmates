# Web Development Project 7 - _Crewmates_

Submitted by: **Vanessa Tang**

This web app: **is a character creator for the game Honkai: Star Rail. Users may assign characters a name and assign them a path and element based on existing paths/elements in the game. Users can also set the base stats of their character, but depending on the character's path, the minimum value for a particular stat may be adjusted. If the current value for the stat does not meet the adjusted minimum, it will be set to the new minimum. If users try to create a character with stats that do not meet the minmax requirements, they will receive an alert that tells them to insert valid values before the form can be submitted. On the `Character Gallery` page, users can view all the characters that have already been created and stored in the database. The details on the page are condensed and only show the name, the element, and the path of a character. To view more information about the character, users will have to click on the card and go to the `Character Detail` page to see all the base stats and a generalized description about the character. The `Character Gallery` page also contains some summary statistics on the top that shows the number of characters by path and the number of characters by element on separate pie charts. Lastly, users can also edit and delete existing characters**

Time spent: **14** hours spent in total

## Required Features

The following **required** functionality is completed:

-   [x] **A create form allows users to add new cremates**
-   [x] **Users can name the crewmate and set the crewmate's attributes by clicking on one of several values**
-   [x] **The site displays a summary page of all the user's added crewmates**
-   [x] **A previously created crewmate can be updated from the crewmate list**
-   [x] **A previously created crewmate can be deleted from the crewmate list**
-   [x] **Each crewmate has a direct, unique link to an info page about them**

The following **optional** features are implemented:

-   [x] A crewmate can be given a category upon creation which restricts their attributes
-   [x] The site displays summary statistics about a user's crew on their crew page
-   [ ] The site displays a custom "success" metric about a user's crew which changes the look of the crewmate list

The following **additional** features are implemented:

-   [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->

GIF created with [Kap](https://getkap.co/) for macOS

<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.

I had issues with using the input fields for numbers for the form. I originally thought it would automatically prevent values that were out of bound to be inputted, but that did not seem to be the case so I had to do the checking myself.

## License

    Copyright [2024] [Vanessa Tang]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
