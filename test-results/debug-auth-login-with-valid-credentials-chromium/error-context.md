# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: debug-auth.spec.ts >> login with valid credentials
- Location: e2e/debug-auth.spec.ts:42:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED at http://localhost:5174/portal.html
Call log:
  - navigating to "http://localhost:5174/portal.html", waiting until "load"

```

```
Error: write EPIPE
```