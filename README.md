# Fixflo Major Works - Property Management System

A fully functional Bootstrap 5.0 prototype for managing major works submissions with Section 20 consultation tracking.

## Overview

This prototype demonstrates a property management system called "Fixflo" that handles major works submissions. Built with React and Bootstrap 5.0, it provides complete functionality for creating, tracking, and managing major works projects through the Section 20 consultation process.

## Key Features

### 1. **Major Works List View**
- Sortable data table with filtering capabilities
- KPI dashboard showing:
  - Total major works (with breakdown of in progress/completed)
  - Total estimated cost across all projects
  - Total estimated fees across all projects
- Search functionality
- Estate, Building, and Property Manager filters
- Pagination with customizable items per page

### 2. **Major Works Creation Form**
- Single-page form combining basic information and documents
- Non-mandatory fields for prototyping
- Fields include:
  - Major Works Name
  - Estate and Building selection
  - Total Cost (inc. VAT)
  - Management Fee
- Simple document upload with drag-and-drop support

### 3. **Major Works Detail View**
Four-tab interface:

**Overview Tab:**
- 4 KPI cards (Linked Issues, Documents Uploaded, Estimated Budget, Management Fee)
- Comprehensive project information display
- Editable title with save/cancel functionality

**Issues Tab:**
- Link issues to major works
- Create new issues via modal
- View linked issues list
- Unlink functionality

**Documents Tab:**
- Upload documents by stage
- View document details in side panel
- AI-powered document analysis
- Document visibility controls (Public/Private/Limited)
- Stage-based organization

**Audit Log Tab:**
- Comprehensive activity tracking
- SVG icons for different action types
- Timeline view of all changes
- User, timestamp, and action details

### 4. **Section 20 Timeline**
- Manual checkbox system for 5 stages:
  1. Notice of Intention
  2. Tender
  3. Statement of Estimate
  4. Notice of Reasons
  5. Completion
- Sequential validation (must complete in order)
- Visual progress indicator
- Green completion state when all stages done
- Alert system for out-of-order attempts

### 5. **AI Features**
- AI Chat Bubble (interactive assistant)
- AI Summary Panel on documents
- Clickable urgent items
- Smart suggestions and insights

### 6. **Sidebar Navigation**
- Collapsible sidebar (270px expanded, 60px collapsed)
- User profile section
- Complete navigation menu
- "Major works" menu item with NEW badge
- Active state highlighting (#0B81C5)

## Technical Stack

- **Framework:** React 18+ with TypeScript
- **UI Library:** Bootstrap 5.0.2
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Styling:** Bootstrap CSS + Custom overrides

## Color Scheme

- **Primary Brand Color:** #0B81C5 (Fixflo Blue)
- **Success/Complete:** #28a745 (Green)
- **Warning/Delayed:** #ffc107 (Orange)
- **Danger/Cancelled:** #dc3545 (Red)

## Project Structure

```
/src
  /app
    App.tsx                          # Main application component
    /components
      AIChatBubble.tsx              # Interactive AI assistant
      AISummaryPanel.tsx            # AI insights display
      AuditLog.tsx                  # Activity tracking component
      AuditTrailIconsSVG.tsx        # SVG icons for audit trail
      DocumentDetailPanel.tsx       # Document detail side panel
      EmptyState.tsx                # Empty state display
      MajorWorksDetail.tsx          # Detail view with 4 tabs
      MajorWorksForm.tsx            # Creation/edit form
      MajorWorksList.tsx            # List view with filters
      NewDocumentModal.tsx          # Document upload modal
      Sidebar.tsx                   # Navigation sidebar
      /figma
        ImageWithFallback.tsx       # Image component
  /imports
    svg-jiovadl56x.ts              # SVG path data (used in EmptyState)
  /styles
    fonts.css                       # Font imports
    index.css                       # Global styles
    tailwind.css                    # Tailwind utilities
    theme.css                       # Theme variables
```

## Sample Data

The prototype includes 10 sample major works projects at various stages:
- 1 completed project (all 5 stages checked)
- 6 in-progress projects (at different stages)
- 3 projects at Notice of Intention stage
- Realistic financial data (costs ranging from £80k to £520k)
- Linked issues and uploaded documents
- Comprehensive audit log entries

## Key Functionalities

### State Management
- View navigation (list/form/detail)
- Form data persistence during session
- Timeline completion tracking per project
- Sidebar collapse state
- Active tab tracking

### Data Operations
- Create new major works
- Edit existing major works
- Link/unlink issues
- Upload/remove documents
- Mark timeline stages complete
- Archive major works (with confirmation)

### Filtering & Sorting
- Multi-column sorting (title, estate, building, management fee, total cost)
- Real-time search across major works
- Estate filter
- Building filter
- Property Manager filter

## Phase 1 Scope

This is a Phase 1 prototype focusing on:
- ✅ Single-page creation form
- ✅ 4-tab detail view
- ✅ Manual Section 20 timeline checkboxes
- ✅ Basic issue linking
- ✅ Simple document upload
- ✅ Read-only AI summary panel
- ✅ Minimal audit logging
- ✅ Non-mandatory form fields
- ✅ #0B81C5 color scheme throughout

## Recent Updates

- Removed "Current Consultation Stage" field (using timeline as primary tracker)
- Restructured KPIs into individual white card blocks
- Added circular colored icons to KPIs
- Created SVG icon reference file for audit trail
- Removed unused Figma import components
- Cleaned up unused documentation files
- Removed unused utility files
- Replaced all "Project" terminology with "Major works"

## Browser Compatibility

Optimized for modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## GitHub Hosting

This project is prepared for GitHub Pages deployment.

If you publish this folder as a GitHub repository using GitHub Desktop:

1. Publish the repository to GitHub.
2. Make sure the default branch is `main`.
3. In GitHub repository settings, open `Pages`.
4. Set `Source` to `GitHub Actions`.
5. Push changes to `main` and the included Pages workflow will build and deploy the app.

## Notes

- This is a front-end prototype only (no backend integration)
- File uploads are stored in memory (not persisted)
- All form fields are optional for prototyping purposes
- Sample data is hardcoded for demonstration
- The prototype is designed to showcase UI/UX and workflows

## License

See ATTRIBUTIONS.md for license information.
