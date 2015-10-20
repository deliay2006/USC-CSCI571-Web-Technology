# USC---CSCI571---Homework2
University of Southern California CSCI-571 Web Technologies Summer 2015 Homework2

Homework #2: Building Your Company's Web-based Information System for Employees
In this assignment, you will select a type of company and build a Web-based information system to allow your employees to manage your business and find out how you are doing. You must decide what your company is going to sell. It can be products, or services - like cutting hair, delivering packages, selling cars, etc.
In this assignment you will be installing the MySQL database and creating a web site in your Unix account using HTML, JavaScript, AJAX, SQL and PHP. Like homework 1, I expect form field validation to be performed. It should not be possible to put 'bad' data into your database, or have a PHP script abort because something happened relating to incorrect data. NO OTHER SOFTWARE IS ALLOWED EXCEPT PHP, HTML, CSS, SQL, AJAX AND JAVASCRIPT. All are to be hosted through your Apache web server and MySQL database.
I've developed a disk-saving installation process. Turns out MySQL 5.0 is 60MB even when zipped and tarred. The PHP installation instructions, provided as a separate file in the assignment 2 folder, allow you to untar the file directly from the CSCI 350 Unix account and saves you 60MB of space - and copy/download time. A good reference document for all kinds of info about MySQL
is http://dev.mysql.com/doc/refman/5.0/en/index.html.
For more information about how to run MySQL, change the MySQL password, etc.,
read the Running MySQL document in the assignment folder in D2L.  Your website must include the following general capabilities:
 A login page for employees that establishes a logon session variable in PHP to keep track of the user. This logon session variable MUST time out - for security reasons. There are 3 types of employees: (1) administrators that can only create, modify, and delete user IDs and passwords, (2) managers that only view reports, and (3) sales managers that can add, modify, and delete, products and product categories.
 You are to have a set of HTML pages to allow your employees to manage your web site data. I like to call this the administrative side of a web site. You need at least the following:
o An administrative login page (for all employees) - with session variables to track them appropriately. This is to time out.
o A set of pages that allow for the management of your products/services, product categories, special sales, users, and administrators. This means you must be able to add, change, or remove any of these five types of data- or anything else that you create. This is NOT to be done by typing SQL into the form. None of the 3 types of employees are programmers and they are not to be required to know SQL.
￼
o A set of reports so the managers in your company can view any of the data in your database. Managers can't be trusted to actually change anything, but they are to be able to view any data in any of your tables. They are also to be allowed search options. The options that are to be provided are given below. The manager is to be able to specify any, or all, of the search criteria. For example, a manager might want to see all the products in a product category that have a price between $50 and $100.
 For products: product price range, product name, product category
 For employees: by type of employee, pay range
 For special sales: product price range, product name, product category,
sale start date, sale end date
 You are to have at least four different product categories. Each product category is to
contain at least four products.
 Special sales are products that have been discounted. Your special sales table is not to
contain product information details other than a numeric product ID. This table is just to contain the new information that is needed to identify a product that has a special sales price. Special sales products are discounted by some percentage. In addition, special sales have a specified start date and a specified end date.
 Employee data is to contain at least the following data: user ID, password, first name, last name, age, and employee type. You may want other information, as well.
 Create a WRITEUP file that describes your web site, how it works, your database (including field names, field types and sizes). Include names and descriptions of each HTML page and each PHP script.
 Lastly, you are to use AJAX where it makes sense. AJAX can considerably improve the user's experience with your web site.
Submission
