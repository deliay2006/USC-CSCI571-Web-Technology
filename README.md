# USC---CSCI571---Homework1
University of Southern California CSCI-571 Web Technologies Homework1

Homework #1: Building dynamic client-side forms: HTML, JavaScript, DOM and CSS
For the first homework, you are to have a valid link to the HTML page you create for this homework that is available through your Apache web server (that you will install as part of this assignment). You tell us what this link is through the text file that you submit along with your HTML page. The name of your home page is NOT to be index.html. You must change the default name to a different name. If we don't see your homework page through the link you tell us, you don't get the 5 points for a successful Apache install.
We will grade the file you submit for the HTML part. We will not grade the file available from your web server. However, if only the default Apache page (meaning the page you see when first installing Apache) is available from YOUR web server, you will lose 4 of those 5 points. Not only are you to properly install Apache, but we want to know that you know how to put HTML files in the proper place so that they can be seen.
For instance, say you create your file as myhomework1.html. You submit this file to Blackboard - so we know what the name of your homework 1 HTML file is called. In your writeup file, you tell us that you used the cs-server.usc.edu machine and port number 12345. We will use your Apache web server currently installed with the link as: http://cs- server.usc.edu:12345/myhomework1.html AND as http://cs-server.usc.edu:12345. We should see the same HTML document for both links. If we do not see the page you submitted for homework 1, you will lose 4 of the 5 points for not having Apache installed properly.
The first step in this exercise is to download, install and configure the Apache web server. It's very easy to install Apache. Follow the instructions contained in the HTML document also included with this assignment in D2L.
Your second task is to create a dynamic HTML page that actually contains two separate HTML forms and two separate report pages. Only one form, or report, is to be displayed at a time. You get to decide what your forms collect data for. Be creative, it will make the assignment more fun. Your forms are to collect data that is displayable with your two report pages. You must support multiple uses of your forms. The report pages should display data from each use of the forms.
The form elements given below are to be spread as evenly as possible across both of your forms. When the user has completed the first form, and clicked the button to go to the second form, you are ensure that all data in the first form that needs validation is all valid. If any of the data is not valid, display an appropriate error message and stay on the first form.
After a user has properly filled out the first form, allow them to go to the second form. After the second form is also properly filled out, store all the data from both forms into a JavaScript object. You will need an array of these objects to store the data each time the user successfully completes both forms.
The first report is to display a single line of part of the data from each successful use of the two forms. There should be sufficient information so the user can select which form data is to be
￼￼￼
displayed in the second report. The second report is to display all the data entered in both forms that is related to the item the user clicked on in the first report. This way you can test to ensure that you are properly storing all the data from both forms.
You are to have navigation buttons so that the user can go to the first form, or first report, at any time. The second form is only to be displayed when the user has properly filled out the first form. Likewise, the second report is only to be displayed when the user makes a selection from the first report.
Your HTML document (there is to be only one HTML file) must contain at least the following form elements:
 At least 4 selection lists containing at least 5 items each. Two of these selection lists are to be created dynamically - based on a user interaction.
 At least 8 text fields. You decide what their purpose is for these text fields.
 At least one textarea element. Again, you decide its purpose.
 At least four sets of radio buttons. There must be at least 3 buttons in a button group. You
pick the labels and values.
 At least four sets of check boxes. There must be at least 3 check boxes in each set. You
pick the labels and values.
 At least six buttons that execute Javascript to create dynamic HTML effects, or perform
form field validation. This can be moving to the second form, reading user-entered data,
going to a report screen, or performing some action, etc.
 Use CSS in your document to make it look nice. This includes things like an appropriate
background color, nice font and font color, good spacing, etc.
 You are to have at least four (4) images that are appropriate to your topic. One of these
are to be a background image.
 You are to validate at least 4 of the text field values. You decide the validation that is
appropriate. The validation cannot be all of the same type - like an age. There must be 3 different types of validation. At least one of the validation types must be for a date that includes year, month and day.
 At least one set of the radio buttons, one set of check boxes and one of the selection lists is to be required before the user can proceed to the next form - or finish with both forms. Your JavaScript must perform this validation. This must be followed for both forms.
 You can add other requirements for your form, but they cannot conflict with the requirements stated above.
 One report page is to show one line for the data entered by the user of one of the forms. Clicking on something - a button, or some text, will show all the information entered in the second form for that user.
