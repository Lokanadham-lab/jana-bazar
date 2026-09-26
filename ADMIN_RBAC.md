# Admin RBAC

Roles:
- super_admin
- admin
- customer_admin
- seller_admin
- product_admin
- order_admin
- finance_admin
- advertising_admin
- delivery_admin
- service_admin
- b2b_admin
- location_admin
- cms_admin
- support_admin
- security_admin
- analytics_admin

Rules:
1. No public Admin Create Account.
2. Admin accounts are provisioned/invited by an authorized administrator.
3. Frontend role labels are not authorization.
4. Supabase JWT `app_metadata.role` and RLS/backend policies are authoritative.
5. Sensitive actions require MFA/OTP and audit logging in the production backend.
