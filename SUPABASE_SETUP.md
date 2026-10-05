# Pawar Enterprises — Supabase Production Backend Handoff

The current repository includes a fully working browser demo using `localStorage`. This is intentional for instant frontend testing. Production should replace the demo data layer with Supabase so leads, quotations, services and projects are shared securely across all devices.

## Production modules

### 1. Services
Suggested table: `services`
- id
- name
- slug
- description
- unit
- base_price
- minimum_charge
- icon_code
- is_active
- sort_order
- created_at
- updated_at

Public users should only be able to read active services. Only authorized admins should create, update, hide or delete service records.

### 2. Leads
Suggested table: `leads`
- id
- full_name
- phone
- email
- location
- requested_service
- message
- source
- status
- quotation_id (nullable)
- utm_source / utm_medium / utm_campaign
- gclid / fbclid
- created_at

Public website visitors should be allowed to INSERT a lead, but never list/read all leads. Admins can read and update lead status.

### 3. Quotations
Suggested tables:
- `quotations`
- `quotation_items`

Quotation fields:
- id
- quote_number
- customer_name
- phone
- email
- location
- notes
- subtotal
- tax_amount
- total_amount
- status
- created_at

Quotation item fields:
- id
- quotation_id
- service_id
- service_name_snapshot
- unit_snapshot
- quantity
- rate_snapshot
- amount

Store rate/name snapshots on quotation items so older quotations do not change when an admin edits a future service rate.

### 4. Live Projects
Suggested table: `projects`
- id
- title
- service_type
- location
- status
- progress_percent
- start_date
- public_note
- is_public
- created_at
- updated_at

Use a Supabase Storage bucket such as `project-media` for before/current/after photos. Store Storage paths in a related `project_media` table if multiple images are needed.

### 5. Admin authentication
Use Supabase Auth for admin login. Do not ship a hard-coded production password.

Recommended authorization model:
- Authenticated user signs in through Supabase Auth.
- Admin authorization is stored in trusted server-controlled app metadata or a protected admin profile/role table.
- Never make authorization decisions from user-editable user metadata.

## Security requirements

- Use a Supabase publishable key in browser code; never expose a secret/service-role key in the frontend.
- Enable Row Level Security on every table exposed through the Data API.
- Public policies should be narrowly scoped. Example: public SELECT only active/public services and projects; public INSERT only leads/quotation submissions that are intentionally accepted.
- Leads and quotations must not have public SELECT policies.
- Admin UPDATE policies need both appropriate row access and checks.
- Storage policies should allow public viewing only for media intentionally published on the website; uploads/updates should require admin authorization.
- Run Supabase database/security advisors before production launch.

## Demo → Supabase migration map

| Demo layer | Production replacement |
| --- | --- |
| `PEStore.list('services')` | `supabase.from('services').select(...)` |
| `PEStore.put('leads', ...)` | `supabase.from('leads').insert(...)` |
| `PEStore.put('quotes', ...)` | create quotation + quotation_items transaction/controlled API flow |
| `PEStore.list('projects')` | public `projects` query |
| Demo admin password | Supabase Auth session |
| Before/after photo URLs | Supabase Storage uploads + stored paths |

## Important demo limitation

`localStorage` is browser/device specific. A quotation created on one customer device will not appear in an admin dashboard opened on another device. This limitation disappears once Supabase is connected because all approved records will be stored centrally.

## Recommended production order

1. Create Supabase project and Auth admin account.
2. Create services, leads, quotations, quotation_items, projects and project media schema.
3. Enable RLS and add least-privilege policies.
4. Create project media Storage bucket/policies.
5. Replace `assets/data.js` localStorage methods with a Supabase repository/data adapter.
6. Replace demo admin login with Supabase Auth.
7. Test public quotation creation → admin visibility → service price update → live work publication.
8. Run security/database advisors and verify all public/admin flows before launch.
