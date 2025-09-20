# Admin Credentials

## Hardcoded Admin User

For security purposes, the admin user is hardcoded and cannot be registered through the normal registration process.

### Admin Login Credentials:
- **Email**: `admin@ib-dp-assistant.com`
- **Password**: `Admin123!@#`
- **Role**: Administrator
- **Name**: System Administrator

### Security Notes:
1. **Change the password** in production by modifying the `ADMIN_PASSWORD` constant in `src/lib/auth.ts`
2. **Change the email** if needed by modifying the `ADMIN_EMAIL` constant in `src/lib/auth.ts`
3. **Never commit** real admin credentials to version control
4. **Use environment variables** for production deployments

### How to Change Admin Credentials:

1. Open `src/lib/auth.ts`
2. Find the hardcoded admin section (lines 21-23)
3. Update the `ADMIN_EMAIL` and `ADMIN_PASSWORD` constants
4. Redeploy the application

### Production Security Recommendations:

1. Use environment variables:
   ```typescript
   const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ib-dp-assistant.com'
   const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin123!@#'
   ```

2. Use a strong, unique password
3. Consider implementing additional security measures like 2FA
4. Regularly rotate admin credentials
5. Monitor admin access logs

---

**⚠️ IMPORTANT**: This file should be deleted or moved to a secure location before production deployment.
