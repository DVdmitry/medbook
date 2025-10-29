# AI Form Copilot Integration Guide

## Quick Setup

Add the widget script and component to your `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- ... your head content ... -->
  </head>
  <body>
    <!-- AI Form Copilot Widget -->
    <script type="module" src="https://ai-form-copilot-eu.web.app/widget-build/index.js"></script>
    <ai-form-copilot></ai-form-copilot>

    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

## Environment Switching

**Production:**
```html
<script type="module" src="https://ai-form-copilot-eu.web.app/widget-build/index.js"></script>
```

**Local Development:**
```html
<script type="module" src="http://127.0.0.1:5004/widget-build/index.js"></script>
```

## Notes

- The widget is a web component, works with any framework including Vue
- Place `<ai-form-copilot>` tag anywhere in the body (typically before your app root)
- No additional Vue configuration needed - web components work out of the box
