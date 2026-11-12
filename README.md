# Calculator App

A responsive, keyboard-friendly calculator built with **HTML, CSS and vanilla JavaScript**. No framework or build step required.

## Features
- Addition, subtraction, multiplication and division
- Percentage, decimal input, clear and backspace
- Chained calculations and divide-by-zero handling
- Keyboard support
- Responsive layout for desktop and mobile
- Accessible labels and live result announcements

## Run locally
1. Clone the repository.
2. Open `index.html` in your browser.

Alternatively, start a local static server:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080.

## Keyboard shortcuts
| Key | Action |
|---|---|
| 0–9 | Enter digits |
| + - * / | Operators |
| Enter or = | Calculate |
| Backspace | Delete last digit |
| Escape | Clear |
| % | Percentage |

## Project structure
```
calculatorapp/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── .gitignore
└── README.md
```

## License
MIT