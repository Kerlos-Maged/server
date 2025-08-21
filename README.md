# Student Competition Backend

A Node.js backend application for managing student competition registrations with automatic welcome email functionality.

## Features

- ✅ Student registration for competitions
- ✅ Automatic welcome email sending
- ✅ MongoDB database with Mongoose ODM
- ✅ Input validation and sanitization
- ✅ RESTful API endpoints
- ✅ Pagination and filtering
- ✅ Competition statistics
- ✅ Email service with HTML and text templates

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Email service credentials (Gmail, SendGrid, etc.)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-competition-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your configuration
   nano .env
   ```

4. **Configure Environment Variables**
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/student-competition
   
   # Email Configuration (Gmail example)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

5. **Start the server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## Email Setup

### Gmail Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password in `EMAIL_PASS`

### Other Email Providers
Update the `EMAIL_HOST` and `EMAIL_PORT` according to your provider:
- **SendGrid**: `smtp.sendgrid.net:587`
- **Outlook**: `smtp-mail.outlook.com:587`
- **Yahoo**: `smtp.mail.yahoo.com:587`

## API Endpoints

### Student Registration
- **POST** `/api/students/register` - Register a new student

### Student Management
- **GET** `/api/students` - Get all students (with pagination/filtering)
- **GET** `/api/students/:id` - Get student by ID
- **PUT** `/api/students/:id` - Update student information
- **DELETE** `/api/students/:id` - Delete student

### Email Operations
- **POST** `/api/students/:id/resend-welcome-email` - Resend welcome email

### Statistics
- **GET** `/api/students/stats/competitions` - Get competition statistics

### Health Check
- **GET** `/health` - Server health status

## API Usage Examples

### Register a Student
```bash
curl -X POST http://localhost:5000/api/students/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "institution": "University of Technology",
    "competition": "Coding Challenge",
    "additionalInfo": "Experienced in JavaScript and Python"
  }'
```

### Get Students with Filtering
```bash
# Get students by competition
curl "http://localhost:5000/api/students?competition=Coding%20Challenge&page=1&limit=10"

# Search students
curl "http://localhost:5000/api/students?search=john&page=1&limit=5"
```

### Resend Welcome Email
```bash
curl -X POST http://localhost:5000/api/students/STUDENT_ID/resend-welcome-email
```

## Data Models

### Student Schema
```javascript
{
  firstName: String (required, 2-50 chars),
  lastName: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  phone: String (required, valid phone),
  institution: String (required, 2-100 chars),
  competition: String (required, enum),
  registrationDate: Date (auto-generated),
  status: String (enum: registered, confirmed, participated, withdrawn),
  welcomeEmailSent: Boolean (auto-tracked),
  welcomeEmailSentAt: Date (auto-tracked),
  additionalInfo: String (optional, max 500 chars),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Supported Competitions
- Coding Challenge
- Science Fair
- Math Olympiad
- Debate Competition
- Art Contest
- Other

## Error Handling

The API returns consistent error responses:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors if applicable
}
```

## Validation Rules

- **Names**: Letters and spaces only, 2-50 characters
- **Email**: Valid email format, unique in database
- **Phone**: International format, 1-16 digits
- **Institution**: 2-100 characters
- **Competition**: Must be from predefined list
- **Additional Info**: Optional, max 500 characters

## Development

### Project Structure
```
├── models/          # Database models
├── routes/          # API route handlers
├── services/        # Business logic (email service)
├── server.js        # Main server file
├── package.json     # Dependencies and scripts
├── env.example      # Environment variables template
└── README.md        # This file
```

### Adding New Features
1. Create models in `models/` directory
2. Add routes in `routes/` directory
3. Implement business logic in `services/` directory
4. Update validation rules as needed
5. Test with appropriate tools (Postman, curl, etc.)

## Testing

Test the API endpoints using tools like:
- **Postman** - GUI-based API testing
- **curl** - Command-line testing
- **Insomnia** - Alternative to Postman
- **Thunder Client** - VS Code extension

## Deployment

### Environment Variables
Ensure all required environment variables are set in production:
- `MONGODB_URI` - Production MongoDB connection string
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`
- `NODE_ENV=production`
- `PORT` - Production port (if different from 5000)

### Process Management
Use process managers like PM2:
```bash
npm install -g pm2
pm2 start server.js --name "student-competition-backend"
pm2 startup
pm2 save
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Ensure network access to MongoDB instance

2. **Email Sending Failed**
   - Verify email credentials in `.env`
   - Check if 2FA is enabled (for Gmail)
   - Ensure app password is correct
   - Check firewall/network restrictions

3. **Validation Errors**
   - Review input data format
   - Check required fields
   - Verify data types and lengths

### Logs
Check console output for detailed error messages and success confirmations.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check console logs for errors
4. Create an issue in the repository

---

**Happy coding! 🚀**
