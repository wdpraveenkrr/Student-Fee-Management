![paymentlist](https://github.com/user-attachments/assets/6e7b6953-5a84-4e05-9ee7-039741cb9db3)<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/1345e602-f971-4a66-9c65-cbd4c0d2cdc8" />Student Fee Management System :-
--------------------------------

  A full-stack web application designed to help educational institutions efficiently manage student information, courses, and fee records.The system includes role-based access for Admin and Students, ensuring secure handling of data and smooth fee management.

Key Features
------------

* User Authentication & Authorization
* Secure login/signup with JWT authentication.
* Separate portals for Admin and Student.

Admin Panel
-----------

* Add, update, and manage student profiles.
* Create and manage courses with duration and fee details.
* Track fee payments (paid, pending, or partially paid).
* Generate reports and summaries for financial tracking.

Student Panel
-------------

* View enrolled courses and course details.
* Check fee structure, payment history, and pending dues.
* Download receipts for payments.
* Fee Management - Store and update payment records.
* Calculate balances automatically.
* Summarized reports for quick insights.

------------------------------------------------------------

Checkout for live demo :-
      frontend = https://prince-institution.onrender.com/
-----------------------------------------------------------------

![Login](https://github.com/user-attachments/assets/7bdc15f6-7c17-4c5a-a19b-0db525d72d2e)
---------------------------- Login Page ------------------------------------------

  Authentication implemented using JWT (JSON Web Token). Passwords stored securely with bcrypt.js hashing. Unauthorized users are redirected to the login page.
----------------------------------------------------------------------------------
![Register](https://github.com/user-attachments/assets/ca1d2c59-43de-4cac-8809-43b8f8b88e5a)
------------------------------ Register ------------------------------------------
The student enters their name, email, and password in the registration form. The system validates input (checks for empty fields, valid email format, and password strength). The email is checked for uniqueness to prevent duplicate accounts. Password is hashed using bcrypt.js before storing in the database. A confirmation response is sent after successful registration.

----------------------------------------------------------------------------------

![Dashboard](https://github.com/user-attachments/assets/b626c8a7-448b-47cc-8af4-f16ad397a9e4)
---------------------------- Dashboard -------------------------------------------

* Total Course Fee – Displays the total amount for all courses enrolled by the student.
* Paid Amount – Shows the total fee already paid by the student.
* Balance Amount – Automatically calculates and displays the remaining fee (Total Fee – Paid Fee).
-----------------------------------------------------------------------------------

![Profile](https://github.com/user-attachments/assets/5ebec7a1-e0a1-4fd0-93a9-265f280362b9)
---------------------------- Profile ---------------------------------------------

![course](https://github.com/user-attachments/assets/91048dca-b111-464b-89b3-8db23762e661)
---------------------------- My Course -------------------------------------------

![addpay](https://github.com/user-attachments/assets/7e6f35ec-7a09-4c49-ba62-c17f308b9ee4)
---------------------------- Add Payment -----------------------------------------

![paymentlist](https://github.com/user-attachments/assets/d62ef65f-7ed6-40c8-9e1f-dd64cb8ae8fc)
---------------------------- Payment List ----------------------------------------

![Feedback](https://github.com/user-attachments/assets/1d58527a-87ff-4382-8966-77ae83865873)
---------------------------- Feedback---------------------------------------------




      


