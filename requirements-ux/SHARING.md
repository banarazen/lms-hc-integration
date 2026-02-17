# How to Share the LMS ↔ HC Requirements UX

## Option 1: Deploy online (best for sharing a link)

### Vercel (recommended for Next.js)

1. Push the `requirements-ux` folder to a Git repo (GitHub, GitLab, or Bitbucket).
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **Add New** → **Project** and import your repo.
4. Set the **Root Directory** to `requirements-ux` (or the path where `package.json` lives if the repo contains multiple apps).
5. Click **Deploy**. Vercel will build and give you a URL like `https://your-project.vercel.app`.
6. Share that URL; anyone can open the requirements doc and LMS/HC prototypes.

**From the repo root (e.g. `lms-hc-integration`):**  
If the whole repo is one project, set root to the folder that contains `requirements-ux`, and in Vercel project settings set **Root Directory** to `lms-hc-integration/requirements-ux` (or adjust to your structure).

### Netlify

1. Push your code to a Git repo.
2. At [netlify.com](https://netlify.com), **Add new site** → **Import an existing project**.
3. Connect the repo and set:
   - **Build command:** `cd requirements-ux && npm install && npm run build`
   - **Publish directory:** `requirements-ux/.next` (or use Netlify’s Next.js runtime and point to the `requirements-ux` directory).
4. Deploy and share the generated URL.

---

## Option 2: Share a link from your machine (quick demo)

Use a tunnel so others can access your local server:

1. In one terminal, run the app:
   ```bash
   cd requirements-ux
   npm run dev
   ```
2. In another terminal, run a tunnel (if you have **ngrok**):
   ```bash
   ngrok http 3000
   ```
3. Share the `https://...ngrok.io` URL. Anyone can open the app as long as the tunnel and `npm run dev` are running.

**Other tools:** [localtunnel](https://github.com/localtunnel/localtunnel) (`npx localtunnel --port 3000`), or similar.

---

## Option 3: Share the code (others run locally)

1. Share the project (ZIP, Git repo, or internal file share).
2. Recipients run:
   ```bash
   cd requirements-ux
   npm install
   npm run dev
   ```
3. They open **http://localhost:3000** in their browser.

---

## What people will see

- **Home (/)**: Requirements overview and links to **AI Lead Manager (LMS)** and **HyperConnect** prototypes plus all requirement sections.
- **/lms**: Full LMS prototype (lead list, timeline, messaging, call, AI call, convert lead, link to HC).
- **/hc**: Full HyperConnect prototype (guest list with LEAD badges, timeline with “New lead created” link to LMS).
- **/section/hipaa**, **/section/executive-summary**, etc.: Individual requirement sections.

Cross-navigation works: “Change ↗” in LMS goes to HC; “View in AI Lead Manager ↗” in HC goes to LMS.
