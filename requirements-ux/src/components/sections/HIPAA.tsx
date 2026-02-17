export function HIPAA() {
  return (
    <div className="prose prose-slate max-w-none">
      <p className="lead text-slate-600">
        When LMS and HyperConnect are used in <strong>MedSpa, wellness, or healthcare contexts</strong>,
        conversations may involve <strong>Protected Health Information (PHI)</strong>. This section covers
        how to make integrations and communications HIPAA compliant, what to implement, and how
        Podium, HubSpot, and GoHighLevel handle HIPAA for MedSpa scenarios.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">
        13.1 How to Make Integrations and Communications HIPAA Compliant
      </h2>
      <p className="mt-2 text-slate-700">
        Core requirements for HIPAA-compliant integrations and communications:
      </p>
      <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Requirement</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Description</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Application to LMS ↔ HC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">BAA</td>
              <td className="px-4 py-3 text-slate-600">Vendors that handle PHI must sign a Business Associate Agreement.</td>
              <td className="px-4 py-3 text-slate-600">Zenoti and sub-processors (voice, SMS, storage) must offer and sign BAAs with covered entities (e.g., MedSpas).</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">Encryption</td>
              <td className="px-4 py-3 text-slate-600">TLS in transit, AES-256 at rest.</td>
              <td className="px-4 py-3 text-slate-600">All APIs (REST, SignalR, voice WebSocket), sync pipelines, and stored timeline/communication data.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">Access controls</td>
              <td className="px-4 py-3 text-slate-600">Only authorized users; RBAC and MFA.</td>
              <td className="px-4 py-3 text-slate-600">LMS and HC enforce org/center/user permissions; MFA for PHI access.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">Audit logging</td>
              <td className="px-4 py-3 text-slate-600">Who, what, when for PHI access.</td>
              <td className="px-4 py-3 text-slate-600">Log message send/receive, call logs, timeline views, profile access, exports.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">Minimum necessary</td>
              <td className="px-4 py-3 text-slate-600">Limit use/disclosure of PHI.</td>
              <td className="px-4 py-3 text-slate-600">Sync only what is needed; avoid exposing full PHI to systems/roles that don’t need it.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">Breach notification</td>
              <td className="px-4 py-3 text-slate-600">Procedures for detecting and reporting breaches.</td>
              <td className="px-4 py-3 text-slate-600">Define incident response and breach notification for communication/integration systems.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 font-medium text-slate-900">SMS and voice specifics</p>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-slate-700">
        <li><strong>SMS:</strong> BAA with provider; encryption where possible; access controls and audit trails; minimize PHI in content.</li>
        <li><strong>Voice:</strong> BAA with voice provider; encrypted storage/transmission; consent where required; access controls and audit logs for recordings.</li>
      </ul>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">
        13.2 What We Can Do to Ensure HIPAA Compliance
      </h2>
      <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Action</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            <tr><td className="px-4 py-3 font-medium text-slate-900">Execute BAAs</td><td className="px-4 py-3 text-slate-600">Sign with all vendors that process PHI; bind sub-processors (BAA/DPA).</td></tr>
            <tr><td className="px-4 py-3 font-medium text-slate-900">Encrypt end-to-end</td><td className="px-4 py-3 text-slate-600">TLS for APIs and real-time; AES-256 at rest for timelines, messages, recordings, attachments.</td></tr>
            <tr><td className="px-4 py-3 font-medium text-slate-900">Access control & MFA</td><td className="px-4 py-3 text-slate-600">Restrict by org/center/role; MFA for users who view/send PHI.</td></tr>
            <tr><td className="px-4 py-3 font-medium text-slate-900">Audit trails</td><td className="px-4 py-3 text-slate-600">Log access and actions on PHI; retain per HIPAA.</td></tr>
            <tr><td className="px-4 py-3 font-medium text-slate-900">Contact masking / minimum necessary</td><td className="px-4 py-3 text-slate-600">Use masking; sync/display only necessary data.</td></tr>
            <tr><td className="px-4 py-3 font-medium text-slate-900">Policies and training</td><td className="px-4 py-3 text-slate-600">HIPAA policies (privacy, security, breach); train staff.</td></tr>
            <tr><td className="px-4 py-3 font-medium text-slate-900">Risk analysis</td><td className="px-4 py-3 text-slate-600">Periodic risk analysis; remediate gaps.</td></tr>
            <tr><td className="px-4 py-3 font-medium text-slate-900">Call recording consent</td><td className="px-4 py-3 text-slate-600">Consent where required; support no-recording or redaction.</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">
        13.3 How Podium, HubSpot, and GoHighLevel Make Conversations HIPAA Compliant (MedSpa)
      </h2>

      <div className="mt-4 space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-slate-900">Podium</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li><strong>HIPAA status:</strong> HIPAA compliant; HIPAA Seal of Compliance (Privacy, Security, Breach Notification, HITECH).</li>
            <li><strong>BAA:</strong> Signs BAAs with covered entities and business associates.</li>
            <li><strong>MedSpa use:</strong> 100,000+ businesses; patient messaging, bulk texting, reviews, NPS, payments for practices and MedSpas.</li>
            <li><strong>Takeaway:</strong> Ensure BAA and similar controls (encryption, access control, audit) for any messaging channel used for PHI.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-slate-900">HubSpot</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li><strong>HIPAA status:</strong> HIPAA compliance for specific covered services on <strong>enterprise</strong>; super-admin enables &quot;HIPAA-protected sensitive data&quot; → BAA.</li>
            <li><strong>Covered:</strong> CRM attachments, forms, workflows, CRM API, activities (e.g. call logs; not necessarily recordings/transcripts with PHI), integrations, search, limited reporting.</li>
            <li><strong>Not covered:</strong> Reporting Analytics, Custom Report Builder, certain data sets.</li>
            <li><strong>Takeaway:</strong> Consider &quot;HIPAA mode&quot; with clear in-scope features (messaging, call logs, timeline) and documented out-of-scope.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-slate-900">GoHighLevel</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li><strong>HIPAA status:</strong> Company is HIPAA compliant; <strong>standard accounts are not by default</strong>. Optional HIPAA add-on (~$297/month, account-wide, 48–72 h activation).</li>
            <li><strong>With add-on:</strong> BAA in-app; ePHI encryption (AES-256, key rotation); audit logging; MFA; RBAC.</li>
            <li><strong>MedSpa use:</strong> Secure client communication, scheduling, reminders, lead management when HIPAA module enabled.</li>
            <li><strong>Takeaway:</strong> Consider optional HIPAA tier/add-on: BAA, encryption, audit logs, MFA, RBAC for MedSpas; default product for non–covered entities.</li>
          </ul>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">
        13.4 Recommendations for LMS ↔ HyperConnect (MedSpa / Healthcare)
      </h2>
      <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Recommendation</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            <tr><td className="px-4 py-3 text-slate-700">Define &quot;HIPAA-ready&quot; scope (features and data flows in/out of BAA)</td><td className="px-4 py-3 text-slate-600">High</td></tr>
            <tr><td className="px-4 py-3 text-slate-700">Offer BAA and HIPAA documentation for MedSpa/healthcare centers</td><td className="px-4 py-3 text-slate-600">High</td></tr>
            <tr><td className="px-4 py-3 text-slate-700">Optional HIPAA tier or add-on (BAA, audit logs, MFA, encryption)</td><td className="px-4 py-3 text-slate-600">Medium</td></tr>
            <tr><td className="px-4 py-3 text-slate-700">Vendor BAAs for voice, SMS, storage</td><td className="px-4 py-3 text-slate-600">High</td></tr>
            <tr><td className="px-4 py-3 text-slate-700">Extend NFR compliance table with HIPAA rows (BAA, encryption, audit, MFA)</td><td className="px-4 py-3 text-slate-600">Medium</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
