# Tulsi Devi School, Beawar — Website + School Portal (Demo)

This version keeps the original public-facing school website and adds a role-based School Portal.

## Run locally
1. Extract the ZIP.
2. Open the `tulsi_devi_school` folder in VS Code.
3. Use VS Code Live Preview / Live Server, or open `index.html`.
4. No build system or Higgsfield is required.

## Demo logins
### Student
- Username: `student1001`
- Password: `1234`

### Teacher
- Teacher ID: `T001`
- Password: `teacher123`

### Administrator
- Username: `admin`
- Password: `admin123`

## What the portal can do

### Administrator
- See all 77 demo students (7 in each of PP3, PP4, PP5, 1–8)
- Search/filter students
- Update student name, class, roll number, attendance, marks and fees
- Manage 4 installments
- Post/update/delete notices, including Emergency Holiday notices
- Edit teacher names, subjects and class assignments
- See parent/student questions, complaints and payment references
- Mark messages resolved
- Edit selected public website content
- Reset all browser-stored demo changes

### Teacher
- Login with a teacher account
- See students in their assigned class
- See class marks/attendance
- Cannot see student fees, payment information or phone details
- Upload notes, question papers, homework and study material for their class
- View parent/student questions and complaints for their class

### Student / Parent
- Read-only personal dashboard
- View their own marks, attendance and fee information
- View 4 installment status
- Start a DEMO UPI payment
- Submit a payment reference
- Send a question, complaint/शिकायत, payment question or general message
- Cannot edit marks, fees, notices, teachers or other student records

## Important: demo security
This is a front-end demo. Changes are stored in the browser's `localStorage`, so they are not a real multi-device school database and the demo credentials/data can be inspected by anyone who has the files.

For a real school deployment, use:
- server-side authentication and authorization
- password hashing
- a real database
- role-based permissions enforced on the server
- HTTPS
- secure sessions
- real payment-gateway integration instead of a demo UPI link
- file storage with access controls

Do not put real student phone numbers, addresses, passwords, marks or fee records into this demo until a secure backend is added.

## Payment
The displayed UPI is fictional: `tulsischool@upi`.
Do not use it for real payments.

## Reset
Administrator → Reset Demo restores the original demo dataset in the current browser.

© Demo project — Tulsi Devi School, Beawar
