# Push to GitHub

## 1. Create a new repository on GitHub

1. Go to [github.com](https://github.com) and sign in.
2. Click the **+** (top right) → **New repository**.
3. Choose a name (e.g. `lms-hc-integration` or `requirements-ux`).
4. Choose **Public** (or Private if you have a paid account).
5. **Do not** check "Add a README" or "Add .gitignore" if you're pushing existing code.
6. Click **Create repository**.

---

## 2. Open terminal in your project folder

Use the folder that contains everything you want to push:

- **Option A – whole project:**  
  `C:\Users\balakrishnana\lms-hc-integration\lms-hc-integration`

- **Option B – only the UX app:**  
  `C:\Users\balakrishnana\lms-hc-integration\lms-hc-integration\requirements-ux`

---

## 3. Initialize Git (if not already)

```powershell
git init
```

---

## 4. Add a .gitignore (if at the parent folder)

If you're in `lms-hc-integration` (the parent folder), add a `.gitignore` so you don't commit `node_modules` or build output:

```powershell
# Create .gitignore with:
node_modules
.next
.vercel
.env*
*.log
.DS_Store
```

If you're only in `requirements-ux`, it already has a `.gitignore`.

---

## 5. Stage and commit

```powershell
git add .
git commit -m "Initial commit: LMS-HC requirements UX and prototypes"
```

---

## 6. Connect to GitHub and push

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and the repo name you created.

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

**Example:**  
If your repo is `https://github.com/balakrishnana/lms-hc-integration`:

```powershell
git remote add origin https://github.com/balakrishnana/lms-hc-integration.git
git push -u origin main
```

---

## 7. If GitHub asks you to sign in

- **HTTPS:** GitHub may ask for your username and a **Personal Access Token** (not your password).  
  Create one: GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Generate new token**. Give it `repo` scope and use it when prompted for a password.

- **SSH:** If you use SSH keys:
  ```powershell
  git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
  git push -u origin main
  ```

---

## Summary

| Step | Command |
|------|---------|
| 1 | Create empty repo on GitHub |
| 2 | `cd` to your project folder |
| 3 | `git init` |
| 4 | `git add .` then `git commit -m "Initial commit"` |
| 5 | `git branch -M main` |
| 6 | `git remote add origin https://github.com/USERNAME/REPO.git` |
| 7 | `git push -u origin main` |
