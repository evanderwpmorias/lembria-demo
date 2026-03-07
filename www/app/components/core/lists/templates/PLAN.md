Here is a plan formatted into actionable steps for your software engineers.
use tailwind, simple vue and javascript
### **Phase 1: File and Component Setup**

1.  **Create New Vue Components**:
    * In the `src/components/core/lists/templates` directory, update the `.vue` files:
        * `baseEntries.vue`
        * `listLayout.vue`
        * `tableLayout.vue`
        * `cardLayout.vue`
        * `listFilter.vue`

2.  **Integrate Material Design Tokens**:
    * Ensure all new components heavily utilize the existing Material Design tokens defined in `src/assets/main.css` for styling (e.g., colors, typography, spacing) to maintain visual consistency.

---

### **Phase 2: Core Functionality and Data Handling**

These rules apply to the `baseEntries` component and its underlying logic.

* **Data Model & Schema**:
    * The component must accept an `entitySchema` prop, which is an array of field objects (similar to `pages.ts`).
    * It must correctly handle various field types (`string`, `reference`, `enum`, etc.).
    * Support metadata for each field, including `label`, `tooltip`, and custom `formatter` functions.
    * Infer default behaviors from schema flags like `required` and `isUnique`.
    * Implement a `displayName` fallback for list items when a `listMainField` is not specified.
    * Provide a dedicated slot for full-row custom rendering to allow for maximum flexibility.
    * Use `titleField` and `imageField` props to designate specific fields for title and image displays.
    * **Crucially**, never mutate the incoming data props directly. Use cloning or `readonly` proxies for all data manipulation.
    * Implement comprehensive runtime prop validation to help developers catch schema errors early.
    * Use TypeScript generics (e.g., `<UltimateList<T>>()`) to ensure type safety and preserve Intellisense for developers.

---

### **Phase 3: Layout and Responsiveness**

These rules primarily concern `listLayout.vue`, `tableLayout.vue`, and `cardLayout.vue`.

* **Responsive Views**:
    * Implement three view modes controlled by a prop: `table`, `list`, and `auto`.
    * In **`auto`** mode, the layout should automatically switch from a table to a stacking card pattern at the `sm` breakpoint (or when column widths exceed the viewport).
    * Follow Material Design's responsive grid breakpoints.
    * Ensure all cell padding is at least `16dp` to meet touch target size requirements.
* **Styling and Internationalization**:
    * Use CSS logical properties (e.g., `padding-inline-start` instead of `padding-left`) for out-of-the-box RTL language support.
    * Respect the `prefers-reduced-motion` user setting to disable or reduce animations.
    * Provide an option for a `sticky` main column in the table layout.
    * Align text baselines across cells to improve scannability, following Material Design principles.
    * Allow density to be adjusted between `comfortable` and `compact` settings via a prop.

---

### **Phase 4: Accessibility (A11y)**

Ensure the component is fully accessible to all users.

* **Semantic HTML**:
    * Use a native `<table>` element by default. Only use ARIA grid roles when advanced features (like keyboard navigation between cells) are required.
    * Always include a `<caption>` for the table; use the list's description if available and warn developers in the console if it's missing.
    * Use `<th scope="col">` and `<th scope="row">` for header cells.
    * Use `role="rowgroup"` when grouping rows.
    * Dynamically update `aria-sort` on headers to reflect the current sorting state.
    * Use an `aria-live="polite"` region to announce changes in the row count (e.g., after filtering).
    * Provide a "skip-link" to bypass large tables.
    * Ensure information is conveyed using both color and text/shapes, not just color alone.
    * Meet **WCAG 2.2** contrast ratio standards.
* **Keyboard & Screen Reader Navigation**:
    * The `Tab` key should focus the main table container.
    * Implement cell-by-cell navigation using the arrow keys (ARIA grid pattern).
    * `Home`/`End` keys should navigate to the start/end of a row.
    * `PageUp`/`PageDown` should handle pagination.
    * The `Enter` key should toggle row expansion.
    * The `Space` key should select rows (if checkboxes are present).
    * Include a toggle to bypass infinite scrolling, placed before the content.
    * Do not trap user focus while loading new data.
    * Support column resizing via the keyboard.
    * Ensure all mouse actions have corresponding keyboard shortcuts.

