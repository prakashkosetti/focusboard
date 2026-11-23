# AI Usage Disclosure

## Tools used
- Claude (Anthropic)

## Representative prompts
1. "Guide me step by step to build the FocusBoard assignment in React, and explain where to write each piece of code and why."
2. "The delete button is not working" (I pasted my App.jsx and a screenshot).
3. "The task title is squashed into a tall column" (I pasted my CSS and a screenshot).
4. "Lighthouse shows Accessibility 96 and Performance 51. What should I fix?"

## AI-assisted areas
- Component structure and splitting the UI into reusable components
- State logic for create, edit, delete, status, search and filters
- The useLocalStorage hook
- Form validation and accessibility attributes (labels, aria, keyboard support)
- CSS and the responsive layout
- README draft and Git/GitHub/deployment steps

## Suggestion I checked or corrected
When I first created the `data` and `hooks` folders, they ended up inside `components`, so the imports failed with "Failed to resolve import". I found the cause from the Explorer and the breadcrumb path, then moved the folders into `src`.

I also noticed that my app showed 6 tasks in one browser profile but only 2 in a Guest window. I found that my `sampleTasks.js` only had 2 tasks, and the other 6 came from localStorage saved by another project running on the same port. I added the missing sample tasks and cleared the saved key.

The Performance score of 51 came from the Vite development server, not the real app, so I did not change code for it and will re-test on the deployed build.

## My understanding
I can explain how the state is organised, how the filters are derived from the tasks array, how the same form handles create and edit, how the delete confirmation works, and how the localStorage hook avoids overwriting saved data.