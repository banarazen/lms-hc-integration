# Fix: requirements-ux folder not opening on GitHub

**What’s going on:**  
`requirements-ux` probably has its own `.git` folder (created by `create-next-app`). When the parent repo was pushed, Git treated `requirements-ux` as a **submodule**, so GitHub only stores a reference to it, not the files inside. That’s why the folder doesn’t “open” like a normal folder.

**Fix:** Remove the inner `.git` so the parent repo tracks all the files, then push again.

---

## Steps (run in PowerShell)

### 1. Go to your project folder

```powershell
cd "C:\Users\balakrishnana\lms-hc-integration\lms-hc-integration"
```

### 2. Remove the Git repo inside requirements-ux

```powershell
Remove-Item -Recurse -Force requirements-ux\.git
```

(If you get "cannot find path", the folder might be named differently or already removed; skip to step 3.)

### 3. Add all requirements-ux files to the parent repo

```powershell
git add requirements-ux
git status
```

You should see many files under `requirements-ux/` (src, package.json, etc.). If you only see one line like `requirements-ux` with no files under it, the .git might still be there; try step 2 again.

### 4. Commit and push

```powershell
git add .
git commit -m "Add requirements-ux contents (remove nested git)"
git push origin main
```

### 5. Check on GitHub

Refresh the repo. Click **requirements-ux** — you should see **package.json**, **src**, **public**, etc. The folder should open normally.

### 6. Redeploy on Vercel

In Vercel: **Settings** → **Root Directory** → set to **`requirements-ux`** → Save, then **Deployments** → **Redeploy**.