---

### **Phase 5: Data Loading Strategies**

Implement flexible ways to load and display data.

* **Pagination & Infinite Scroll**:
    * Support three distinct loading strategies: `pagination`, `load-more` button, and `infinite` scroll.
    * **Never force infinite scroll**. Always provide a user-selectable option.
    * Persist the user's scroll position when navigating away from and back to the page.
    * When "load more" is clicked, programmatically move focus to the first new item.
    * Debounce the Intersection Observer for infinite scrolling to `150ms`.
    * Display a **skeleton loader** (not a spinner) during data fetching to prevent layout shifts.
    * Expose a `serverPager` callback function that returns `{items, total}` for server-side pagination.
    * Allow a `page-size` prop with defaults (e.g., 25 for desktop, 10 for mobile).
    * Implement logic to cancel stale fetch requests to prevent race conditions.
    * Expose a `resetPagination()` method that can be called externally.

---

### **Phase 6: Sorting and Filtering**

Implement controls for data manipulation, primarily in `listFilter.vue`.

* **Sorting**:
    * Wrap column headers in `<button>` elements and manage the `aria-sort` attribute.
    * Support stable, multi-column sorting (e.g., `Shift + Click` to add a sort field).
    * Use `Intl.Collator` for client-side sorting.
    * For server-side sorting, emit a `{ field, dir }` event.
* **Filtering**:
    * Dynamically render filter widgets based on a `filterSchema` prop.
    * Provide default widgets for common filter types (`select`, `range`, `search`).
    * Debounce user input in filter fields to `300ms`.
    * Expose the filters as a `v-model` to allow parent components to control the state.
    * Display active filters as "chips" above the list.
    * Include a "clear all" filters action with a keyboard shortcut.

---

### **Phase 7: Performance and Customization**

* **Performance Optimizations**:
    * Implement optional row virtualization using `IntersectionObserver` for very large datasets.
    * Memoize cell rendering functions by column key.
    * Batch DOM updates using `requestAnimationFrame`.
    * Use `content-visibility: auto` where supported.
    * Avoid heavy third-party table libraries; rely on Vue's reactivity system.
    * Ensure the component is tree-shakable and has a small bundle size (`< 10KB` gzipped).
    * Confirm the component is SSR-friendly and provides meaningful hydration mismatch warnings.
* **Customization API**:
    * Allow column order to be overridden with a prop.
    * Provide named slots for customization: `item`, `header-extra`, `footer`.
    * Expose render functions for per-cell overrides.
    * Use CSS custom properties for theming (e.g., `--list-bg`, `--cell-padding`).
    * Expose a composition API function (`useList`) for headless use cases.
    * Support `v-model:selection` for managing selected rows.
    * Emit events for key actions: `row-click`, `sort-change`, `page-change`.
    * Allow a per-row actions menu via slot props.
    * Document all props, slots, and events thoroughly with JSDoc and TypeScript definitions.

---

### **Phase 8: Visual Styling and Motion**

Finalize the look and feel using Material Design principles.

* **Sizing and Elevation**:
    * Default list item height: `56dp` (`48dp` for compact).
    * List elevation: `1`. Plain table elevation: `0`.
    * Sticky header elevation: `shadow-sm`.
* **Color and State Layers**:
    * Row hover background: `surfaceContainerHighest` token.
    * Selected row background: `primaryContainer` with 12% opacity.
    * Skeleton loader color: `surfaceVariant`.
* **Motion**:
    * Implement a ripple effect on row tap (respecting `prefers-reduced-motion`).
    * Animate the sorting arrow with a 180° rotation.
    * Pagination "next" button should have a `shape-corner-full` (pill shape).
    * All motion durations should follow the Material "emphasized" curve (`~200ms`).