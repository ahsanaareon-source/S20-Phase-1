# Audit Trail Icons

Individual SVG files for all audit trail icons used in the Fixflo Major Works prototype.

## Icon List

### 1. **plus.svg**
- **Usage:** "Created" actions
- **Description:** Plus symbol for creation events
- **Example:** "Major Works Created", "Issue Created"

### 2. **clock.svg**
- **Usage:** "Stage" and "Timeline" actions
- **Description:** Clock symbol for time-based events
- **Example:** "Stage Marked Complete", "Timeline Updated"

### 3. **link.svg**
- **Usage:** "Issue" and "Linked" actions
- **Description:** Link chain symbol for relationship events
- **Example:** "Issue Linked", "Issue Unlinked"

### 4. **upload.svg**
- **Usage:** "Uploaded" and "Imported" actions
- **Description:** Upload arrow for document events
- **Example:** "Document Uploaded", "Documents Imported"

### 5. **check-circle.svg**
- **Usage:** "Completed" actions
- **Description:** Check mark in circle for completion events
- **Example:** "Stage Completed", "Major Works Completed"

### 6. **edit.svg**
- **Usage:** "Updated" actions
- **Description:** Pencil symbol for edit events
- **Example:** "Major Works Updated", "Details Modified"

### 7. **user-plus.svg**
- **Usage:** "Team" and "Added" actions
- **Description:** User with plus symbol for team events
- **Example:** "Team Member Added", "User Assigned"

### 8. **file-text.svg**
- **Usage:** Default fallback icon
- **Description:** Document symbol for general file events
- **Example:** Any action not matching other categories

### 9. **alert-triangle.svg**
- **Usage:** Warnings and alerts
- **Description:** Triangle with exclamation for alert events
- **Example:** "Warning Issued", "Alert Triggered"

## Technical Specifications

- **Format:** SVG (Scalable Vector Graphics)
- **Size:** 16x16 pixels (viewBox: 0 0 24 24)
- **Stroke:** 2px width
- **Style:** Line icons with no fill
- **Color:** Inherits from `currentColor` (can be styled via CSS)

## How to Use

### In HTML:
```html
<img src="/src/assets/icons/plus.svg" alt="Created" />
```

### In React/JSX:
```jsx
import plusIcon from './assets/icons/plus.svg';

<img src={plusIcon} alt="Created" />
```

### As inline SVG (for styling):
```jsx
import { ReactComponent as PlusIcon } from './assets/icons/plus.svg';

<PlusIcon style={{ color: '#0B81C5' }} />
```

### In CSS:
```css
.icon {
  background-image: url('/src/assets/icons/plus.svg');
  width: 16px;
  height: 16px;
}
```

## Icon Mapping Logic

The icons are mapped based on action keywords:

| Keyword(s) | Icon | Usage |
|------------|------|-------|
| "Created" | plus.svg | Creation events |
| "Stage", "Timeline" | clock.svg | Time-based events |
| "Issue", "Linked" | link.svg | Relationship events |
| "Uploaded", "Imported" | upload.svg | Document events |
| "Completed" | check-circle.svg | Completion events |
| "Updated" | edit.svg | Modification events |
| "Team", "Added" | user-plus.svg | Team/user events |
| Default | file-text.svg | Fallback icon |
| Warnings | alert-triangle.svg | Alert events |

## Customization

These icons support CSS styling:
- Change `stroke` color via CSS `color` property
- Adjust `stroke-width` for thickness
- Scale via `width` and `height` attributes
- Apply transforms, animations, etc.

Example:
```css
.icon-large {
  color: #0B81C5;
  width: 24px;
  height: 24px;
}

.icon-success {
  color: #28a745;
}

.icon-warning {
  color: #ffc107;
}
```

## Notes

- All icons maintain consistent stroke width (2px)
- Icons use `currentColor` to inherit text color
- Optimized for 16x16px display but scale perfectly
- Based on Lucide React icon set design language
