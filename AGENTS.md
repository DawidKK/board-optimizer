# AGENTS.md

## Project Context

This project is a simple web application for carpenters and woodworkers who need to cut multiple rectangular elements from one OSB board while minimizing material waste.

The core problem is a 2D rectangular nesting / cutting optimization problem: given one board and a list of rectangular parts, calculate where each part should be placed on the board.

## First Iteration Scope

The first version should be intentionally simple.

### In Scope

- Single-page web application.
- User enters OSB board dimensions.
- User enters rectangular elements to cut.
- Elements have width and height.
- Elements may optionally have quantity.
- App calculates a layout automatically.
- App displays a simple visual board preview.
- Preview shows the board and placed rectangles.
- No backend.
- No database.
- No user accounts.
- No project saving.
- No drag and drop.
- No manual editing of placed elements.
- No element rotation.
- No complex production workflow.

### Out of Scope for First Iteration

- Authentication.
- Persistent storage.
- Multiple saved projects.
- PDF export.
- SVG export.
- Cut sequence generation.
- Saw path planning.
- Multi-board optimization.
- Material inventory.
- Pricing calculations.
- Grain direction handling.
- Manual drag-and-drop layout editing.
- Advanced exact mathematical optimization.

## Recommended Tech Stack

Use a simple SPA stack:

```text
Vite + React + TypeScript
```

Recommended libraries:

```text
maxrects-packer
SVG rendering
Tailwind CSS optional
```

Do not use Next.js for the first iteration.

Do not add a backend unless a later feature requires it.

## Rendering Approach

Use plain SVG for the board preview.

Reasons:

- Rectangles are simple to draw.
- Text labels are easy to render.
- Scaling is straightforward.
- SVG is easier to export later than canvas.
- No drag-and-drop interaction is required.

The preview should render:

- Outer board rectangle.
- Placed element rectangles.
- Optional labels with dimensions or part names.
- Optional waste percentage.

## Optimization Approach

Use a heuristic packing algorithm rather than exact mathematical optimization.

The app does not need heavy math in the first iteration.

A heuristic solution is acceptable because it is:

- Fast.
- Easy to understand.
- Easy to implement.
- Good enough for an MVP.
- More practical than trying to find a mathematically perfect layout.

## Recommended Packing Algorithm

Use MaxRects via an existing JavaScript library instead of implementing it from scratch.

Recommended package:

```text
maxrects-packer
```

Use it because:

- It already implements MaxRects.
- It avoids many edge cases.
- It provides rectangle coordinates suitable for SVG rendering.
- It is sufficient for a production-style MVP.

Rotation should be disabled initially.

Example intent:

```ts
new MaxRectsPacker(boardWidth, boardHeight, padding, {
  allowRotation: false,
});
```

## Data Model

Suggested basic types:

```ts
type Board = {
  width: number;
  height: number;
};

type ElementInput = {
  id: string;
  width: number;
  height: number;
  quantity: number;
};

type PlacedElement = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
```

Quantities should be expanded into individual rectangles before packing.

## Suggested Project Structure

```text
src/
  App.tsx
  optimizer/
    packBoard.ts
    types.ts
  components/
    BoardForm.tsx
    ElementsForm.tsx
    BoardPreview.tsx
```

## Application Flow

```text
User enters board dimensions
User enters element dimensions and quantities
User clicks Optimize
App expands quantities into individual rectangles
App runs MaxRects packing
App receives x/y coordinates for placed elements
App renders the result as SVG
App shows basic waste information
```

## MVP Constraints

For the first iteration, assume:

- All parts are rectangles.
- All dimensions use the same unit, probably millimeters.
- Rotation is not allowed.
- There is only one board.
- If all elements do not fit, the UI should show which items could not be placed.
- Kerf / saw blade thickness can be ignored initially or modeled later as padding.

## Later Improvements

Potential future features:

- Saw blade thickness / kerf support.
- Multiple boards.
- Rotation toggle.
- Grain direction constraints.
- Named parts.
- PDF export.
- SVG export.
- Cut list generation.
- Project saving.
- User accounts.
- Backend API.
- Better optimization heuristics.
- Cost calculation.
- Board inventory.

## Engineering Guidance

Keep the first implementation small and local to the frontend.

Prioritize:

- Simple UX.
- Correct dimensions.
- Clear visualization.
- Easy-to-test packing function.
- Clean separation between input, optimization, and rendering.

Avoid overengineering until the MVP proves useful.
