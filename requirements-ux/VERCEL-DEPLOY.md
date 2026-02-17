# Connect to Vercel

## Prerequisites

- Your code is pushed to a **GitHub**, **GitLab**, or **Bitbucket** repository.
- You have a (free) [Vercel](https://vercel.com) account.

---

## Step 1: Sign in to Vercel

1. Go to [vercel.com](https://vercel.com).
2. Click **Sign Up** or **Log In**.
3. Choose **Continue with GitHub** (recommended) so Vercel can see your repos.

---

## Step 2: Import the project

1. On the Vercel dashboard, click **Add New…** → **Project**.
2. You’ll see a list of your Git repositories. Find **lms-hc-integration** (or whatever you named the repo) and click **Import** next to it.
3. If you don’t see the repo, click **Import Git Repository**, paste the repo URL (e.g. `https://github.com/yourusername/lms-hc-integration`), and click **Import**.

---

## Step 3: Configure the project

Vercel will detect Next.js. You only need to set the app root if the Next.js app is **not** at the repo root.

- **If the repo root IS the `requirements-ux` folder**  
  Leave **Root Directory** empty and click **Deploy**.

- **If the repo contains a parent folder** (e.g. `lms-hc-integration` with `requirements-ux` inside):
  1. Under **Root Directory**, click **Edit**.
  2. Enter: `requirements-ux` (or `lms-hc-integration/requirements-ux` depending on your repo structure).
  3. **Framework Preset** should stay **Next.js**.
  4. **Build Command:** leave default (`next build`).
  5. **Output Directory:** leave default (`.next`).
  6. Click **Deploy**.

---

## Step 4: Wait for the build

- Vercel will install dependencies, run `next build`, and deploy.
- When it’s done you’ll get a URL like:  
  `https://lms-hc-integration-xxxx.vercel.app`

---

## Step 5: Open and share

- Click **Visit** (or open the URL). You’ll see the requirements home; use **AI Lead Manager (LMS)** and **HyperConnect** to try the prototypes.
- Share this URL with your team. Every new push to the connected branch (usually `main`) will trigger a new deployment.

---

## Optional: Custom domain

1. In the Vercel project, go to **Settings** → **Domains**.
2. Add your domain and follow the DNS instructions.

---

## Troubleshooting

| Issue | What to do |
|--------|------------|
| Build fails | Check the build log. Often it’s wrong **Root Directory** — set it to the folder that contains `package.json` and `next.config.*`. |
| 404 on refresh | Next.js + Vercel handles this by default; if you see 404s, ensure you didn’t change the output to static export. |
| Repo not listed | In GitHub, go to **Settings** → **Applications** → **Authorized OAuth Apps** and ensure Vercel has access to the repo (or the org). |
