# Fixflo Major Works - Product Delivery Specification
## Comprehensive Feature Documentation

---

**Document Version:** 1.0  
**Date:** March 2026  
**Application:** Fixflo Major Works Property Management System  
**Framework:** React + Bootstrap 5.0  
**Current Status:** Prototype Complete  
**Purpose:** Detailed specification documenting all features and capabilities in the prototype

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Application Architecture](#2-application-architecture)
3. [Feature Inventory - Complete Breakdown](#3-feature-inventory---complete-breakdown)
4. [User Workflows](#4-user-workflows)
5. [Data Model & State Management](#5-data-model--state-management)
6. [UI/UX Specifications](#6-uiux-specifications)
7. [Technical Capabilities](#7-technical-capabilities)
8. [Appendix: Sample Data Structure](#8-appendix-sample-data-structure)

---

## 1. Executive Summary

### 1.1 Prototype Overview

The Fixflo Major Works prototype is a fully functional front-end application demonstrating comprehensive major works project management with Section 20 consultation compliance tracking. The prototype includes 10 complete views, 4 interactive modals, 2 AI-powered features, and handles the full lifecycle of major works from creation through completion.

### 1.2 Core Capabilities Delivered

**✅ Implemented Features:**
- Complete major works lifecycle management (create, view, edit, archive)
- Section 20 consultation tracking with 5-stage timeline
- Issue linking and management
- Document upload and organization by stage
- AI-powered chat assistant
- AI insights summary panel
- Comprehensive audit logging
- Multi-filter and multi-sort data table
- KPI dashboard with 3 metric cards
- Responsive sidebar navigation
- User assignment with multi-select
- Archive functionality with confirmation

**📊 Prototype Metrics:**
- 10 Sample Major Works (various stages of completion)
- 17 Sample Issues (organized by building)
- 5 Section 20 Stages (manual checkbox system)
- 4 Detail View Tabs (Overview, Issues, Documents, Audit Log)
- 9 Audit Trail Icon Types
- 3 KPI Cards
- 4 Filter Types (Search, Estate, Building, Property Manager)
- 5 Sortable Columns

### 1.3 Technology Stack

- **Frontend Framework:** React 18+ with TypeScript
- **UI Library:** Bootstrap 5.0.2
- **Icons:** Lucide React (consistent design system)
- **Build Tool:** Vite
- **Styling:** Bootstrap CSS + Custom overrides
- **State Management:** React hooks (useState)
- **Data Persistence:** In-memory (session-based, no backend)

---

## 2. Application Architecture

### 2.1 View Structure

```
Application Root (App.tsx)
│
├── Sidebar (Persistent across all views)
│   ├── User Profile Section
│   ├── Navigation Menu
│   └── Collapse/Expand Toggle
│
├── Header Bar (Context-aware)
│   ├── Back Button (conditional)
│   └── Page Title
│
└── Main Content Area (View Router)
    ├── List View (MajorWorksList)
    ├── Empty State (EmptyState)
    ├── Form View (MajorWorksForm)
    └── Detail View (MajorWorksDetail)
        ├── Overview Tab
        ├── Issues Tab
        ├── Documents Tab
        └── Audit Log Tab
```

### 2.2 Component Hierarchy

**Primary Components (8):**
1. `App.tsx` - Root component with state management
2. `Sidebar.tsx` - Navigation and user profile
3. `MajorWorksList.tsx` - List view with filters and KPIs
4. `MajorWorksForm.tsx` - Creation and edit form
5. `MajorWorksDetail.tsx` - Detail view with 4 tabs
6. `EmptyState.tsx` - Empty state display
7. `AIChatBubble.tsx` - Interactive AI assistant
8. `AISummaryPanel.tsx` - AI insights panel

**Supporting Components (4):**
1. `AuditLog.tsx` - Audit trail display
2. `DocumentDetailPanel.tsx` - Document detail side panel (not in current flow)
3. `NewDocumentModal.tsx` - Document upload modal
4. `AuditTrailIconsSVG.tsx` - Icon reference library

### 2.3 State Management Flow

```
App.tsx (Root State)
├── currentView: 'list' | 'empty' | 'form' | 'detail'
├── selectedWork: Object | null
├── formData: Object | null
├── majorWorks: Array<MajorWork>
├── sidebarCollapsed: boolean
└── activePage: string

Data flows down through props ↓
User actions bubble up through callbacks ↑
```

---

## 3. Feature Inventory - Complete Breakdown

### 3.1 SIDEBAR NAVIGATION

#### 3.1.1 Header Section
**Features:**
- Hamburger menu button (toggle collapse/expand)
- Messages button (visual only, no functionality)
- Notifications button with badge indicator (visual only)
- Dropdown menu button (visual only)

**Specifications:**
- Collapsed width: 60px
- Expanded width: 270px
- Transition: 0.3s ease
- Icon size: 18px
- Button style: `btn-sm btn-outline-secondary`

#### 3.1.2 Logo & User Profile
**Features:**
- Fixflo branding logo (text-based, #0B81C5)
- User avatar with initials "AJ" (32x32px circle)
- User name: "Ahsan Jalil"
- User role: "Agent"
- Dropdown chevron (visual only)

**Specifications:**
- Logo font size: 24px
- Profile background: #f8f9fa
- Avatar: Primary blue background with white text
- Profile text sizes: 14px (name), 12px (role)

#### 3.1.3 Navigation Menu
**Features:**
- 12 main navigation items with icons
- 2 expandable sections ("Create Issue" and "Issues")
- Active state highlighting (#0B81C5 background)
- "NEW" badge on Major Works items (yellow background)
- Tooltip display in collapsed mode
- Smooth expand/collapse animations

**Menu Structure:**
1. Dashboard (LayoutDashboard icon)
2. Contractor Marketplace (Globe icon)
3. **Create Issue** (expandable)
   - Enter as you go
   - Create on behalf of
   - Send issue creation link
   - From another issue
   - Batch create issues
   - Major works (NEW badge)
4. **Issues** (expandable, default expanded)
   - Issue search
   - Issue assignment
   - Comments
   - Projects
   - **Major works** (NEW badge, active state)
5. Planned Maintenance (Wrench icon)
6. People (Users icon)
7. Properties (Home icon)
8. Calendar (Calendar icon)
9. Reports (FileBarChart icon)
10. Setup (Settings icon)
11. Integrations (Repeat icon)
12. Promote (Share2 icon)
13. Co-pilot (PlusCircle icon)

**Interaction Logic:**
- Click Major Works (under Issues) → Navigate to list view
- Click Major Works (under Create Issue) → Open create form
- Expanding one section collapses the other
- Active page displays with #0B81C5 background
- All other items are visual placeholders

**Specifications:**
- Menu item height: 40px
- Icon size: 20px
- Text size: 14px
- Padding: 8px 12px
- Gap between icon and text: 12px
- Active state background: #0B81C5
- Active state text color: white
- NEW badge: yellow background, 10px font size

---

### 3.2 MAJOR WORKS LIST VIEW

#### 3.2.1 Page Header
**Features:**
- Page title: "Major works" (h4, 20px)
- Back button (conditional, shows when not on list view)
- Responsive layout with Bootstrap grid

**Specifications:**
- Background: white
- Border bottom: 1px solid #dee2e6
- Padding: 16px
- Button style: `btn-sm btn-outline-secondary`

#### 3.2.2 AI Summary Panel
**Features:**
- Collapsible card with AI insights
- Sparkles icon (20px, #0B81C5)
- 3 insight types with icons:
  1. **Alert** (AlertCircle, orange) - Attention required
  2. **Clock** (Clock, blue) - Time metrics
  3. **Trending** (TrendingUp, green) - Portfolio health

**Current Insights:**
1. "2 major works require attention" - Cladding Dockside and Riverside Roof
2. "Average major works duration: 14 weeks" - Based on completed consultations
3. "Portfolio health: Good" - 8 in progress, 5 completed this quarter

**Specifications:**
- Card style: `border-0 shadow-sm`
- Margin bottom: 16px
- Icon size: 16px
- Text sizes: Bold for main text, muted for secondary
- Read-only (no interactions)

#### 3.2.3 KPI Dashboard (3 Cards)

**Card 1: Major Works Overview**
- **Icon:** Clipboard (40px circle, #0B81C5 background)
- **Primary Metric:** Total count of major works
- **Secondary Metrics:**
  - In Progress count (green badge)
  - Completed count (blue badge)
- **Layout:** White card with shadow-sm

**Card 2: Total Estimated Cost**
- **Icon:** PoundSterling (40px circle, #28a745 background)
- **Primary Metric:** Sum of all totalCost values
- **Label:** "(inc. VAT)"
- **Subtitle:** "Across all projects"
- **Format:** £XXX,XXX with comma separators

**Card 3: Total Estimated Fee**
- **Icon:** PoundSterling (40px circle, #28a745 background)
- **Primary Metric:** Sum of all managementFee values
- **Label:** "(inc. VAT)"
- **Subtitle:** "Across all projects"
- **Format:** £XX,XXX with comma separators

**Specifications:**
- Card height: Equal heights (h-100 class)
- Icon size: 40px circle
- Icon placement: Top of card
- Card padding: 16px
- Card border: none
- Shadow: sm (subtle)
- Text hierarchy: Large bold for numbers, small muted for labels
- Real-time updates: Recalculates when majorWorks array changes

#### 3.2.4 Action Bar
**Features:**
- Search input (400px width)
- Three-dot menu button (visual only)
- "Download report" button (outline-primary, non-functional)
- "New major works" button (primary #0B81C5, functional)

**Search Input:**
- Placeholder: "Search for issues, places or people..."
- Icon: Search (left-aligned)
- Real-time filtering (searches title, estate, building)

**Specifications:**
- Search width: 400px on desktop
- Button gap: 8px
- Button styles: Bootstrap btn classes
- Download icon: Download from lucide-react
- Plus icon: Plus from lucide-react

#### 3.2.5 Filter Section

**Filter 1: Search Bar**
- **Type:** Text input with search icon
- **Placeholder:** "Search major works or building..."
- **Behavior:** Real-time filtering as user types
- **Searches:** Title, estate, building fields
- **Case:** Case-insensitive

**Filter 2: Estate Dropdown**
- **Type:** Bootstrap select dropdown
- **Options:**
  - All estates (default)
  - Burns Court
  - Riverside Apartments
  - Parkside Estate
  - Westside Towers
- **Behavior:** Filters list to show only matching estates
- **Cascading:** Affects building filter options

**Filter 3: Building Dropdown**
- **Type:** Bootstrap select dropdown
- **Dynamic Options:** Updates based on selected estate
- **Sample Buildings:**
  - All buildings (default)
  - Riverside Block (Burns Court)
  - Parkview Block (Burns Court, Riverside Apartments)
  - Central Tower (Riverside Apartments, Parkside Estate)
  - Tower A (Parkside Estate)
  - Tower B (Westside Towers)
- **Behavior:** Filters list to show only matching buildings

**Filter 4: Property Manager Dropdown**
- **Type:** Bootstrap select dropdown
- **Options:**
  - All managers (default)
  - Sarah Mitchell
  - Michael Thompson
  - Emma Evans
  - James Cooper
- **Behavior:** Filters list to show only projects managed by selected person

**Filter Combination:**
- All filters work together (AND logic)
- Clearing one filter (set to "All") removes that constraint
- Search + Filters = Combined filtering
- Filter state persists during session

**Specifications:**
- Filter bar background: white card
- Filter spacing: 12px gap
- Dropdown width: Auto-fit content
- Icon size: 18px
- Select style: Bootstrap form-select

#### 3.2.6 Data Table

**Column Structure (6 columns):**

1. **Major works**
   - Displays: Project title (bold) + Location (muted, smaller)
   - Sortable: Yes (tri-state)
   - Width: Flexible (largest)
   - Format: "Title" + line break + "Estate - Building"

2. **Created on**
   - Displays: Date and time
   - Sortable: Yes (tri-state, by date)
   - Format: "DD/MM/YYYY - HH:MM"
   - Default: Shows creation timestamp

3. **Stage**
   - Displays: Current Section 20 stage name
   - Sortable: Yes (tri-state)
   - Values:
     - "Not Started"
     - "Notice of intention"
     - "Tender"
     - "Estimates"
     - "Reasons"
     - "Completion"
   - Logic: Shows last completed stage name, or "Completed" if all stages done

4. **Fee**
   - Displays: Management fee amount
   - Sortable: Yes (tri-state, numeric)
   - Format: "£XX,XXX"
   - Color: Green (#28a745)
   - Alignment: Right

5. **Status**
   - Displays: Badge with status
   - Sortable: No
   - Badge types:
     - In progress (Green pill, #28a745)
     - On hold (Grey pill, #6c757d)
     - Completed (Blue pill, #0B81C5)
     - Delayed (Orange pill, #ffc107)
     - Cancelled (Red pill, #dc3545)
   - Badge style: Rounded pill with small text

6. **Actions**
   - Displays: Archive button
   - Sortable: No
   - Icon: Archive (trash icon)
   - Style: btn-sm btn-link text-muted
   - Action: Opens confirmation modal

**Sorting Behavior:**
- **Tri-State System:**
  1. Default (no sort) - Neutral arrow icon
  2. Ascending (A→Z, 0→9, Old→New) - Up arrow icon
  3. Descending (Z→A, 9→0, New→Old) - Down arrow icon
- **Click Logic:** Each click cycles through states
- **Single Column:** Only one column sorted at a time
- **Default Sort:** Management fee descending (highest first)
- **Icon Position:** Right side of column header
- **Icon Size:** 16px
- **Active Color:** #0B81C5

**Row Interactions:**
- **Hover:** Shadow increases, background lightens
- **Click (anywhere except Actions):** Navigate to detail view
- **Click Archive:** Open confirmation modal (prevent navigation)
- **Cursor:** Pointer on hover

**Specifications:**
- Table class: `table table-hover`
- Row height: Auto (min 60px)
- Cell padding: 12px
- Border: Bottom border only
- Background: White
- Font sizes: 14px (content), 12px (secondary)

#### 3.2.7 Pagination Control

**Features:**
- Total items count display: "Total **X** items"
- Previous page button (ChevronLeft icon)
- Page numbers (current highlighted)
- Next page button (ChevronRight icon)
- Items per page selector (10, 25, 50, 100)
- "Go to" page jump input with Enter key support

**Behavior:**
- Previous/Next disabled on first/last page
- Current page highlighted with #0B81C5 background
- Items per page change resets to page 1
- Go to page validates input (1 to max pages)
- Pagination updates when filters change

**Specifications:**
- Control bar: White card with shadow
- Padding: 16px
- Gap between elements: 12px
- Button size: btn-sm
- Disabled state: Opacity 0.5, cursor not-allowed
- Input width: 60px
- Select width: 80px

#### 3.2.8 Archive Functionality

**Trigger:**
- Click Archive button in Actions column

**Modal Display:**
- **Title:** "Archive Major Works"
- **Icon:** Archive icon (warning color)
- **Message:** "Are you sure you want to archive [Project Name]? This action cannot be undone."
- **Buttons:**
  - Cancel (outline-secondary)
  - Archive (danger)

**Behavior:**
- Modal blocks background interaction
- ESC key closes modal (cancel)
- Click outside modal closes (cancel)
- Cancel button: Close modal, no action
- Archive button: Remove from list (array splice), close modal

**Specifications:**
- Modal size: Medium
- Modal backdrop: 0.5 opacity black
- Button gap: 8px
- Icon size: 48px
- Text alignment: Center

#### 3.2.9 Sample Data (10 Projects)

**Project 1: Riverside Roof**
- Estate: Burns Court
- Building: Riverside Block
- Management Fee: £40,500
- Total Cost: £450,000
- Property Manager: Sarah Mitchell
- Stage: Notice of Intention (1/5 complete)
- Linked Issues: 2
- Uploaded Files: 2

**Project 2: Developer Cladding Project Tracking Eastside**
- Estate: Burns Court
- Building: Parkview Block
- Management Fee: £28,000
- Total Cost: £280,000
- Property Manager: Michael Thompson
- Stage: Estimates (3/5 complete)
- Linked Issues: 1
- Uploaded Files: 4

**Project 3: RSF Project Tracking Legacy House**
- Estate: Riverside Apartments
- Building: Central Tower
- Management Fee: £52,000
- Total Cost: £520,000
- Property Manager: Sarah Mitchell
- Stage: Reasons (4/5 complete)
- Linked Issues: 3
- Uploaded Files: 5

**Project 4: Cladding Project Dockside**
- Estate: Parkside Estate
- Building: Tower A
- Management Fee: £18,500
- Total Cost: £185,000
- Property Manager: Emma Evans
- Stage: Tender (2/5 complete)
- Linked Issues: 1
- Uploaded Files: 3

**Project 5: Car Lift A - Refurbishment**
- Estate: Westside Towers
- Building: Tower B
- Management Fee: £12,000
- Total Cost: £120,000
- Property Manager: James Cooper
- Stage: Completion (5/5 complete)
- Linked Issues: 1
- Uploaded Files: 6

**Project 6: External Facade Works**
- Estate: Burns Court
- Building: Riverside Block
- Management Fee: £8,000
- Total Cost: £80,000
- Property Manager: Michael Thompson
- Stage: Not Started (0/5 complete)
- Linked Issues: 0
- Uploaded Files: 0

**Project 7: Window Replacement Programme**
- Estate: Riverside Apartments
- Building: Parkview Block
- Management Fee: £35,000
- Total Cost: £350,000
- Property Manager: Sarah Mitchell
- Stage: Estimates (3/5 complete)
- Linked Issues: 2
- Uploaded Files: 3

**Project 8: Communal Heating System Upgrade**
- Estate: Parkside Estate
- Building: Central Tower
- Management Fee: £42,000
- Total Cost: £420,000
- Property Manager: Emma Evans
- Stage: Tender (2/5 complete)
- Linked Issues: 1
- Uploaded Files: 2

**Project 9: Fire Safety System Installation**
- Estate: Westside Towers
- Building: Tower B
- Management Fee: £22,000
- Total Cost: £220,000
- Property Manager: James Cooper
- Stage: Notice of Intention (1/5 complete)
- Linked Issues: 2
- Uploaded Files: 1

**Project 10: Roof Membrane Replacement**
- Estate: Burns Court
- Building: Riverside Block
- Management Fee: £15,000
- Total Cost: £150,000
- Property Manager: Sarah Mitchell
- Stage: Estimates (3/5 complete)
- Linked Issues: 1
- Uploaded Files: 3

---

### 3.3 MAJOR WORKS CREATION FORM

#### 3.3.1 Form Overview
**Type:** Single-page form
**Modes:** 
- Create (initialData = null, selectedWork = null)
- Edit (initialData = previous data, selectedWork = existing)

**Layout:**
- Two main sections: Basic Information, Documents
- Both sections visible on single page
- No multi-step wizard

#### 3.3.2 Basic Information Section

**Section Header:**
- Title: "Basic Information"
- Subtitle: "General details about the major works project"
- Style: h5 for title, small muted for subtitle

**Field 1: Project Name**
- **Type:** Text input
- **Label:** "Major Works Name"
- **Placeholder:** "Enter major works name"
- **Required:** No (Phase 1 prototype)
- **Validation:** None
- **Default:** Empty string
- **Width:** Full width

**Field 2: Estate**
- **Type:** Dropdown select
- **Label:** "Estate"
- **Options:**
  - (Empty default)
  - Burns Court
  - Riverside Apartments
  - Parkside Estate
  - Westside Towers
- **Required:** No
- **Behavior:** Affects building options (not implemented in form, but would in production)

**Field 3: Building**
- **Type:** Dropdown select
- **Label:** "Building"
- **Options:**
  - (Empty default)
  - Riverside Block
  - Parkview Block
  - Central Tower
  - Tower A
  - Tower B
- **Required:** No
- **Cascading:** Should filter based on estate (not enforced in prototype)

**Field 4: Total Cost (inc. VAT)**
- **Type:** Number input
- **Label:** "Total Cost (inc. VAT)"
- **Placeholder:** "0.00"
- **Prefix:** £ symbol (visual, in label)
- **Format:** Decimal number
- **Validation:** Numeric only (browser default)
- **Required:** No
- **Default:** Empty string

**Field 5: Management Fee**
- **Type:** Number input
- **Label:** "Management Fee"
- **Placeholder:** "0.00"
- **Prefix:** £ symbol (visual, in label)
- **Format:** Decimal number
- **Validation:** Numeric only
- **Required:** No
- **Default:** Empty string

**Field 6: Surveyor Fee** (may not be used)
- **Type:** Number input
- **Label:** "Surveyor Fee"
- **Placeholder:** "0.00"
- **Format:** Decimal number
- **Required:** No

**Field 7: Consultation Stage**
- **Type:** Dropdown select
- **Label:** "Current Consultation Stage"
- **Options:**
  - Notice of intention (default)
  - Tender
  - Statement of estimate
  - Notice of reasons
  - Completion
- **Default:** notice-of-intention
- **Required:** No

**Field 8: Assign To**
- **Type:** Custom multi-select dropdown
- **Label:** "Assign To"
- **Display:** Shows selected user count badge or "Select users..."
- **Dropdown Content:** Checkbox list of 8 users
- **Available Users:**
  1. John Smith
  2. Sarah Johnson
  3. Michael Brown
  4. Emily Davis
  5. David Wilson
  6. Lisa Anderson
  7. James Taylor
  8. Emma Thompson
- **Behavior:**
  - Click opens dropdown
  - Click outside closes dropdown
  - Checkboxes toggle selection
  - Multiple selections allowed
  - Selected count updates in button
- **Default:** Empty array

**Specifications:**
- Form grid: 2 columns on desktop, 1 on mobile
- Label font weight: 500
- Label margin bottom: 8px
- Input height: 38px
- Input border: 1px solid #dee2e6
- Input border radius: 4px
- Input focus: #0B81C5 border
- Gap between fields: 16px

#### 3.3.3 Documents Section

**Section Header:**
- Title: "Documents"
- Subtitle: "Upload relevant documents for this project"

**File Upload Component:**

**Drag & Drop Zone:**
- **Visual:**
  - Dashed border (2px dashed #dee2e6)
  - Light gray background (#f8f9fa)
  - Upload cloud icon (48px, centered, #6c757d)
  - Text: "Drag and drop files here, or click to browse"
  - Min height: 150px
- **States:**
  - Default: Light gray background
  - Hover: Border color darkens
  - Dragging: Background changes to light blue (#e7f3ff)
  - Active: Border color #0B81C5
- **Behavior:**
  - Click anywhere: Opens file browser
  - Drag file over: Activates drag state
  - Drop file: Adds to list
  - Accepts: All file types
  - Multiple: Yes

**Hidden File Input:**
- Type: file
- Multiple: true
- Accept: * (all types)
- Display: none
- Triggered by: Click on upload zone

**Uploaded Files List:**
- **Display:** Appears below upload zone after files added
- **Each File Shows:**
  - File icon (FileText from lucide-react, 20px)
  - File name (truncate if too long)
  - File size (formatted: KB/MB)
  - Upload date (current date)
  - Remove button (X icon, red on hover)
- **Layout:** 
  - Vertical list
  - Each file: White card with border
  - Padding: 12px
  - Gap: 8px
- **Remove Action:**
  - Click X button
  - Removes from array
  - Re-renders list

**File Size Formatting:**
- < 1024 bytes: "X bytes"
- < 1MB: "X KB"
- >= 1MB: "X.X MB"

**Specifications:**
- Upload zone border: 2px dashed
- Upload zone radius: 8px
- Icon color: #6c757d
- Text color: #6c757d
- Drag active background: #e7f3ff
- File list gap: 8px
- File card hover: Shadow increase

#### 3.3.4 Form Actions

**Button Layout:**
- Two buttons, space-between alignment
- Left: Cancel button
- Right: Create/Update button

**Cancel Button:**
- **Style:** outline-secondary
- **Text:** "Cancel"
- **Icon:** None
- **Behavior:** 
  - Calls onCancel callback
  - Navigates back to list view
  - No confirmation dialog
  - Form data lost

**Submit Button:**
- **Text (Create Mode):** "Create Major Works"
- **Text (Edit Mode):** "Update Major Works"
- **Style:** primary (#0B81C5)
- **Icon:** None
- **Behavior:**
  - Collects all form data
  - Calls onSubmit callback with data object
  - In create mode: Generates new ID, initializes stageCompletion
  - In edit mode: Updates existing work object
  - Navigates to detail view

**Specifications:**
- Button height: 40px
- Button padding: 12px 24px
- Button gap: 8px
- Cancel color: #6c757d
- Submit color: #0B81C5
- Font weight: 500

#### 3.3.5 Form Behavior & Validation

**State Management:**
- Form data stored in local state (formData object)
- Real-time updates on every input change
- File list managed separately
- Assigned users tracked as array

**Validation:**
- **Phase 1:** Minimal validation
- All fields optional (can submit empty form)
- Numeric fields: Browser default validation only
- No custom error messages
- No field highlighting for errors

**Data Processing on Submit:**

**Create Mode:**
```javascript
{
  id: 'new-' + Date.now(),
  title: formData.projectName || 'Untitled Major Works',
  estate: formData.estate || 'N/A',
  building: formData.building || 'N/A',
  location: `${estate} - ${building}`,
  managementFee: parseFloat(formData.managementFee) || 0,
  totalCost: parseFloat(formData.totalCost) || 0,
  formData: { ...formData },
  isNew: true,
  createdAt: new Date().toISOString(),
  stageCompletion: {
    'notice-of-intention': false,
    'tender': false,
    'estimates': false,
    'reasons': false,
    'completion': false
  }
}
```

**Edit Mode:**
- Preserves existing ID
- Updates title, managementFee, totalCost
- Preserves existing stageCompletion
- Updates formData object
- Maintains linkedIssues and uploadedFiles

**Auto-Save:** Not implemented
**Draft Save:** Not implemented
**Session Persistence:** No (data lost on refresh)

---

### 3.4 MAJOR WORKS DETAIL VIEW

#### 3.4.1 Header Section

**Project Title Area:**
- **Default Display:**
  - Large bold title (h3, 24px)
  - Edit icon button (pencil, 16px, gray)
  - Layout: Flex with gap
- **Edit Mode:**
  - Text input (full width)
  - Save button (checkmark icon, green)
  - Cancel button (X icon, gray)
  - Input autofocuses on edit

**Location Display:**
- MapPin icon (18px, #6c757d)
- Full address text
- Gray color (#6c757d)
- Font size: 14px

**Edit Title Behavior:**
1. Click Edit icon → Enter edit mode
2. Input shows current title
3. Click Save → Update title in state + list
4. Click Cancel → Revert to original
5. Changes propagate to list view

**Action Buttons (Right Side):**

**Back Button:**
- **Style:** outline-secondary
- **Icon:** ← (arrow left)
- **Text:** "Back"
- **Position:** Left of Download button
- **Behavior:** Navigate to list view

**Download Report Button:**
- **Style:** outline-primary (#0B81C5 border)
- **Icon:** Download
- **Text:** "Download Report"
- **Position:** Right of Back button
- **Behavior:** Non-functional (UI only)
- **Note:** Does not trigger any download

**Specifications:**
- Header padding: 24px
- Title margin bottom: 8px
- Button gap: 12px
- Edit icon hover: Color changes to #0B81C5
- Input border: #0B81C5 when focused

#### 3.4.2 Section 20 Timeline

**Visual Design:**
- Horizontal progress bar spanning full width
- 5 stages displayed as connected circles
- Progress line connecting circles
- Percentage completion display

**Position:** 
- Below header, above tabs
- Visible on all tabs (persistent)
- White card with shadow

**Stage Display (For Each of 5 Stages):**

**Circle Element:**
- **Size:** 48px diameter
- **Border:** 2px solid
- **Colors:**
  - Completed: Green fill (#28a745), white checkmark
  - Active/Current: Blue border (#0B81C5), white fill
  - Future: Gray border (#dee2e6), white fill
- **Icon:** Checkmark (white) if completed
- **Layout:** Centered in circle

**Connecting Line:**
- **Width:** Full width between circles
- **Height:** 2px
- **Colors:**
  - Before/including last complete: Green (#28a745)
  - After last complete: Gray (#dee2e6)
- **Position:** Behind circles

**Stage Name:**
- **Position:** Below circle
- **Font size:** 14px
- **Font weight:** 500
- **Colors:**
  - Completed: Green (#28a745)
  - Active: Blue (#0B81C5)
  - Future: Gray (#6c757d)

**Checkbox:**
- **Position:** Below stage name
- **Type:** Bootstrap checkbox
- **Size:** 20px
- **Label:** "Mark complete" / "Completed"
- **Behavior:** Manual toggle
- **Validation:** Sequential enforcement

**5 Stages:**

1. **Notice of Intention**
   - ID: 'notice-of-intention'
   - Can complete: Always (first stage)
   - Duration indicator: Not shown

2. **Tender / Tenders**
   - ID: 'tender'
   - Can complete: Only if stage 1 complete
   - Alert if attempted out of order

3. **Statement of Estimate / Estimates**
   - ID: 'estimates'
   - Can complete: Only if stage 2 complete
   - **Special:** Opens "Lowest Quote" modal on check
   - Modal asks: "Was the lowest quote selected?"
   - Options: Yes (sets stage to "Notice of reasons"), No (sets to "Notice of reasons for not using lowest quote")

4. **Notice of Reasons**
   - ID: 'reasons'
   - Name changes based on lowest quote response
   - Can complete: Only if stage 3 complete

5. **Completion**
   - ID: 'completion'
   - Final stage
   - Can complete: Only if stage 4 complete
   - Marks project as "Completed" status

**Sequential Validation Logic:**
```
User clicks checkbox for stage N:
  IF stage N is currently unchecked:
    IF N > 0:
      IF stage N-1 is NOT complete:
        SHOW ALERT: "Please complete [Stage N-1 Name] before marking this stage as complete."
        RETURN without checking
      END IF
    END IF
    
    IF stage N is 'estimates':
      SHOW MODAL: "Lowest Quote Selection"
      WAIT for user response
      UPDATE stage name based on response
    END IF
    
    CHECK stage N
    UPDATE state
    PROPAGATE to parent
  ELSE:
    UNCHECK stage N
    IF stage N is 'estimates':
      RESET stage 4 name to "Notice of reasons"
    END IF
    UPDATE state
  END IF
```

**Progress Calculation:**
- Formula: (Completed stages / Total stages) × 100
- Display: "X% Complete" in top right
- Updates real-time on checkbox toggle

**Visual States:**

**0% Complete (All Unchecked):**
- All circles: Gray border, white fill
- All lines: Gray
- All text: Gray

**20% Complete (Stage 1 Done):**
- Circle 1: Green fill, white check
- Line 1→2: Green
- Circles 2-5: Gray
- Text 1: Green
- Texts 2-5: Gray

**100% Complete (All Stages Done):**
- All circles: Green fill, white check
- All lines: Green
- All text: Green
- Timeline background: Light green tint

**Specifications:**
- Timeline padding: 24px
- Circle size: 48px
- Line height: 2px
- Gap between stages: Equal spacing (flex)
- Checkbox size: 20px
- Checkbox margin top: 8px
- Alert style: Browser default alert()

#### 3.4.3 Lowest Quote Modal

**Trigger:** Checking "Estimates" stage checkbox

**Modal Content:**
- **Title:** "Lowest Quote Selection"
- **Question:** "Was the lowest quote selected?"
- **Icon:** Award icon (48px, #0B81C5)
- **Buttons:**
  - "Yes, lowest quote selected" (primary, green)
  - "No, alternative contractor selected" (secondary, gray)

**Yes Button Behavior:**
- Sets stage 4 name to: "Notice of reasons"
- Marks estimates as complete
- Closes modal
- Updates state

**No Button Behavior:**
- Sets stage 4 name to: "Notice of reasons for not using lowest quote"
- Marks estimates as complete
- Closes modal
- Updates state

**Modal Specifications:**
- Size: Medium
- Backdrop: 0.5 opacity black
- Icon size: 48px
- Button width: Full width
- Button gap: 12px
- Text alignment: Center

#### 3.4.4 Tab Navigation

**Tab Bar:**
- Bootstrap nav-tabs styling
- Horizontal layout
- Border bottom: 1px solid #dee2e6
- Active tab underline: 3px solid #0B81C5

**4 Tabs:**

1. **Overview** (default active)
   - Display name: "Overview"
   - Shows: KPIs + Project Information
   
2. **Issues**
   - Display name: "Issues"
   - Shows: Linked issues + Link new issues section
   
3. **Documents**
   - Display name: "Documents"
   - Shows: Document upload + Document list by stage
   
4. **Audit Log / Audit Trail**
   - Display name: "Audit log" or "Audit trail"
   - Shows: Activity timeline

**Tab Behavior:**
- Click tab: Change active tab, update content
- Active state: Bold text, #0B81C5 underline
- Inactive state: Gray text, no underline
- Hover: Text color darkens
- Smooth content transition

**Specifications:**
- Tab height: 48px
- Tab padding: 12px 24px
- Active underline: 3px height
- Font size: 14px
- Font weight active: 600
- Font weight inactive: 400

---

### 3.5 OVERVIEW TAB

#### 3.5.1 Layout Structure

**Section 1: Major Works Summary (4 KPIs)**
- Position: Top of tab
- Layout: 4 equal-width columns (col-md-3)
- Gap: 12px
- Display: Individual white cards

**Section 2: Project Information**
- Position: Below KPIs
- Layout: Single white card
- Content: Two-column grid with project details

#### 3.5.2 KPI Cards (4 Cards)

**Card 1: Linked Issues**
- **Icon:** LinkIcon (20px circle, #0B81C5 background, white icon)
- **Label:** "Linked Issues"
- **Value:** Count of linked issues (e.g., "3")
- **Format:** Large bold number (32px)
- **Calculation:** linkedIssues.length

**Card 2: Documents Uploaded**
- **Icon:** Upload (20px circle, #0B81C5 background, white icon)
- **Label:** "Documents Uploaded"
- **Value:** Count of uploaded files (e.g., "5")
- **Format:** Large bold number (32px)
- **Calculation:** uploadedFiles.length

**Card 3: Estimated Budget**
- **Icon:** PoundSterling (20px circle, #28a745 background, white icon)
- **Label:** "Estimated Budget"
- **Value:** Total cost (e.g., "£450,000")
- **Format:** Currency with comma separator
- **Calculation:** work.totalCost

**Card 4: Management Fee**
- **Icon:** PoundSterling (20px circle, #28a745 background, white icon)
- **Label:** "Management Fee"
- **Value:** Management fee (e.g., "£40,500")
- **Format:** Currency with comma separator
- **Calculation:** work.managementFee

**KPI Card Specifications:**
- Card background: White
- Card border: None
- Card shadow: sm
- Card padding: 20px
- Card height: Equal heights (h-100)
- Icon position: Top center
- Icon margin bottom: 12px
- Label color: #6c757d
- Label size: 12px
- Label weight: 500
- Value color: #212529
- Value size: 32px
- Value weight: 700

#### 3.5.3 Project Information Section

**Card Layout:**
- White background
- Shadow-sm
- Padding: 24px
- Two-column grid on desktop, single column on mobile

**Information Fields Displayed:**

**Column 1 (Left):**
1. **Work Category**
   - Icon: Wrench (18px, #0B81C5)
   - Label: "Work Category"
   - Value: From formData or "Not specified"
   - Display: Icon + label + value

2. **Urgency Level**
   - Icon: AlertCircle (18px, orange/red)
   - Label: "Urgency"
   - Value: From formData or "Normal"
   - Colors: High (red), Medium (orange), Low (green)

3. **Estimated Budget**
   - Icon: PoundSterling (18px, green)
   - Label: "Total Estimated Cost (inc. VAT)"
   - Value: £XXX,XXX formatted
   - Source: work.totalCost

4. **Units Affected**
   - Icon: Building (18px, #0B81C5)
   - Label: "Units Affected"
   - Value: From formData or "To be determined"

**Column 2 (Right):**
1. **Start Date**
   - Icon: Calendar (18px, #0B81C5)
   - Label: "Start Date"
   - Value: From formData or "To be scheduled"

2. **Expected Completion Date**
   - Icon: Calendar (18px, #0B81C5)
   - Label: "Expected Completion"
   - Value: From formData or "To be determined"

3. **Current Consultation Stage**
   - Icon: Clock (18px, #0B81C5)
   - Label: "Current Stage"
   - Value: Stage name from timeline (last completed)

4. **Consultation Start Date**
   - Icon: Calendar (18px, #0B81C5)
   - Label: "Consultation Started"
   - Value: From formData or creation date

**Financial Summary (Full Width):**
- **Management Fee:** £XX,XXX (inc. VAT)
- **Fee Type:** Percentage or Fixed (from formData)
- **Total Project Cost:** £XXX,XXX (inc. VAT)

**Metadata (Full Width):**
- **Created:** DD/MM/YYYY at HH:MM by [User]
- **Last Modified:** DD/MM/YYYY at HH:MM by [User]

**Field Specifications:**
- Row gap: 16px
- Icon size: 18px
- Icon color: Varies by context
- Label size: 12px
- Label color: #6c757d
- Label weight: 500
- Value size: 14px
- Value color: #212529
- Value weight: 400
- Empty state: "Not specified" or "To be determined" (gray)

---

### 3.6 ISSUES TAB

#### 3.6.1 Tab Overview

**Purpose:** Link existing issues to major works project

**Sections:**
1. Linked Issues List
2. Link New Issues Section

**No S20 Tags:** Removed in recent update

#### 3.6.2 Linked Issues Section

**Header:**
- Title: "Linked Issues" (h5)
- Count badge: Shows number of linked issues
- Style: Bold, #212529

**Empty State:**
- Message: "No issues linked to this major works yet."
- Icon: LinkIcon (48px, gray)
- Action button: "Link Existing Issue"
- Button style: primary (#0B81C5)

**Issue Cards (When Issues Exist):**

**Each Card Displays:**
- **Issue Reference:** (e.g., "#2547")
  - Position: Top left
  - Style: Badge, small, muted
  - Font size: 11px

- **Issue Title:** (e.g., "Water leak in communal area")
  - Position: Below reference
  - Style: Bold, 16px
  - Color: #212529

- **Building Name:** (e.g., "Riverside Heights")
  - Position: Below title
  - Icon: Building icon (14px)
  - Style: Small, muted
  - Font size: 13px

- **Status Badge:**
  - Position: Top right
  - Types:
    - Open (Blue, #0B81C5)
    - In Progress (Yellow, #ffc107)
    - Resolved (Green, #28a745)
    - Closed (Gray, #6c757d)
  - Style: Small pill badge

- **Unlink Button:**
  - Position: Bottom right
  - Icon: X (close icon)
  - Text: "Unlink"
  - Style: btn-sm btn-link text-danger
  - Behavior: Remove issue ID from linkedIssues array

**Card Specifications:**
- Background: White
- Border: 1px solid #dee2e6
- Border radius: 8px
- Padding: 16px
- Margin bottom: 12px
- Hover: Shadow increase, border color #0B81C5

**Issue List (17 Total Issues Available):**

**Riverside Heights (6 issues):**
1. #2547 - Water leak in communal area (Open)
2. #2498 - Structural cracks in external walls (In Progress)
3. #2521 - Roof membrane deterioration (Open)
4. #2589 - Balcony railing corrosion (Open)
5. #2612 - Communal heating system fault (In Progress)
6. #2634 - Window frame water ingress (Open)

**Parkview Block (4 issues):**
7. #2401 - Roof tiles missing after storm (In Progress)
8. #2445 - Lift mechanical failure (Open)
9. #2378 - Fire door seal damage (Resolved)
10. #2467 - Drainage system blockage (Open)

**Central Tower (4 issues):**
11. #2301 - Cladding inspection required (Open)
12. #2325 - Elevator modernization needed (In Progress)
13. #2356 - Basement flooding issues (Open)
14. #2289 - CCTV system malfunction (Resolved)

**Tower B (3 issues):**
15. #2201 - Window seal deterioration (Open)
16. #2234 - Communal lighting upgrade needed (In Progress)
17. #2267 - Intercom system replacement (Open)

**Filtering Logic:**
- Issues filtered by selected building (from work.building or work.formData.building)
- Only shows issues matching the major works' building
- If no building selected, shows all issues

#### 3.6.3 Link New Issues Section

**Header:**
- Title: "Link Existing Issues"
- Subtitle: "Search and link relevant issues to this major works"

**Search Component:**
- Input: Text field
- Placeholder: "Search issues..."
- Icon: Search (left side)
- Behavior: Real-time filter of available issues
- Searches: Issue title and reference number

**Available Issues List:**

**Display:**
- Shows unlinked issues only (not already in linkedIssues)
- Filtered by building match
- Sorted by issue reference (descending)

**Each Available Issue Shows:**
- Issue reference (badge)
- Issue title
- Building name
- Status badge
- "Link" button

**Link Button:**
- Style: btn-sm primary (#0B81C5)
- Icon: Plus
- Text: "Link"
- Position: Right side
- Behavior: 
  1. Add issue ID to linkedIssues array
  2. Remove from available list
  3. Add to linked issues list
  4. Update state

**Empty State (No Available Issues):**
- Message: "All issues for this building have been linked."
- Icon: CheckCircle (green, 48px)
- Alternative: "No issues found for this building."

**Specifications:**
- Section spacing: 24px margin top
- Search input width: Full width
- Search icon size: 18px
- Available issues max height: 400px (scrollable)
- Link button size: Small
- Card gap: 8px

#### 3.6.4 Create New Issue Modal

**Trigger:** Click "Create New Issue" button

**Modal Content:**

**Step 1: Issue Type Selection**
- Title: "Create New Issue - Step 1 of 3"
- Subtitle: "Select issue type"
- Options: (Grid of cards)
  1. Emergency Repair
  2. Structural Issue
  3. Safety Concern
  4. Maintenance Request
  5. Compliance Issue
  6. Other

**Step 2: Issue Details**
- Title: "Create New Issue - Step 2 of 3"
- Fields:
  - Issue Title (text input, required)
  - Description (textarea, required)
  - Building (auto-filled from major works)
  - Unit Number (optional)
  - Priority (dropdown: High, Medium, Low)
  - Reported By (text input)

**Step 3: Link to Major Works**
- Title: "Create New Issue - Step 3 of 3"
- Checkbox: "Link this issue to [Major Works Title]"
- Default: Checked
- Summary: Shows issue details for review

**Modal Actions:**
- Previous button (Steps 2-3)
- Cancel button (all steps)
- Next button (Steps 1-2)
- Create & Link button (Step 3, primary)

**Create Behavior:**
1. Generate new issue ID
2. Add to issues database (mock)
3. If link checkbox checked: Add to linkedIssues array
4. Close modal
5. Show success message (optional)
6. Refresh issues list

**Modal Specifications:**
- Size: Large
- Steps indicator: Dots or numbers at top
- Button layout: Space between
- Validation: Required fields prevent next/create
- ESC: Close modal
- Click outside: Close modal

---

### 3.7 DOCUMENTS TAB

#### 3.7.1 Tab Overview

**Purpose:** Upload and manage documents by Section 20 stage

**Sections:**
1. Stage Selector
2. Document Upload Area
3. Documents List (by stage)

#### 3.7.2 Stage Selector

**Component:** Tab pills / Segmented control

**5 Stage Options:**
1. Notice of intention
2. Tender
3. Statement of estimate
4. Notice of reasons
5. Completion

**Behavior:**
- Click stage: Change selectedStage state
- Active stage: Highlighted background (#0B81C5)
- Inactive stages: Gray background (#f8f9fa)
- Active stage shows its documents below

**Specifications:**
- Layout: Horizontal pills
- Pill height: 36px
- Pill padding: 8px 16px
- Font size: 13px
- Active color: White text on #0B81C5
- Inactive color: Gray text on light gray
- Border radius: 18px (full pill)
- Gap: 8px

#### 3.7.3 Document Upload Area

**Upload Component Types:**
1. Drag & Drop Zone
2. File Browser Button

**Drag & Drop Zone:**
- **Visual:**
  - Dashed border (2px dashed #dee2e6)
  - Light background (#f8f9fa)
  - Upload cloud icon (48px, centered, gray)
  - Text: "Drag and drop files here, or click to browse"
  - Subtext: "Maximum file size: No limit (prototype)"
- **States:**
  - Default: Light gray
  - Hover: Border #0B81C5
  - Dragging: Background light blue (#e7f3ff), border #0B81C5
- **Behavior:**
  - Click: Opens file browser
  - Drag over: Shows active state
  - Drop: Adds files to selectedStage
  - Multiple files: Supported

**File Browser (Alternative):**
- Button: "+ Add Document"
- Style: primary (#0B81C5)
- Icon: Plus
- Position: Above upload zone
- Behavior: Opens file browser, adds to selectedStage

**File Processing:**
```javascript
{
  id: Date.now() + index,
  name: file.name,
  size: file.size,
  uploadedAt: new Date().toISOString().split('T')[0],
  stage: selectedStage,
  type: file.type
}
```

**Specifications:**
- Upload zone min height: 150px
- Upload zone radius: 8px
- Icon size: 48px
- Icon color: #6c757d
- Text color: #6c757d
- Text size: 14px
- Dragging border color: #0B81C5

#### 3.7.4 Documents List

**Organization:** Grouped by stage, shows only documents for selected stage

**Header:**
- Stage name (e.g., "Notice of intention - Documents")
- Document count (e.g., "2 documents")
- Style: Bold, #212529

**Empty State (No Documents for Stage):**
- Icon: FileText (48px, gray)
- Message: "No documents uploaded for this stage yet."
- Subtext: "Upload documents using the area above."

**Document Card (Each Document):**

**Layout:** Horizontal card with icon, info, and actions

**Left Section (Icon + Info):**
- **File Type Icon:**
  - Based on file extension/type
  - Icons: FileText (PDF), Image, File (other)
  - Size: 40px
  - Color: #0B81C5
  
- **File Name:**
  - Font size: 14px
  - Font weight: 500
  - Color: #212529
  - Truncate if too long
  
- **File Metadata:**
  - Size: Formatted (KB/MB)
  - Upload date: DD/MM/YYYY format
  - Uploaded by: User name (if available)
  - Style: Small, muted
  - Font size: 12px
  - Layout: Inline with bullet separators

**Right Section (Actions):**

**View Button:**
- Icon: Eye (16px)
- Style: btn-sm btn-outline-primary
- Text: None (icon only) or "View"
- Position: First button
- Behavior: Opens document preview (not implemented in prototype)

**Remove Button:**
- Icon: Trash2 (16px, red)
- Style: btn-sm btn-link text-danger
- Text: None (icon only) or "Remove"
- Position: After view button
- Behavior: Remove from uploadedFiles array

**Card Specifications:**
- Background: White
- Border: 1px solid #dee2e6
- Border radius: 8px
- Padding: 16px
- Margin bottom: 12px
- Hover: Shadow increase
- Layout: Flex, space-between, align-center
- Icon left margin: 0
- Actions right margin: 0
- Gap: 16px

#### 3.7.5 Document Actions Detail

**View Action:**
- Opens DocumentDetailPanel (slide-in from right)
- Shows document metadata
- Shows AI suggestions for document
- Shows document preview (mock)
- Close button returns to documents tab
- *Note: Panel component exists but may not be integrated*

**Remove Action:**
1. Click remove button
2. Show confirmation alert (browser default)
   - Message: "Are you sure you want to remove [filename]?"
   - Buttons: OK, Cancel
3. If OK: Remove from array, update state
4. If Cancel: No action

**Specifications:**
- Confirmation: Browser alert() function
- No undo functionality
- Immediate UI update
- No backend persistence

---

### 3.8 AUDIT LOG TAB

#### 3.8.1 Tab Overview

**Purpose:** Display chronological activity log for major works

**Display Type:** Timeline view with icons

**Content:** Read-only (no editing)

#### 3.8.2 Audit Entry Structure

**Each Entry Contains:**
1. Timestamp
2. User avatar/initials
3. User name
4. Action icon
5. Action description
6. Changed values (if applicable)

**Timeline Layout:**
- Vertical timeline line (2px, #dee2e6)
- Entries connected to line
- Most recent at top
- Reverse chronological order

#### 3.8.3 Entry Types & Icons

**9 Icon Types Available:**

1. **Plus Icon** (Created actions)
   - Color: Blue (#0B81C5)
   - Usage: "Major Works Created", "Issue Created"
   - Size: 16px
   - Background: Light blue circle

2. **Clock Icon** (Stage/Timeline actions)
   - Color: Blue (#0B81C5)
   - Usage: "Stage Marked Complete", "Timeline Updated"
   - Size: 16px

3. **Link Icon** (Issue/Linked actions)
   - Color: Blue (#0B81C5)
   - Usage: "Issue Linked", "Issue Unlinked"
   - Size: 16px

4. **Upload Icon** (Document actions)
   - Color: Green (#28a745)
   - Usage: "Document Uploaded", "Documents Imported"
   - Size: 16px

5. **CheckCircle Icon** (Completion actions)
   - Color: Green (#28a745)
   - Usage: "Stage Completed", "Major Works Completed"
   - Size: 16px

6. **Edit Icon** (Update actions)
   - Color: Orange (#ffc107)
   - Usage: "Major Works Updated", "Details Modified"
   - Size: 16px

7. **UserPlus Icon** (Team actions)
   - Color: Blue (#0B81C5)
   - Usage: "Team Member Added", "User Assigned"
   - Size: 16px

8. **FileText Icon** (Default)
   - Color: Gray (#6c757d)
   - Usage: General file actions
   - Size: 16px

9. **AlertTriangle Icon** (Warnings)
   - Color: Orange (#ffc107)
   - Usage: "Warning Issued", "Alert Triggered"
   - Size: 16px

**Icon Mapping Logic:**
```javascript
if (action.includes('Created')) → Plus
if (action.includes('Stage') || action.includes('Timeline')) → Clock
if (action.includes('Issue') || action.includes('Linked')) → Link
if (action.includes('Uploaded') || action.includes('Imported')) → Upload
if (action.includes('Completed')) → CheckCircle
if (action.includes('Updated')) → Edit
if (action.includes('Team') || action.includes('Added')) → UserPlus
default → FileText
```

#### 3.8.4 Sample Audit Entries (Generated)

**Entry 1: Recent Activity (2 minutes ago)**
- Action: "Document Uploaded"
- Description: "Uploaded 'Contractor Quote - Emergency Repairs.pdf'"
- User: "Ahsan Jalil"
- Icon: Upload (green)
- Timestamp: Current time - 2 minutes

**Entry 2: Stage Completion (1 hour ago)**
- Action: "Stage Marked Complete"
- Description: "Marked 'Notice of Intention' stage as complete"
- User: "Sarah Mitchell"
- Icon: CheckCircle (green)
- Timestamp: Current time - 1 hour

**Entry 3: Issue Linked (3 hours ago)**
- Action: "Issue Linked"
- Description: "Linked issue #2547 'Water leak in communal area'"
- User: "Michael Thompson"
- Icon: Link (blue)
- Timestamp: Current time - 3 hours

**Entry 4: Timeline Update (5 hours ago)**
- Action: "Timeline Updated"
- Description: "Updated Section 20 timeline progress"
- User: "Emma Evans"
- Icon: Clock (blue)
- Timestamp: Current time - 5 hours

**Entry 5: Document Upload (1 day ago)**
- Action: "Document Uploaded"
- Description: "Uploaded 'Section 20 Notice - Residents.pdf'"
- User: "James Cooper"
- Icon: Upload (green)
- Timestamp: Current time - 1 day

**Entry 6: Major Works Updated (1 day ago)**
- Action: "Major Works Updated"
- Description: "Updated total cost from £420,000 to £450,000"
- User: "Ahsan Jalil"
- Icon: Edit (orange)
- Changed values: "Before: £420,000 → After: £450,000"
- Timestamp: Current time - 1 day

**Entry 7: Issue Linked (2 days ago)**
- Action: "Issue Linked"
- Description: "Linked issue #2498 'Structural cracks in external walls'"
- User: "Sarah Mitchell"
- Icon: Link (blue)
- Timestamp: Current time - 2 days

**Entry 8: Document Upload (2 days ago)**
- Action: "Document Uploaded"
- Description: "Uploaded 'Surveyor Report - March 2025.pdf'"
- User: "Michael Thompson"
- Icon: Upload (green)
- Timestamp: Current time - 2 days

**Entry 9: Team Member Added (2 days ago)**
- Action: "Team Member Added"
- Description: "Added Emma Evans to major works team"
- User: "Ahsan Jalil"
- Icon: UserPlus (blue)
- Timestamp: Current time - 2 days

**Entry 10: Document Imported (3 days ago)**
- Action: "Document Imported"
- Description: "Imported 3 documents from 'Riverside Renovation 2024'"
- User: "Sarah Mitchell"
- Icon: Upload (green)
- Timestamp: Current time - 3 days

**Entry 11: Major Works Created (3 days ago)**
- Action: "Major Works Created"
- Description: "Created new major works 'Riverside Roof'"
- User: "Ahsan Jalil"
- Icon: Plus (blue)
- Timestamp: Creation date

#### 3.8.5 Entry Display Specifications

**Timeline Line:**
- Position: Left side (20px from left edge)
- Width: 2px
- Color: #dee2e6
- Height: Full content height

**Entry Layout:**
```
[Icon] [User Avatar] [Content]
   |                    |
   +---- Timeline ------+
```

**Icon Container:**
- Size: 32px circle
- Background: Color based on icon type
- Border: 2px solid white
- Position: On timeline line
- Z-index: 1 (above line)

**User Avatar:**
- Size: 24px circle
- Position: Next to icon
- Background: Initials on colored circle
- Colors: Vary by user

**Content Container:**
- Padding left: 60px (clear of icon)
- Max width: 100%
- Background: White (no card)

**Action Text:**
- Font size: 14px
- Font weight: 600
- Color: #212529

**Description Text:**
- Font size: 13px
- Font weight: 400
- Color: #6c757d
- Margin top: 4px

**Changed Values (if present):**
- Font size: 12px
- Font family: Monospace
- Background: #f8f9fa
- Padding: 4px 8px
- Border radius: 4px
- Format: "Before: X → After: Y"

**Timestamp:**
- Font size: 11px
- Color: #adb5bd (light gray)
- Position: Bottom of entry
- Format: "DD/MM/YYYY HH:MM:SS" or relative ("2 minutes ago")

**Entry Spacing:**
- Margin bottom: 24px
- Last entry: No margin

**Specifications:**
- Timeline starts: 32px from top
- Timeline ends: At last entry icon
- Entry hover: Background #f8f9fa
- Transition: 0.2s ease

---

### 3.9 AI FEATURES

#### 3.9.1 AI Chat Bubble

**Position:** Fixed, bottom-right corner of screen

**Visual States:**

**Closed State:**
- Circular button (64px diameter)
- Background: #0B81C5 (primary blue)
- Icon: Sparkles (white, 28px)
- Shadow: Large shadow for elevation
- Notification badge: "2" (red circle, top-right)
- Pulse animation: Continuous pulse ring

**Open State:**
- Expands to chat panel
- Size: 400px width × 600px height
- Position: Bottom-right, 20px from edges
- Shadow: Large, prominent
- Border radius: 12px

**Notification Badge:**
- Size: 24px circle
- Background: #dc3545 (red)
- Text: White, bold, "2"
- Position: Top-right of bubble (-8px, -8px)
- Font size: 12px
- Indicates: 2 urgent items

**Pulse Animation:**
- Starts from bubble center
- Expands outward
- Opacity: 1 → 0
- Duration: 2s infinite
- Color: #0B81C5

#### 3.9.2 Chat Panel Components

**Header:**
- Background: #0B81C5 (primary blue)
- Text: White
- Height: 60px
- Padding: 16px

**Header Content:**
- Left: Sparkles icon + "AI Assistant"
- Right: Minimize button (ChevronDown) + Close button (X)
- Font size: 16px, bold

**Messages Area:**
- Background: #f8f9fa (light gray)
- Padding: 16px
- Max height: 440px
- Overflow: Auto scroll
- Scroll behavior: Auto-scroll to bottom on new message

**Message Types:**

**AI Message:**
- Alignment: Left
- Background: White
- Border: 1px solid #dee2e6
- Border radius: 12px (bubble shape)
- Padding: 12px
- Max width: 85%
- Icon: Sparkles (top-left, 16px, #0B81C5)
- Timestamp: Small gray text below
- Markdown support: **bold**, lists, line breaks

**User Message:**
- Alignment: Right
- Background: #0B81C5
- Color: White
- Border radius: 12px
- Padding: 12px
- Max width: 85%
- No icon
- Timestamp: Small light text below

**Initial Greeting Message:**
- Shows on first open
- Content: "GREETING_WITH_URGENT" template
- Includes:
  - Welcome text
  - Urgent items section (2 items with red indicators)
  - Upcoming items section (3 items with yellow indicators)
  - Clickable item cards

**Urgent Items (Interactive):**

**Item 1: Riverside Roof**
- Text: "Riverside Roof"
- Subtext: "Document approval deadline in 2 days"
- Style: Red outline button
- Icon: ExternalLink (14px, right side)
- Behavior: Click → Navigate to that major works detail

**Item 2: Legacy House**
- Text: "Legacy House"
- Subtext: "Consultation ending in 5 days"
- Style: Red outline button
- Icon: ExternalLink
- Behavior: Click → Navigate to major works

**Upcoming Items (Interactive):**

**Item 1: Eastside**
- Text: "Eastside"
- Subtext: "Statement review due in 7 days"
- Style: Yellow outline button
- Icon: ExternalLink
- Behavior: Click → Navigate

**Item 2: Dockside**
- Text: "Dockside"
- Subtext: "Tender submission in 10 days"
- Style: Yellow outline button
- Behavior: Click → Navigate

**Item 3: Central Tower**
- Text: "Central Tower"
- Subtext: "Budget review in 12 days"
- Style: Yellow outline button
- Behavior: Click → Navigate

#### 3.9.3 AI Response System

**Response Generation:** Rule-based (no actual AI)

**Keyword Matching:**

**"delay" or "delayed":**
- Response: Detailed info about Cladding Dockside delay
- Includes: Reasons, estimated delay, recommended actions
- Offers: Draft notification for leaseholders

**"status" or "progress":**
- Response: Current status overview
- Shows: Count by stage, on-hold count
- Lists: Upcoming deadlines with dates
- Offers: Details on specific major works

**"riverside":**
- Response: Riverside Roof major works details
- Shows: Current stage, urgency, quick stats
- Highlights: Action required, deadlines
- Offers: Show pending documents

**"budget" or "cost":**
- Response: Budget overview
- Shows: Total portfolio value
- Lists: Top 5 major works by cost
- Shows: Budget status statistics
- Offers: Detailed cost breakdown

**"document" or "notice":**
- Response: Document status summary
- Shows: Ready to send count, pending review count
- Lists: Recent activity
- Highlights: AI-flagged issues (date inconsistencies, missing details)
- Offers: Show flagged documents

**"section 20" or "compliance":**
- Response: Section 20 compliance overview
- Shows: Compliant count, attention required count
- Lists: Recent compliance checks
- Highlights: Recommendations with deadlines
- Offers: Detailed compliance report

**"help" or "can you" or "how":**
- Response: Capabilities overview
- Lists: What AI can help with (4 categories)
- Shows: Example queries
- Encourages: Ask specific questions

**Default (No Match):**
- Response: Clarification request
- Echoes: User's query
- Lists: Capabilities
- Shows: Example specific queries
- Encourages: Be more specific

**Response Formatting:**
- Uses markdown: **bold**, bullet lists
- Emojis: For visual hierarchy (📊, 💰, 📄, etc.)
- Line breaks: For readability
- Sections: Clearly separated
- Offers: Always ends with question/offer

#### 3.9.4 Suggestion Chips

**Display:** Below messages, before input (when shown)

**When Shown:**
- On initial greeting
- After certain AI responses
- Hidden after user sends first message

**Suggestion Types (3 Chips):**

**Chip 1: "What's urgent?"**
- Style: Small outline button
- Icon: AlertCircle (14px, orange)
- Click: Sends as user message, AI responds with urgent items

**Chip 2: "Show delayed major works"**
- Style: Small outline button
- Icon: Clock (14px, blue)
- Click: Sends message, AI responds with delayed projects

**Chip 3: "Budget overview"**
- Style: Small outline button
- Icon: TrendingUp (14px, green)
- Click: Sends message, AI responds with budget info

**Chip Specifications:**
- Height: 32px
- Padding: 8px 12px
- Font size: 13px
- Border: 1px solid #dee2e6
- Border radius: 16px (pill)
- Background: White
- Hover: Background #f8f9fa, border #0B81C5
- Gap: 8px

#### 3.9.5 Input Area

**Layout:** Fixed at bottom of panel

**Components:**
1. Text input field
2. Send button

**Text Input:**
- Placeholder: "Ask me anything about your major works..."
- Background: White
- Border: 1px solid #dee2e6
- Border radius: 24px (pill)
- Height: 48px
- Padding: 12px 16px
- Font size: 14px
- Flex: 1 (grows)

**Send Button:**
- Icon: Send (arrow)
- Background: #0B81C5 (when input has text)
- Background: #dee2e6 (when input empty)
- Border: None
- Border radius: 50% (circle)
- Size: 40px circle
- Icon color: White
- Position: Right side of input
- Disabled: When input empty

**Input Behavior:**
- Enter key: Send message (if not empty)
- Typing: Enable send button
- Empty: Disable send button
- Max length: None (prototype)
- Multi-line: No (single line)

**Send Action:**
1. Capture input value
2. Add user message to messages array
3. Clear input
4. Show "typing" indicator
5. After 1-2 seconds: Add AI response
6. Hide typing indicator
7. Scroll to bottom

**Typing Indicator:**
- Display: Three animated dots
- Position: Left side (like AI message)
- Background: White bubble
- Animation: Bounce effect
- Duration: While AI "thinks"

#### 3.9.6 AI Chat Specifications

**Panel Specifications:**
- Width: 400px
- Height: 600px
- Position: fixed, bottom 20px, right 20px
- Z-index: 9999
- Border radius: 12px
- Shadow: 0 10px 40px rgba(0,0,0,0.2)

**Animation:**
- Open: Scale up from bubble (0.5 → 1), fade in
- Close: Scale down to bubble (1 → 0.5), fade out
- Duration: 0.3s ease

**Responsive:**
- Mobile: Full screen overlay
- Desktop: Fixed size panel

**Accessibility:**
- Focus trap when open
- ESC key closes
- ARIA labels on buttons

#### 3.9.7 AI Summary Panel (List View)

**Position:** Below action bar, above filters in list view

**Visual Design:**
- Card component
- Border: None
- Shadow: sm
- Background: White
- Padding: 20px

**Header:**
- Icon: Sparkles (20px, #0B81C5)
- Title: "AI Insights"
- Font: 16px, bold
- Layout: Horizontal with gap

**Content (3 Insights):**

**Insight 1: Attention Required**
- Icon: AlertCircle (16px, orange/warning color)
- Title: "2 major works require attention"
- Description: "Cladding Dockside and Riverside Roof have upcoming deadlines"
- Style: Bold title, muted description

**Insight 2: Average Duration**
- Icon: Clock (16px, blue/info color)
- Title: "Average major works duration: 14 weeks"
- Description: "Based on completed Section 20 consultations"
- Style: Bold title, muted description

**Insight 3: Portfolio Health**
- Icon: TrendingUp (16px, green/success color)
- Title: "Portfolio health: Good"
- Description: "8 major works in progress, 5 completed this quarter"
- Style: Bold title, muted description

**Layout:**
- Vertical stack
- Each insight: Horizontal layout (icon + text)
- Gap between insights: 16px
- Icon alignment: Top (flex-start)
- Text alignment: Left

**Specifications:**
- Icon size: 16px
- Icon margin right: 12px
- Title font size: 14px
- Title font weight: 600
- Description font size: 13px
- Description color: #6c757d
- Last insight margin: 0

**Interactivity:**
- Read-only (no clicks, no expansion)
- No collapsible functionality
- Always visible when on list view

---

### 3.10 EMPTY STATE

#### 3.10.1 When Shown

**Trigger:** When majorWorks array is empty (length === 0)

**View:** Replaces list view content

#### 3.10.2 Empty State Content

**SVG Illustration:**
- Custom SVG icon (clipboard with magnifying glass)
- Size: 97px × 60px
- Color: Grayscale (#6c757d shades)
- Position: Center of screen

**Message:**
- Primary: "No major works yet"
- Font size: 24px
- Font weight: 600
- Color: #212529
- Position: Below icon

**Subtext:**
- Message: "Create your first major works project to get started with Section 20 consultation tracking."
- Font size: 14px
- Color: #6c757d
- Max width: 500px
- Text alignment: Center

**Action Button:**
- Text: "Create Major Works"
- Style: primary (#0B81C5)
- Icon: Plus
- Size: Regular (btn)
- Position: Below subtext
- Behavior: Calls onCreateClick → Opens form

**Layout:**
- Container: Flex column, centered
- Min height: 60vh
- Alignment: Center (vertical and horizontal)
- Spacing: 16px gap between elements

**Specifications:**
- Background: Light gray (#f8f9fa)
- Icon margin bottom: 24px
- Message margin bottom: 12px
- Subtext margin bottom: 24px
- Button padding: 12px 32px

---

## 4. User Workflows

### 4.1 Create New Major Works (Happy Path)

**Steps:**
1. User on list view
2. Click "New major works" button (action bar) OR
3. Click "Major works" under "Create Issue" in sidebar
4. Form view opens
5. Fill in fields:
   - Major Works Name: "Roof Replacement"
   - Estate: "Burns Court"
   - Building: "Riverside Block"
   - Total Cost: "250000"
   - Management Fee: "25000"
   - Consultation Stage: "Notice of intention"
   - Assign To: Select "Sarah Mitchell", "John Smith"
6. Upload documents:
   - Drag "Project_Plan.pdf" to upload zone
   - File appears in list
7. Click "Create Major Works"
8. Navigate to detail view
9. New major works visible with:
   - All 5 stages unchecked
   - 0% complete
   - 0 linked issues
   - 1 uploaded document
   - Audit log entry: "Major Works Created"

**Result:** New major works added to list, visible in table

### 4.2 Complete Section 20 Timeline (Sequential)

**Steps:**
1. User on detail view of "Roof Replacement"
2. Timeline shows 5 stages, all unchecked
3. Click checkbox for "Notice of intention"
4. Stage 1 circle turns green with checkmark
5. Progress updates: "20% Complete"
6. Try to click "Statement of estimate" checkbox
7. Alert appears: "Please complete 'Tender' before marking this stage as complete."
8. Click OK on alert
9. Click checkbox for "Tender"
10. Stage 2 circle turns green
11. Progress: "40% Complete"
12. Click checkbox for "Statement of estimate"
13. Modal appears: "Was the lowest quote selected?"
14. Click "Yes, lowest quote selected"
15. Modal closes
16. Stage 3 marked complete
17. Stage 4 name remains "Notice of reasons"
18. Progress: "60% Complete"
19. Click checkbox for "Notice of reasons"
20. Stage 4 marked complete
21. Progress: "80% Complete"
22. Click checkbox for "Completion"
23. Stage 5 marked complete
24. Progress: "100% Complete"
25. Timeline turns green
26. Audit log entries created for each stage

**Result:** Major works fully complete, shows as "Completed" in list

### 4.3 Link Issue to Major Works

**Steps:**
1. User on detail view, Issues tab
2. Click "Link Existing Issue" button
3. Available issues list shows (filtered by building)
4. Search input: Type "water leak"
5. List filters to show "#2547 - Water leak in communal area"
6. Click "Link" button on issue card
7. Issue moves to "Linked Issues" section
8. Issue no longer in available list
9. Badge shows "1 linked issue"
10. Audit log entry: "Issue Linked"
11. Switch to Overview tab
12. "Linked Issues" KPI shows "1"

**Result:** Issue successfully linked, visible in Issues tab and KPI

### 4.4 Upload Document by Stage

**Steps:**
1. User on detail view, Documents tab
2. Click stage: "Tender"
3. Drag "Tender_Pack.pdf" to upload zone
4. Drop file
5. File processes
6. Document card appears below upload zone:
   - Name: "Tender_Pack.pdf"
   - Size: "890 KB"
   - Date: Today's date
   - Stage: "Tender"
   - View button (eye icon)
   - Remove button (trash icon)
7. Switch stage to "Notice of intention"
8. Different documents show (stage-filtered)
9. Document count updates
10. Overview tab → "Documents Uploaded" KPI increases
11. Audit log entry: "Document Uploaded"

**Result:** Document uploaded, organized by stage

### 4.5 Use AI Chat Assistant

**Steps:**
1. User on any view
2. Click AI chat bubble (bottom-right)
3. Panel opens with greeting message
4. Shows 2 urgent items (red), 3 upcoming (yellow)
5. Click urgent item "Riverside Roof"
6. Navigates to Riverside Roof detail view
7. User returns to list
8. Click AI bubble again
9. Type: "What's delayed?"
10. Press Enter
11. User message appears (right, blue)
12. Typing indicator shows (3 dots)
13. After 1-2 seconds, AI response appears (left, white):
    - "Delayed Major Works: Cladding Dockside..."
    - Lists reasons, delay estimate
    - Recommends actions
14. User types: "show budget"
15. AI responds with budget overview
16. Shows top 5 by cost
17. Click minimize (chevron down)
18. Panel minimizes to bubble
19. Badge shows "2" (urgent items count)

**Result:** User gets information, navigates to relevant major works

### 4.6 Archive Major Works

**Steps:**
1. User on list view
2. Hover over "External Facade Works" row
3. Click Archive button (trash icon) in Actions column
4. Modal appears: "Archive Major Works"
5. Shows: "Are you sure you want to archive External Facade Works? This action cannot be undone."
6. Click "Cancel"
7. Modal closes, no action
8. Click Archive button again
9. Modal appears
10. Click "Archive" (red button)
11. Modal closes
12. "External Facade Works" row disappears from table
13. Total items count decreases by 1
14. KPIs recalculate (totals decrease)
15. Pagination adjusts if needed

**Result:** Major works removed from list (archived)

### 4.7 Filter and Sort Major Works

**Steps:**
1. User on list view with 10 major works
2. Click "Estate" dropdown
3. Select "Burns Court"
4. List filters to show only Burns Court projects (3 items)
5. Click "Building" dropdown
6. Select "Riverside Block"
7. List further filters (2 items)
8. Click "Property Manager" dropdown
9. Select "Sarah Mitchell"
10. List filters to 1 item
11. Click "Major works" column header
12. Sort icon changes to up arrow
13. List sorts A→Z
14. Click "Major works" header again
15. Sort icon changes to down arrow
16. List sorts Z→A
17. Click "Fee" column header
18. List sorts by fee (descending)
19. Clear estate filter (select "All estates")
20. List expands to show all estates again
21. Building filter auto-clears
22. Property Manager filter remains
23. List shows all projects by Sarah Mitchell

**Result:** List filtered and sorted as specified

### 4.8 Edit Existing Major Works

**Steps:**
1. User on list view
2. Click on "Riverside Roof" row
3. Navigate to detail view
4. Click title edit icon (pencil)
5. Title becomes editable input
6. Change title to "Riverside Roof Replacement"
7. Click save (checkmark)
8. Title updates in detail view
9. Click "Back" button
10. List view shows updated title
11. Audit log entry: "Major Works Updated"

**Alternative:**
1. Click on major works from list
2. In detail view, click "Edit" button (if available)
3. Navigate to form view
4. Form pre-populated with existing data
5. Change "Total Cost" from "450000" to "475000"
6. Change "Management Fee" from "40500" to "42000"
7. Click "Update Major Works"
8. Navigate back to detail view
9. Overview tab shows updated costs
10. KPI cards show new values
11. List view shows updated fee
12. Audit log entry: "Major Works Updated" with before/after values

**Result:** Major works data updated, changes visible everywhere

---

## 5. Data Model & State Management

### 5.1 Application State (Root Level)

**State Variables in App.tsx:**

```typescript
currentView: 'list' | 'empty' | 'form' | 'detail'
// Controls which main view is displayed

formData: Object | null
// Temporary storage for form inputs during create/edit

selectedWork: MajorWork | null
// Currently selected major works for detail view

sidebarCollapsed: boolean
// Sidebar expand/collapse state

activePage: string
// Current active navigation page ('major-works')

majorWorks: Array<MajorWork>
// Complete list of all major works (in-memory database)
```

### 5.2 Major Works Data Structure

```typescript
interface MajorWork {
  // Core Identifiers
  id: string;                    // Unique ID (e.g., '1' or 'new-1234567890')
  title: string;                 // Major works name
  
  // Location
  estate: string;                // Estate name
  building: string;              // Building name
  location: string;              // Full address (formatted string)
  
  // Financial
  managementFee: number;         // Management fee in pounds (float)
  totalCost: number;             // Total cost inc VAT in pounds (float)
  
  // Metadata
  propertyManager: string;       // Assigned property manager name
  stage: string;                 // Current stage name (derived from stageCompletion)
  createdAt: string;             // ISO 8601 date string
  isNew: boolean;                // Flag for newly created (optional)
  
  // Section 20 Timeline
  stageCompletion: {
    'notice-of-intention': boolean;
    'tender': boolean;
    'estimates': boolean;
    'reasons': boolean;
    'completion': boolean;
  };
  
  // Related Data
  linkedIssues: Array<string>;   // Array of issue IDs
  uploadedFiles: Array<File>;    // Array of file objects
  
  // Form Data (Original Input)
  formData: {
    projectName: string;
    estate: string;
    building: string;
    totalCost: string;
    managementFee: string;
    surveyorFee: string;
    consultationStage: string;
    assignedTo: Array<string>;   // User names
    uploadedFiles: Array<any>;
  };
}
```

### 5.3 File Data Structure

```typescript
interface UploadedFile {
  id: number | string;           // Unique file ID (timestamp-based)
  name: string;                  // Original filename
  size: number;                  // File size in bytes
  uploadedAt: string;            // Date string (ISO or DD/MM/YYYY)
  stage: string;                 // Section 20 stage ID
  type: string;                  // MIME type (e.g., 'application/pdf')
}
```

### 5.4 Issue Data Structure

```typescript
interface Issue {
  id: string;                    // Unique issue ID (e.g., '1')
  title: string;                 // Issue description
  building: string;              // Building name
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  issueRef: string;              // Reference number (e.g., '#2547')
}
```

### 5.5 Audit Entry Data Structure

```typescript
interface AuditLogEntry {
  timestamp: string;             // Localized date/time string
  action: string;                // Action name (e.g., 'Document Uploaded')
  description: string;           // Detailed description
  user: string;                  // User who performed action
  icon?: string;                 // Icon type (determined by action keyword)
  changedValues?: string;        // Before/after values (optional)
}
```

### 5.6 State Flow Diagram

```
User Action
    ↓
Event Handler (in Component)
    ↓
Callback to Parent (via props)
    ↓
State Update (in App.tsx)
    ↓
Props Update (to Child Components)
    ↓
Re-render
    ↓
Updated UI
```

### 5.7 Data Persistence

**Current Implementation:**
- **Storage:** In-memory only (state variables)
- **Lifetime:** Session-based (lost on refresh)
- **Backend:** None (no API calls)
- **Database:** None (arrays in state)

**Implications for Production:**
- Need backend API integration
- Need database (SQL or NoSQL)
- Need authentication/authorization
- Need data validation
- Need file storage (S3, Azure Blob, etc.)
- Need real-time updates (WebSocket or polling)

### 5.8 State Management Patterns

**Pattern:** Lifting State Up
- State stored at highest common ancestor (App.tsx)
- Data flows down via props
- Changes bubble up via callback functions

**Example: Timeline Update**
```
MajorWorksDetail (child)
  ↓ props: onUpdateTimeline callback
App (parent)
  ↓ state: majorWorks array
MajorWorksList (sibling)
  ↓ props: majorWorks array
  ↓ re-renders with updated data
```

**Alternatives for Production:**
- Context API (for avoiding prop drilling)
- Redux or Zustand (for complex state)
- React Query (for server state)
- LocalStorage (for persistence)

---

## 6. UI/UX Specifications

### 6.1 Color Palette

**Primary Colors:**
- **Brand Blue:** #0B81C5
  - Used for: Primary buttons, active states, links, highlights
- **White:** #FFFFFF
  - Used for: Card backgrounds, button text on primary
- **Light Gray Background:** #F8F9FA
  - Used for: Page background, input backgrounds, disabled states

**Status Colors:**
- **Success Green:** #28A745
  - Used for: Completed badges, success messages, positive metrics
- **Warning Orange:** #FFC107
  - Used for: Warning badges, delayed status, alerts
- **Danger Red:** #DC3545
  - Used for: Error messages, remove actions, cancelled status
- **Info Blue:** #17A2B8
  - Used for: Information messages, tooltips

**Text Colors:**
- **Primary Text:** #212529 (near black)
- **Secondary Text:** #6C757D (gray)
- **Muted Text:** #ADB5BD (light gray)
- **White Text:** #FFFFFF (on dark backgrounds)

**Border Colors:**
- **Default Border:** #DEE2E6 (light gray)
- **Active Border:** #0B81C5 (brand blue)
- **Hover Border:** Darker shade of default

### 6.2 Typography

**Font Family:**
- System font stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif

**Font Sizes:**
- **h1:** 32px (not used)
- **h2:** 28px (not used)
- **h3:** 24px (detail view title)
- **h4:** 20px (page title)
- **h5:** 18px (section headers)
- **h6:** 16px (card titles)
- **Body:** 14px (default text)
- **Small:** 13px (secondary info)
- **Tiny:** 12px (labels, metadata)
- **Micro:** 11px (timestamps)

**Font Weights:**
- **Light:** 300 (rare, decorative)
- **Normal:** 400 (body text)
- **Medium:** 500 (labels, buttons)
- **Semi-Bold:** 600 (card titles, active states)
- **Bold:** 700 (headings, emphasis)

**Line Heights:**
- **Tight:** 1.2 (headings)
- **Normal:** 1.5 (body text)
- **Relaxed:** 1.75 (long-form content)

### 6.3 Spacing System

**Base Unit:** 4px

**Spacing Scale:**
- **xs:** 4px (0.25rem)
- **sm:** 8px (0.5rem)
- **md:** 12px (0.75rem)
- **lg:** 16px (1rem)
- **xl:** 24px (1.5rem)
- **2xl:** 32px (2rem)
- **3xl:** 48px (3rem)

**Common Applications:**
- **Card padding:** 16px or 24px
- **Section gap:** 24px
- **Field gap:** 12px or 16px
- **Button padding:** 12px 24px
- **Icon gap:** 8px or 12px

### 6.4 Border Radius

**Scale:**
- **None:** 0px (tables, some cards)
- **Small:** 4px (inputs, buttons)
- **Medium:** 8px (cards, modals)
- **Large:** 12px (panels, large cards)
- **Pill:** 18px or 50% (badges, pill buttons)
- **Circle:** 50% (avatars, icon buttons)

### 6.5 Shadows

**Elevation Levels:**

**None:** No shadow
```css
box-shadow: none;
```

**Small (sm):** Subtle elevation
```css
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
```
- Used for: Cards, dropdowns

**Medium (md):** Standard elevation
```css
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
```
- Used for: Modals, popovers

**Large (lg):** High elevation
```css
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
```
- Used for: Floating panels, AI chat bubble

**Hover Shadow:** Increased elevation on hover
```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
```

### 6.6 Interactive States

**Button States:**

**Default:**
- Background: #0B81C5
- Text: White
- Border: None

**Hover:**
- Background: Darker shade (#096DA9)
- Cursor: Pointer
- Transition: 0.2s ease

**Active/Pressed:**
- Background: Even darker (#074F7E)
- Transform: Slight scale down (0.98)

**Disabled:**
- Background: #DEE2E6 (gray)
- Text: #ADB5BD (light gray)
- Cursor: not-allowed
- Opacity: 0.6

**Focus:**
- Outline: 2px solid #0B81C5
- Outline offset: 2px
- Box shadow: 0 0 0 3px rgba(11, 129, 197, 0.25)

**Link States:**

**Default:**
- Color: #0B81C5
- Text decoration: None

**Hover:**
- Color: Darker shade (#096DA9)
- Text decoration: Underline

**Active:**
- Color: Even darker (#074F7E)

**Visited:**
- Color: Same as default (no distinction)

**Card States:**

**Default:**
- Background: White
- Border: 1px solid #DEE2E6
- Shadow: sm

**Hover (if clickable):**
- Border: 1px solid #0B81C5
- Shadow: md
- Cursor: Pointer
- Transition: 0.2s ease

**Active:**
- Border: 2px solid #0B81C5
- Background: #F8F9FA

### 6.7 Responsive Breakpoints

**Bootstrap 5 Breakpoints:**
- **xs:** < 576px (extra small devices, phones)
- **sm:** ≥ 576px (small devices, large phones)
- **md:** ≥ 768px (medium devices, tablets)
- **lg:** ≥ 992px (large devices, desktops)
- **xl:** ≥ 1200px (extra large devices, large desktops)
- **xxl:** ≥ 1400px (extra extra large devices)

**Layout Adjustments:**

**Sidebar:**
- Desktop (≥ 992px): 270px expanded, 60px collapsed
- Mobile (< 992px): Overlay on top, full height

**Grid:**
- Desktop: 2-column or 4-column layouts
- Tablet: 2-column layouts
- Mobile: Single column (stacked)

**Table:**
- Desktop: Full table with all columns
- Mobile: Consider card view or horizontal scroll (not implemented)

**AI Chat:**
- Desktop: 400×600px panel, bottom-right
- Mobile: Full screen overlay

### 6.8 Accessibility

**WCAG 2.1 Level AA Compliance (Target):**

**Color Contrast:**
- Text on background: Minimum 4.5:1 ratio
- Large text: Minimum 3:1 ratio
- #0B81C5 on white: 4.54:1 (Pass)
- White on #0B81C5: 4.54:1 (Pass)

**Keyboard Navigation:**
- Tab order: Logical, follows visual flow
- Focus indicators: Visible on all interactive elements
- Skip links: Not implemented (add for production)
- Escape key: Closes modals/dropdowns

**Screen Readers:**
- ARIA labels: On icon-only buttons
- Alt text: On images (SVGs have titles)
- Landmarks: Use semantic HTML (header, nav, main, aside)
- Live regions: For dynamic content (not fully implemented)

**Focus Management:**
- Trap focus in modals
- Return focus after modal close
- Autofocus on form inputs when appropriate

### 6.9 Animation & Transitions

**Timing Functions:**
- **Ease:** Default for most transitions
- **Ease-in:** For exits (fade out, scale down)
- **Ease-out:** For entrances (fade in, scale up)
- **Ease-in-out:** For movements (slide, move)

**Durations:**
- **Fast:** 0.15s (hover effects, simple state changes)
- **Medium:** 0.3s (modal open/close, panel slide)
- **Slow:** 0.5s (page transitions, complex animations)

**Common Animations:**

**Fade In:**
```css
opacity: 0 → 1
transition: opacity 0.3s ease;
```

**Slide In (from right):**
```css
transform: translateX(100%) → translateX(0)
transition: transform 0.3s ease-out;
```

**Scale Up:**
```css
transform: scale(0.5) → scale(1)
transition: transform 0.3s ease-out;
```

**Pulse (AI bubble):**
```css
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}
animation: pulse 2s infinite;
```

---

## 7. Technical Capabilities

### 7.1 Frontend Capabilities

**Framework Features:**
- React 18+ with functional components
- TypeScript support (types available but not strictly enforced)
- Hooks: useState, useEffect, useCallback, useRef
- Component composition and reusability
- Conditional rendering
- List rendering with keys

**State Management:**
- Local component state (useState)
- Prop drilling for data flow
- Callback functions for actions
- No global state library (Context, Redux)

**Form Handling:**
- Controlled inputs (value + onChange)
- Multi-file upload (FileList API)
- Drag and drop (HTML5 Drag and Drop API)
- Form validation (minimal, browser default)
- Dynamic form fields

**Routing:**
- Manual view switching (state-based)
- No URL routing (React Router not used)
- Programmatic navigation via state changes

**Data Processing:**
- Array methods: map, filter, reduce, sort, find
- String formatting: Currency, dates
- Number formatting: Comma separators, decimals
- Date handling: ISO strings, locale strings
- File size formatting: Bytes to KB/MB

### 7.2 UI Library Capabilities

**Bootstrap 5.0.2 Components Used:**
- Grid system (container, row, col)
- Cards (card, card-body, card-header)
- Buttons (btn, btn-primary, btn-outline-*)
- Forms (form-control, form-select, form-label, form-check)
- Dropdowns (dropdown, dropdown-menu, dropdown-item)
- Modals (modal, modal-dialog, modal-content)
- Badges (badge, bg-*)
- Tables (table, table-hover)
- Utilities (d-flex, gap-*, mb-*, p-*, text-*)

**Lucide React Icons:**
- 50+ icons used throughout
- Consistent size (16px, 18px, 20px, 40px)
- Color inherits from parent (currentColor)
- Customizable via props (size, color, strokeWidth)

### 7.3 Browser APIs Used

**File API:**
- FileReader (for file upload)
- FileList (multiple file handling)
- Blob/File objects

**Drag and Drop API:**
- dragover, dragleave, drop events
- dataTransfer.files property
- preventDefault() for custom handling

**DOM API:**
- document.addEventListener
- element.scrollIntoView (auto-scroll)
- element.focus() (autofocus)
- element.contains() (click outside detection)

**Browser Features:**
- LocalStorage: Not used (add for persistence)
- SessionStorage: Not used
- Fetch API: Not used (no backend)
- WebSocket: Not used (no real-time)

### 7.4 Performance Optimizations

**Current Optimizations:**
- useCallback for memoized callbacks
- Conditional rendering (avoid unnecessary renders)
- Key props on lists (React reconciliation)
- Lazy loading: Not implemented (small app)

**Potential Optimizations (for Production):**
- React.memo for expensive components
- useMemo for expensive calculations
- Code splitting (React.lazy + Suspense)
- Image optimization (WebP, lazy loading)
- Virtual scrolling for long lists (react-window)
- Debouncing search inputs
- Throttling scroll handlers

### 7.5 Build & Development

**Vite Configuration:**
- Fast HMR (Hot Module Replacement)
- ES modules support
- TypeScript transpilation
- CSS/SCSS bundling
- Asset optimization

**Development Server:**
- Port: Default (usually 5173)
- Auto-reload on file changes
- Error overlay
- Source maps

**Production Build:**
- Minification (Terser)
- Tree shaking
- Code splitting
- Asset hashing
- Gzip compression

### 7.6 Limitations & Constraints

**No Backend:**
- Data lost on refresh
- No authentication/authorization
- No real API calls
- No database persistence
- No server-side validation

**No Routing:**
- No deep linking
- No browser history
- No URL parameters
- Manual view management

**Minimal Validation:**
- No required fields enforced
- No custom error messages
- Browser default validation only
- No field highlighting

**Mock Data:**
- Hardcoded sample projects
- Static issue list
- Pre-defined users
- No dynamic data loading

**Prototype Limitations:**
- Download report button: Non-functional
- Document preview: Not implemented
- Email sending: Not implemented
- Notifications: Visual only
- Print functionality: Not implemented

---

## 8. Appendix: Sample Data Structure

### 8.1 Complete Major Works Example

```json
{
  "id": "1",
  "title": "Riverside Roof",
  "estate": "Burns Court",
  "building": "Riverside Block",
  "location": "Riverside Apartments - 45 Thames Street, London, SE1 9RY",
  "managementFee": 40500,
  "totalCost": 450000,
  "propertyManager": "Sarah Mitchell",
  "stage": "Notice of intention",
  "createdAt": "2024-01-15T09:00:00Z",
  "isNew": false,
  "stageCompletion": {
    "notice-of-intention": true,
    "tender": false,
    "estimates": false,
    "reasons": false,
    "completion": false
  },
  "linkedIssues": ["1", "2"],
  "uploadedFiles": [
    {
      "id": "1",
      "name": "Notice_of_Intention.pdf",
      "size": 245000,
      "uploadedAt": "2024-01-15",
      "stage": "notice-of-intention",
      "type": "application/pdf"
    },
    {
      "id": "2",
      "name": "Resident_Letter.pdf",
      "size": 180000,
      "uploadedAt": "2024-01-15",
      "stage": "notice-of-intention",
      "type": "application/pdf"
    }
  ],
  "formData": {
    "projectName": "Riverside Roof",
    "estate": "Burns Court",
    "building": "Riverside Block",
    "totalCost": "450000",
    "managementFee": "40500",
    "surveyorFee": "",
    "consultationStage": "notice-of-intention",
    "assignedTo": ["Sarah Mitchell", "John Smith"],
    "uploadedFiles": []
  }
}
```

### 8.2 Issue Example

```json
{
  "id": "1",
  "title": "Water leak in communal area",
  "building": "Riverside Heights",
  "status": "Open",
  "issueRef": "#2547"
}
```

### 8.3 Audit Entry Example

```json
{
  "timestamp": "03/03/2026, 14:30:00",
  "action": "Document Uploaded",
  "description": "Uploaded 'Contractor Quote - Emergency Repairs.pdf'",
  "user": "Ahsan Jalil",
  "icon": "Upload"
}
```

---

## Document Control

**Version History:**
- v1.0 (March 2026): Initial comprehensive specification

**Maintained By:** Product Team

**Review Schedule:** Monthly or after major changes

**Contact:** product@fixflo.com (placeholder)

---

**End of Document**
- Personalized recommendations
- Predict timeline delays
- Cost estimation suggestions

**Epic 4: Compliance Checking (1 week)**
- Validate Section 20 requirements
- Check consultation period durations
- Verify notice content requirements
- Flag non-compliant major works
- Generate compliance reports

**Acceptance Criteria:**
- ✓ Stages advance automatically when conditions met
- ✓ OCR accuracy > 95% for typed documents
- ✓ AI responses are contextually relevant
- ✓ Compliance checks catch 100% of violations
- ✓ Deadline reminders sent 7, 3, 1 days before

**Dependencies:** Phase 2 and 3

**Risks:**
- OCR accuracy may vary with document quality
- AI model costs need budgeting
- Compliance rules may change (need flexibility)

---

### Phase 5: Collaboration & Communication
**Priority:** Medium  
**Timeline:** 5-6 weeks  
**Team Size:** 2 Frontend + 2 Backend

**Epic 1: Commenting & Mentions (2 weeks)**
- Add comments to major works
- @mention users in comments
- Comment notifications
- Reply threads
- Rich text editor (bold, italic, links)

**Epic 2: Email Notifications (2 weeks)**
- Configure notification preferences
- Email templates (stage complete, deadline, etc.)
- In-app notification center
- Mark as read/unread
- Notification digest (daily/weekly)

**Epic 3: Activity Feed (1 week)**
- Real-time activity stream
- Filter by major works or user
- Subscribe to specific major works
- Export activity to PDF

**Epic 4: Collaboration Tools (1 week)**
- Assign multiple users to major works
- Team roles (Owner, Contributor, Viewer)
- Permission levels per role
- Share major works via link (with expiry)

**Acceptance Criteria:**
- ✓ Comments appear in real-time
- ✓ Email notifications sent within 1 minute
- ✓ Activity feed updates without refresh
- ✓ Users can control notification frequency
- ✓ Shared links work for external stakeholders

**Dependencies:** Phase 2 (User system required)

**Risks:**
- Real-time features increase server load
- Email deliverability issues (SPF, DKIM)
- Permission complexity may confuse users

---

### Phase 6: Reporting & Analytics
**Priority:** Medium  
**Timeline:** 4-5 weeks  
**Team Size:** 1 Frontend + 1 Backend + 1 Data Analyst

**Epic 1: Dashboard Redesign (2 weeks)**
- Executive dashboard (high-level KPIs)
- Manager dashboard (operational metrics)
- Agent dashboard (personal workload)
- Customizable widgets
- Date range selector

**Epic 2: Report Generation (2 weeks)**
- Pre-built report templates
- Custom report builder (drag & drop)
- Export to PDF, Excel, CSV
- Schedule recurring reports (weekly/monthly)
- Email reports automatically

**Epic 3: Data Visualization (1 week)**
- Charts: Bar, line, pie, scatter
- Stage completion funnel
- Cost vs. budget charts
- Timeline Gantt chart
- Heatmaps (major works by region)

**Acceptance Criteria:**
- ✓ Dashboard loads in < 2 seconds
- ✓ Reports generate in < 10 seconds
- ✓ Charts interactive (click to filter)
- ✓ Scheduled reports deliver on time
- ✓ Data accurate (matches source)

**Dependencies:** Phase 2 (Data required)

**Risks:**
- Large datasets may slow report generation
- Chart library compatibility issues
- Users may request endless custom reports

---

### Phase 7: Mobile Optimization & PWA
**Priority:** Low-Medium  
**Timeline:** 3-4 weeks  
**Team Size:** 2 Frontend

**Epic 1: Responsive Refinement (1 week)**
- Optimize all views for mobile
- Touch-friendly targets (min 44×44px)
- Mobile navigation patterns
- Swipe gestures (optional)

**Epic 2: Progressive Web App (2 weeks)**
- Service worker for offline support
- App manifest (name, icons, theme)
- Installable on home screen
- Offline-first data sync
- Push notifications (mobile)

**Epic 3: Mobile-Specific Features (1 week)**
- Camera integration (document scan)
- Location services (property check-in)
- Biometric authentication (Face ID, fingerprint)
- Optimized image sizes

**Acceptance Criteria:**
- ✓ Works smoothly on iOS and Android
- ✓ Installable as PWA (Lighthouse score > 90)
- ✓ Basic features work offline
- ✓ Camera capture works for documents
- ✓ Touch targets easy to tap (no mis-taps)

**Dependencies:** Phase 2 (Backend APIs)

**Risks:**
- PWA support varies by browser
- Offline sync complex (conflict resolution)
- iOS PWA limitations vs. Android

---

### Phase 8: Advanced Integrations
**Priority:** Low  
**Timeline:** 6-8 weeks  
**Team Size:** 2 Backend + 1 Frontend

**Epic 1: Calendar Integration (2 weeks)**
- Sync deadlines to Google Calendar, Outlook
- Create events for stage deadlines
- Recurring event support
- Calendar view in app

**Epic 2: Email Integration (2 weeks)**
- Send notices via email (Sendgrid, AWS SES)
- Email templates for Section 20 notices
- Track email opens and clicks
- Reply-to email address handling

**Epic 3: Document Management Integration (2 weeks)**
- Integrate with SharePoint, Google Drive, Dropbox
- Two-way sync of documents
- Version control
- Access control synchronization

**Epic 4: Property Management System Integration (2 weeks)**
- API integration with external PMS (e.g., MRI, Yardi)
- Import properties and residents
- Sync major works status
- Export invoices

**Acceptance Criteria:**
- ✓ Calendar events sync both ways
- ✓ Emails send with 99.9% deliverability
- ✓ Documents accessible from external systems
- ✓ PMS data syncs hourly
- ✓ No duplicate entries

**Dependencies:** Phase 2 (API foundation)

**Risks:**
- Third-party API rate limits
- Authentication complexity (OAuth)
- Data format mismatches

---

### Phase 9: Performance & Scalability
**Priority:** Critical (for production)  
**Timeline:** 4-5 weeks  
**Team Size:** 2 Backend + 1 DevOps + 1 Frontend

**Epic 1: Database Optimization (2 weeks)**
- Query optimization (indexes, joins)
- Database connection pooling
- Read replicas for scaling
- Caching layer (Redis)
- Query monitoring and alerting

**Epic 2: Frontend Performance (1 week)**
- Code splitting by route
- Lazy loading components
- Image optimization (WebP, responsive images)
- Memoization (React.memo, useMemo)
- Bundle size reduction

**Epic 3: API Performance (1 week)**
- Response caching (HTTP caching headers)
- Pagination for large datasets
- GraphQL (optional, vs. REST)
- API rate limiting
- Load balancing

**Epic 4: Monitoring & Logging (1 week)**
- Application monitoring (Datadog, New Relic)
- Error tracking (Sentry)
- Performance metrics (Core Web Vitals)
- User analytics (Google Analytics, Mixpanel)
- Uptime monitoring

**Acceptance Criteria:**
- ✓ Page load time < 2 seconds
- ✓ API response time < 500ms (p95)
- ✓ Supports 1000+ concurrent users
- ✓ Database queries < 100ms (p95)
- ✓ Zero downtime during deployments

**Dependencies:** Phase 2 (Backend exists)

**Risks:**
- Optimization may require architecture changes
- Caching introduces complexity (cache invalidation)
- Monitoring costs scale with usage

---

### Phase 10: Security Hardening
**Priority:** Critical (before production)  
**Timeline:** 3-4 weeks  
**Team Size:** 1 Security Engineer + 1 Backend

**Epic 1: Security Audit (1 week)**
- Penetration testing
- Vulnerability scanning
- Code review (security focus)
- Dependency audit (npm audit)
- Compliance check (GDPR, SOC 2)

**Epic 2: Security Enhancements (2 weeks)**
- SQL injection prevention (parameterized queries)
- XSS protection (input sanitization)
- CSRF protection (tokens)
- Rate limiting (prevent brute force)
- Secure headers (HSTS, CSP, X-Frame-Options)

**Epic 3: Data Protection (1 week)**
- Encryption at rest (database)
- Encryption in transit (TLS 1.3)
- PII data handling (GDPR compliance)
- Data retention policies
- Right to be forgotten implementation

**Acceptance Criteria:**
- ✓ Zero critical vulnerabilities (pen test)
- ✓ OWASP Top 10 mitigated
- ✓ All data encrypted
- ✓ GDPR compliant (data export, deletion)
- ✓ Security headers score A+ (securityheaders.com)

**Dependencies:** Phase 2 (Backend exists)

**Risks:**
- Fixing vulnerabilities may break features
- Compliance requirements vary by region
- Security is ongoing, not one-time

---

## 9. Feature Dependencies Map

### Dependency Visualization

```
Phase 1 (Prototype) ✅
    ↓
Phase 2 (Backend + Auth) ← Required for all subsequent phases
    ↓
    ├──→ Phase 3 (Enhanced Management)
    ├──→ Phase 4 (Automation + AI)
    ├──→ Phase 5 (Collaboration)
    ├──→ Phase 7 (Mobile/PWA)
    └──→ Phase 8 (Integrations)
    
Phase 3 + Phase 4
    ↓
Phase 6 (Reporting)

Phase 2
    ↓
Phase 9 (Performance) ← Should run before production
    ↓
Phase 10 (Security) ← Must run before production
```

### Critical Path

**Minimum Viable Product (MVP):**
1. Phase 1 ✅ (Complete)
2. Phase 2 (Backend + Auth)
3. Phase 3 (Enhanced Management)
4. Phase 9 (Performance)
5. Phase 10 (Security)

**Timeline:** ~18-20 weeks

**Enhanced Product (v1.0):**
- MVP + Phase 4 (Automation) + Phase 5 (Collaboration) + Phase 6 (Reporting)

**Timeline:** ~30-35 weeks

**Full Feature Set (v2.0):**
- All phases except optional ones (Phase 8 integrations can be deferred)

**Timeline:** ~45-50 weeks

---

## 8. Appendix: Sample Data Structure

### 8.1 Complete Major Works Example

```json
{
  "id": "1",
  "title": "Riverside Roof",
  "estate": "Burns Court",
  "building": "Riverside Block",
  "location": "Riverside Apartments - 45 Thames Street, London, SE1 9RY",
  "managementFee": 40500,
  "totalCost": 450000,
  "propertyManager": "Sarah Mitchell",
  "stage": "Notice of intention",
  "createdAt": "2024-01-15T09:00:00Z",
  "isNew": false,
  "stageCompletion": {
    "notice-of-intention": true,
    "tender": false,
    "estimates": false,
    "reasons": false,
    "completion": false
  },
  "linkedIssues": ["1", "2"],
  "uploadedFiles": [
    {
      "id": "1",
      "name": "Notice_of_Intention.pdf",
      "size": 245000,
      "uploadedAt": "2024-01-15",
      "stage": "notice-of-intention",
      "type": "application/pdf"
    },
    {
      "id": "2",
      "name": "Resident_Letter.pdf",
      "size": 180000,
      "uploadedAt": "2024-01-15",
      "stage": "notice-of-intention",
      "type": "application/pdf"
    }
  ],
  "formData": {
    "projectName": "Riverside Roof",
    "estate": "Burns Court",
    "building": "Riverside Block",
    "totalCost": "450000",
    "managementFee": "40500",
    "surveyorFee": "",
    "consultationStage": "notice-of-intention",
    "assignedTo": ["Sarah Mitchell", "John Smith"],
    "uploadedFiles": []
  }
}
```

### 8.2 Issue Example

```json
{
  "id": "1",
  "title": "Water leak in communal area",
  "building": "Riverside Heights",
  "status": "Open",
  "issueRef": "#2547"
}
```

### 8.3 Audit Entry Example

```json
{
  "timestamp": "03/03/2026, 14:30:00",
  "action": "Document Uploaded",
  "description": "Uploaded 'Contractor Quote - Emergency Repairs.pdf'",
  "user": "Ahsan Jalil",
  "icon": "Upload"
}
```

---

## Document Control

**Version History:**
- v1.0 (March 2026): Initial comprehensive specification

**Maintained By:** Product Team

**Review Schedule:** Monthly or after major changes

**Contact:** product@fixflo.com (placeholder)

---

**End of Document**
