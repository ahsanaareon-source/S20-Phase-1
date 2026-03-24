import { useState } from 'react';
import { Search, Download, ChevronLeft, ChevronRight, Plus, ArrowUpDown, ArrowUp, ArrowDown, Archive, Filter } from 'lucide-react';

interface MajorWork {
  id: string;
  title: string;
  estate: string;
  building: string;
  location: string;
  managementFee: number; // Management fee in pounds
  totalCost: number; // Total cost inc VAT in pounds
  propertyManager: string;
  stage: string;
  status: string;
}

interface MajorWorksListProps {
  onCreateNew: () => void;
  onViewDetail: (work: any) => void;
  majorWorks: any[];
}

type SortField = 'title' | 'estate' | 'building' | 'managementFee' | 'totalCost';
type SortDirection = 'asc' | 'desc' | null;

// Column visibility configuration
interface ColumnConfig {
  id: string;
  label: string;
  visible: boolean;
}

export default function MajorWorksList({ onCreateNew, onViewDetail, majorWorks: majorWorksFromProps }: MajorWorksListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [estateFilter, setEstateFilter] = useState('all');
  const [buildingFilter, setBuildingFilter] = useState('all');
  const [propertyManagerFilter, setPropertyManagerFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageState, setItemsPerPageState] = useState(10);
  const [sortField, setSortField] = useState<SortField>('managementFee'); // Default sort by management fee
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc'); // Highest first
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [workToArchive, setWorkToArchive] = useState<any>(null);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  // Column visibility state
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: 'majorWorks', label: 'Major works', visible: true },
    { id: 'buildingEstate', label: 'Building / Estate', visible: true },
    { id: 'managementFee', label: 'Management fee', visible: true },
    { id: 'estimatedBudget', label: 'Estimated budget', visible: true },
    { id: 'status', label: 'Status', visible: true },
  ]);

  // Toggle column visibility
  const toggleColumn = (columnId: string) => {
    setColumns(columns.map(col => 
      col.id === columnId ? { ...col, visible: !col.visible } : col
    ));
  };

  // Helper function to get status from stage completion
  const getStatusFromStages = (stageCompletion: any) => {
    if (!stageCompletion) return 'Not Started';
    
    const stages = [
      { id: 'notice-of-intention', name: 'Notice of Intention' },
      { id: 'tender', name: 'Tender' },
      { id: 'estimates', name: 'Estimates' },
      { id: 'reasons', name: 'Reasons' },
      { id: 'completion', name: 'Completion' }
    ];
    
    // Check if completion stage is complete
    if (stageCompletion['completion']) {
      return 'Completed';
    }
    
    // Find the last completed stage
    for (let i = stages.length - 1; i >= 0; i--) {
      if (stageCompletion[stages[i].id]) {
        return stages[i].name;
      }
    }
    
    return 'Not Started';
  };

  // Sample data - Phase 1 structure with realistic ongoing projects
  const sampleMajorWorks: any[] = [
    {
      id: '1',
      title: 'Riverside Roof',
      estate: 'Burns Court',
      building: 'Riverside Block',
      location: 'Riverside Apartments - 45 Thames Street, London, SE1 9RY',
      managementFee: 40500,
      totalCost: 450000,
      propertyManager: 'Sarah Mitchell',
      stage: 'Notice of intention',
      status: 'Active',
      stageCompletion: {
        'notice-of-intention': true,
        'tender': false,
        'estimates': false,
        'reasons': false,
        'completion': false
      },
      linkedIssues: ['1', '2'],
      uploadedFiles: [
        { id: '1', name: 'Notice_of_Intention.pdf', size: 245000, uploadedAt: '2024-01-15', stage: 'notice-of-intention' },
        { id: '2', name: 'Resident_Letter.pdf', size: 180000, uploadedAt: '2024-01-15', stage: 'notice-of-intention' }
      ]
    },
    {
      id: '2',
      title: 'Developer Cladding Project Tracking Eastside',
      estate: 'Burns Court',
      building: 'Parkview Block',
      location: 'Riverside Apartments - 45 Thames Street, London, SE1 9RY',
      managementFee: 28000,
      totalCost: 280000,
      propertyManager: 'Michael Thompson',
      stage: 'Estimates',
      status: 'Active',
      stageCompletion: {
        'notice-of-intention': true,
        'tender': true,
        'estimates': true,
        'reasons': false,
        'completion': false
      },
      linkedIssues: ['3'],
      uploadedFiles: [
        { id: '1', name: 'Initial_Notice.pdf', size: 310000, uploadedAt: '2023-11-20', stage: 'notice-of-intention' },
        { id: '2', name: 'Tender_Documents.pdf', size: 580000, uploadedAt: '2024-01-05', stage: 'tender' },
        { id: '3', name: 'Contractor_Estimates.xlsx', size: 125000, uploadedAt: '2024-02-10', stage: 'estimates' },
        { id: '4', name: 'Cost_Breakdown.pdf', size: 420000, uploadedAt: '2024-02-10', stage: 'estimates' }
      ]
    },
    {
      id: '3',
      title: 'RSF Project Tracking Legacy House',
      estate: 'Riverside Apartments',
      building: 'Central Tower',
      location: 'Riverside Apartments - 45 Thames Street, London, SE1 9RY',
      managementFee: 52000,
      totalCost: 520000,
      propertyManager: 'Sarah Mitchell',
      stage: 'Reasons',
      status: 'Active',
      stageCompletion: {
        'notice-of-intention': true,
        'tender': true,
        'estimates': true,
        'reasons': true,
        'completion': false
      },
      linkedIssues: ['1', '4', '5'],
      uploadedFiles: [
        { id: '1', name: 'Section20_Notice.pdf', size: 340000, uploadedAt: '2023-09-15', stage: 'notice-of-intention' },
        { id: '2', name: 'Tender_Pack.pdf', size: 890000, uploadedAt: '2023-11-01', stage: 'tender' },
        { id: '3', name: 'Estimates_Summary.pdf', size: 275000, uploadedAt: '2023-12-18', stage: 'estimates' },
        { id: '4', name: 'Reasons_Statement.pdf', size: 195000, uploadedAt: '2024-01-22', stage: 'reasons' },
        { id: '5', name: 'Resident_Responses.pdf', size: 450000, uploadedAt: '2024-01-22', stage: 'reasons' }
      ]
    },
    {
      id: '4',
      title: 'Cladding Project Dockside',
      estate: 'Parkside Estate',
      building: 'Tower A',
      location: 'Riverside Apartments - 45 Thames Street, London, SE1 9RY',
      managementFee: 18500,
      totalCost: 185000,
      propertyManager: 'Emma Evans',
      stage: 'Tender',
      status: 'On hold',
      stageCompletion: {
        'notice-of-intention': true,
        'tender': true,
        'estimates': false,
        'reasons': false,
        'completion': false
      },
      linkedIssues: ['2'],
      uploadedFiles: [
        { id: '1', name: 'Project_Notice.pdf', size: 280000, uploadedAt: '2024-01-08', stage: 'notice-of-intention' },
        { id: '2', name: 'Tender_Brief.pdf', size: 510000, uploadedAt: '2024-01-30', stage: 'tender' },
        { id: '3', name: 'Site_Survey.pdf', size: 725000, uploadedAt: '2024-01-30', stage: 'tender' }
      ]
    },
    {
      id: '5',
      title: 'Car Lift A - Refurbishment',
      estate: 'Westside Towers',
      building: 'Tower B',
      location: 'Riverside Apartments - 45 Thames Street, London, SE1 9RY',
      managementFee: 12000,
      totalCost: 120000,
      propertyManager: 'James Cooper',
      stage: 'Completion',
      status: 'Completed',
      stageCompletion: {
        'notice-of-intention': true,
        'tender': true,
        'estimates': true,
        'reasons': true,
        'completion': true
      },
      linkedIssues: ['6'],
      uploadedFiles: [
        { id: '1', name: 'Initial_Notice.pdf', size: 190000, uploadedAt: '2023-06-12', stage: 'notice-of-intention' },
        { id: '2', name: 'Tender_Documentation.pdf', size: 420000, uploadedAt: '2023-07-20', stage: 'tender' },
        { id: '3', name: 'Final_Estimates.pdf', size: 315000, uploadedAt: '2023-08-25', stage: 'estimates' },
        { id: '4', name: 'Selection_Reasons.pdf', size: 240000, uploadedAt: '2023-09-15', stage: 'reasons' },
        { id: '5', name: 'Completion_Certificate.pdf', size: 180000, uploadedAt: '2024-01-30', stage: 'completion' },
        { id: '6', name: 'Final_Invoice.pdf', size: 350000, uploadedAt: '2024-01-30', stage: 'completion' }
      ]
    },
    {
      id: '6',
      title: 'External Facade Works',
      estate: 'Burns Court',
      building: 'Riverside Block',
      location: 'Riverside Apartments - 45 Thames Street, London, SE1 9RY',
      managementFee: 8000,
      totalCost: 80000,
      propertyManager: 'Michael Thompson',
      stage: 'Not Started',
      status: 'Delayed',
      stageCompletion: {
        'notice-of-intention': false,
        'tender': false,
        'estimates': false,
        'reasons': false,
        'completion': false
      },
      linkedIssues: [],
      uploadedFiles: []
    },
    {
      id: '7',
      title: 'Window Replacement Programme',
      estate: 'Riverside Apartments',
      building: 'Parkview Block',
      location: 'Riverside Apartments - 45 Thames Street, London, SE1 9RY',
      managementFee: 35000,
      totalCost: 350000,
      propertyManager: 'Sarah Mitchell',
      stage: 'Estimates',
      status: 'Active',
      stageCompletion: {
        'notice-of-intention': true,
        'tender': true,
        'estimates': true,
        'reasons': false,
        'completion': false
      },
      linkedIssues: ['3', '4'],
      uploadedFiles: [
        { id: '1', name: 'S20_Notice.pdf', size: 265000, uploadedAt: '2023-12-01', stage: 'notice-of-intention' },
        { id: '2', name: 'Tender_Pack.pdf', size: 690000, uploadedAt: '2024-01-12', stage: 'tender' },
        { id: '3', name: 'Quote_Comparison.xlsx', size: 145000, uploadedAt: '2024-02-05', stage: 'estimates' }
      ]
    },
    {
      id: '8',
      title: 'Communal Heating System Upgrade',
      estate: 'Parkside Estate',
      building: 'Central Tower',
      location: 'Riverside Apartments - 45 Thames Street, London, SE1 9RY',
      managementFee: 42000,
      totalCost: 420000,
      propertyManager: 'Emma Evans',
      stage: 'Tender',
      status: 'Active',
      stageCompletion: {
        'notice-of-intention': true,
        'tender': true,
        'estimates': false,
        'reasons': false,
        'completion': false
      },
      linkedIssues: ['5'],
      uploadedFiles: [
        { id: '1', name: 'Project_Notice.pdf', size: 320000, uploadedAt: '2024-01-05', stage: 'notice-of-intention' },
        { id: '2', name: 'Technical_Specification.pdf', size: 840000, uploadedAt: '2024-02-01', stage: 'tender' }
      ]
    },
    {
      id: '9',
      title: 'Fire Safety Compliance Works',
      estate: 'Westside Towers',
      building: 'Tower A',
      location: 'Riverside Apartments - 45 Thames Street, London, SE1 9RY',
      managementFee: 25000,
      totalCost: 250000,
      propertyManager: 'James Cooper',
      stage: 'Reasons',
      status: 'Active',
      stageCompletion: {
        'notice-of-intention': true,
        'tender': true,
        'estimates': true,
        'reasons': true,
        'completion': false
      },
      linkedIssues: ['1', '2', '3'],
      uploadedFiles: [
        { id: '1', name: 'Initial_Consultation.pdf', size: 295000, uploadedAt: '2023-10-10', stage: 'notice-of-intention' },
        { id: '2', name: 'Tender_Brief.pdf', size: 520000, uploadedAt: '2023-11-15', stage: 'tender' },
        { id: '3', name: 'Contractor_Quotes.pdf', size: 380000, uploadedAt: '2023-12-20', stage: 'estimates' },
        { id: '4', name: 'Award_Justification.pdf', size: 215000, uploadedAt: '2024-01-18', stage: 'reasons' }
      ]
    },
    {
      id: '10',
      title: 'Roof Waterproofing Project',
      estate: 'Burns Court',
      building: 'Tower B',
      location: 'Riverside Apartments - 45 Thames Street, London, SE1 9RY',
      managementFee: 48000,
      totalCost: 480000,
      propertyManager: 'Sarah Mitchell',
      stage: 'Notice of Intention',
      status: 'Active',
      stageCompletion: {
        'notice-of-intention': true,
        'tender': false,
        'estimates': false,
        'reasons': false,
        'completion': false
      },
      linkedIssues: ['4'],
      uploadedFiles: [
        { id: '1', name: 'Section_20_Notice.pdf', size: 355000, uploadedAt: '2024-02-01', stage: 'notice-of-intention' }
      ]
    }
  ];

  // Merge sample data with real major works data
  const majorWorks = [...sampleMajorWorks, ...majorWorksFromProps];

  // Sorting function
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction or reset
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        // Reset to default
        setSortField('managementFee');
        setSortDirection('desc');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Apply filters
  const filteredWorks = majorWorks.filter(work => {
    const matchesSearch = work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         work.estate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         work.building.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstate = estateFilter === 'all' || work.estate === estateFilter;
    const matchesBuilding = buildingFilter === 'all' || work.building === buildingFilter;
    const matchesManager = propertyManagerFilter === 'all' || work.propertyManager === propertyManagerFilter;
    
    return matchesSearch && matchesEstate && matchesBuilding && matchesManager;
  });

  // Sort the data - default to highest management fee first
  const sortedWorks = [...filteredWorks].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    // Handle string comparison
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  const totalPages = Math.ceil(sortedWorks.length / itemsPerPageState);
  const startIndex = (currentPage - 1) * itemsPerPageState;
  const endIndex = startIndex + itemsPerPageState;
  const currentItems = sortedWorks.slice(startIndex, endIndex);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Render sort icon
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown size={14} className="ms-1 text-muted" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp size={14} className="ms-1" />;
    }
    return <ArrowDown size={14} className="ms-1" />;
  };

  // Handle archive click
  const handleArchiveClick = (work: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setWorkToArchive(work);
    setShowArchiveModal(true);
  };

  // Handle confirm archive
  const handleConfirmArchive = () => {
    // Archive functionality would be implemented here
    console.log('Archiving work:', workToArchive);
    setShowArchiveModal(false);
    setWorkToArchive(null);
  };

  // Handle cancel archive
  const handleCancelArchive = () => {
    setShowArchiveModal(false);
    setWorkToArchive(null);
  };

  // Get unique values for filters
  const uniqueEstates = Array.from(new Set(majorWorks.map(w => w.estate)));
  const uniqueBuildings = Array.from(new Set(majorWorks.map(w => w.building)));
  const uniqueManagers = Array.from(new Set(majorWorks.map(w => w.propertyManager)));

  // Helper to check if column is visible
  const isColumnVisible = (columnId: string) => {
    const column = columns.find(col => col.id === columnId);
    return column?.visible ?? true;
  };

  // Calculate column widths dynamically based on visible columns
  const getColumnClass = (columnId: string) => {
    const visibleCount = columns.filter(col => col.visible).length;
    
    // If all 5 columns are visible, use original layout
    if (visibleCount === 5) {
      if (columnId === 'majorWorks' || columnId === 'buildingEstate') return 'col-3';
      return 'col-2';
    }
    
    // Otherwise, distribute width evenly
    const baseWidth = Math.floor(12 / visibleCount);
    return `col-${baseWidth}`;
  };

  return (
    <div className="container-fluid p-4">
      {/* Action Buttons */}
      <div className="d-flex justify-content-end gap-2 mb-4">
        <button 
          className="btn btn-outline-primary d-flex align-items-center gap-2"
        >
          <Download size={18} />
          Download report
        </button>
        <button 
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={onCreateNew}
        >
          <Plus size={18} />
          New major works
        </button>
      </div>

      {/* KPI Cards - Summary Statistics */}
      <div className="row g-3 mb-4">
        {/* Major Works Summary */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="text-muted small">Major Works</span>
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    backgroundColor: '#E3F2FD'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
              </div>
              <div className="d-flex gap-4 align-items-baseline justify-content-between">
                <div>
                  <div className="h4 mb-0 fw-bold">{majorWorks.length}</div>
                  <div className="text-muted small">Total</div>
                </div>
                <div>
                  <div className="h4 mb-0">{majorWorks.filter(w => getStatusFromStages(w.stageCompletion) === 'In Progress').length}</div>
                  <div className="text-muted small">In progress</div>
                </div>
                <div>
                  <div className="h4 mb-0">{majorWorks.filter(w => getStatusFromStages(w.stageCompletion) === 'Completed').length}</div>
                  <div className="text-muted small">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Estimated Cost */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="text-muted small">Total Estimated Cost</span>
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    backgroundColor: '#E8F5E9'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
              </div>
              <div className="h2 mb-1 fw-bold">
                {new Intl.NumberFormat('en-GB', {
                  style: 'currency',
                  currency: 'GBP',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                  notation: 'compact',
                  compactDisplay: 'short'
                }).format(majorWorks.reduce((sum, w) => sum + (w.totalCost || 0), 0))}
              </div>
              <div className="text-muted small">(inc. VAT)</div>
              <div className="text-muted small">Across all major works</div>
            </div>
          </div>
        </div>

        {/* Total Estimated Fee */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="text-muted small">Total Estimated Fee</span>
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    backgroundColor: '#E8F5E9'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
              </div>
              <div className="h2 mb-1 fw-bold">
                {new Intl.NumberFormat('en-GB', {
                  style: 'currency',
                  currency: 'GBP',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                  notation: 'compact',
                  compactDisplay: 'short'
                }).format(majorWorks.reduce((sum, w) => sum + (w.managementFee || 0), 0))}
              </div>
              <div className="text-muted small">(inc. VAT)</div>
              <div className="text-muted small">Across all major works</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and search - Phase 1: Estate, Building, Property Manager only */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <select 
                className="form-select"
                value={estateFilter}
                onChange={(e) => setEstateFilter(e.target.value)}
              >
                <option value="all">All estates</option>
                {uniqueEstates.map((estate, index) => (
                  <option key={`estate-${index}-${estate}`} value={estate}>{estate}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <select 
                className="form-select"
                value={buildingFilter}
                onChange={(e) => setBuildingFilter(e.target.value)}
              >
                <option value="all">All buildings</option>
                {uniqueBuildings.map((building, index) => (
                  <option key={`building-${index}-${building}`} value={building}>{building}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <select 
                className="form-select"
                value={propertyManagerFilter}
                onChange={(e) => setPropertyManagerFilter(e.target.value)}
              >
                <option value="all">All agents</option>
                {uniqueManagers.map((manager, index) => (
                  <option key={`manager-${index}-${manager}`} value={manager}>{manager}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <div className="d-flex gap-2">
                <div className="input-group flex-grow-1">
                  <span className="input-group-text bg-white border-end-0">
                    <Search size={18} className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search major works..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Filter/Column Toggle Button */}
                <div className="position-relative">
                  <button 
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                    onClick={() => setShowColumnMenu(!showColumnMenu)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    style={{ 
                      width: '42px',
                      height: '42px',
                      padding: '0',
                      border: '1px solid #dee2e6',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <Filter size={20} style={{ color: '#6c757d' }} />
                  </button>
                  
                  {/* Column Visibility Dropdown */}
                  {showColumnMenu && (
                    <>
                      <div 
                        className="position-fixed top-0 start-0 w-100 h-100" 
                        style={{ zIndex: 1040 }}
                        onClick={() => setShowColumnMenu(false)}
                      />
                      <div 
                        className="card position-absolute shadow-lg border"
                        style={{ 
                          top: '100%',
                          right: 0,
                          marginTop: '8px',
                          minWidth: '280px',
                          zIndex: 1050
                        }}
                      >
                        <div className="card-body p-3">
                          <h6 className="mb-3 fw-bold" style={{ fontSize: '14px' }}>Show/hide columns</h6>
                          
                          {columns.map((column) => (
                            <div 
                              key={column.id}
                              className="form-check mb-2"
                              style={{ paddingLeft: '0' }}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={column.visible}
                                onChange={() => toggleColumn(column.id)}
                                id={`column-${column.id}`}
                                style={{ 
                                  cursor: 'pointer',
                                  marginLeft: '0',
                                  float: 'none',
                                  accentColor: '#0B81C5'
                                }}
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor={`column-${column.id}`}
                                style={{ 
                                  cursor: 'pointer',
                                  fontSize: '14px',
                                  userSelect: 'none'
                                }}
                              >
                                {column.label}
                              </label>
                            </div>
                          ))}
                          
                          {/* Separator */}
                          <hr className="my-3" />
                          
                          {/* Show Archived Option */}
                          <div 
                            className="form-check"
                            style={{ paddingLeft: '0' }}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={showArchived}
                              onChange={() => setShowArchived(!showArchived)}
                              id="show-archived"
                              style={{ 
                                cursor: 'pointer',
                                marginLeft: '0',
                                float: 'none',
                                accentColor: '#0B81C5'
                              }}
                            />
                            <label
                              className="form-check-label ms-2"
                              htmlFor="show-archived"
                              style={{ 
                                cursor: 'pointer',
                                fontSize: '14px',
                                userSelect: 'none'
                              }}
                            >
                              Show archived works
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table - Phase 1: Project name, Building/estate, Management fee, Estimated budget, Status */}
      <div>
        {/* Table Headers */}
        <div className="row g-0 bg-light py-3 px-4 mx-0 rounded-top border fw-bold mb-2" style={{ fontSize: '14px' }}>
          {isColumnVisible('majorWorks') && (
            <div className={getColumnClass('majorWorks')} style={{ cursor: 'pointer' }} onClick={() => handleSort('title')}>
              <span className="d-flex align-items-center">
                Major works
                {renderSortIcon('title')}
              </span>
            </div>
          )}
          {isColumnVisible('buildingEstate') && (
            <div className={getColumnClass('buildingEstate')} style={{ cursor: 'pointer' }} onClick={() => handleSort('estate')}>
              <span className="d-flex align-items-center">
                Building / Estate
                {renderSortIcon('estate')}
              </span>
            </div>
          )}
          {isColumnVisible('managementFee') && (
            <div className={getColumnClass('managementFee')} style={{ cursor: 'pointer' }} onClick={() => handleSort('managementFee')}>
              <span className="d-flex align-items-center">
                Management fee
                {renderSortIcon('managementFee')}
              </span>
            </div>
          )}
          {isColumnVisible('estimatedBudget') && (
            <div className={getColumnClass('estimatedBudget')} style={{ cursor: 'pointer' }} onClick={() => handleSort('totalCost')}>
              <span className="d-flex align-items-center">
                Estimated budget
                {renderSortIcon('totalCost')}
              </span>
            </div>
          )}
          {isColumnVisible('status') && (
            <div className={getColumnClass('status')}>
              <span className="d-flex align-items-center">
                Status
              </span>
            </div>
          )}
        </div>
        
        {/* Table Rows */}
        <div>
          {currentItems.map((work) => {
            // Get status badge styling
            const getStatusBadgeStyle = (status: string) => {
              const statusLower = status.toLowerCase();
              if (statusLower === 'completed') {
                return { backgroundColor: '#0B81C5', color: 'white' };
              } else if (statusLower === 'active' || statusLower === 'in progress') {
                return { backgroundColor: '#28a745', color: 'white' };
              } else if (statusLower === 'on hold') {
                return { backgroundColor: '#6c757d', color: 'white' };
              } else if (statusLower === 'delayed') {
                return { backgroundColor: '#ffc107', color: '#212529' };
              } else if (statusLower === 'cancelled') {
                return { backgroundColor: '#dc3545', color: 'white' };
              } else {
                return { backgroundColor: '#e9ecef', color: '#212529' };
              }
            };

            return (
              <div 
                key={work.id}
                className="card mb-2 shadow-sm border"
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => onViewDetail(work)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                }}
              >
                <div className="card-body py-3 px-4">
                  <div className="row g-0 align-items-center">
                    {isColumnVisible('majorWorks') && (
                      <div className={getColumnClass('majorWorks')}>
                        <div className="fw-medium">{work.title}</div>
                      </div>
                    )}
                    {isColumnVisible('buildingEstate') && (
                      <div className={getColumnClass('buildingEstate')}>
                        <div className="fw-medium">{work.estate}</div>
                        <div className="text-muted small">{work.building}</div>
                      </div>
                    )}
                    {isColumnVisible('managementFee') && (
                      <div className={getColumnClass('managementFee')}>
                        <span className="fw-semibold text-success">{formatCurrency(work.managementFee)}</span>
                      </div>
                    )}
                    {isColumnVisible('estimatedBudget') && (
                      <div className={getColumnClass('estimatedBudget')}>
                        <span className="fw-semibold">{formatCurrency(work.totalCost)}</span>
                      </div>
                    )}
                    {isColumnVisible('status') && (
                      <div className="col-1">
                        <span 
                          className="badge px-2 py-1 rounded-pill" 
                          style={{ 
                            ...getStatusBadgeStyle(work.status || 'Active'),
                            fontSize: '12px' 
                          }}
                        >
                          {work.status || 'Active'}
                        </span>
                      </div>
                    )}
                    <div className="col-1 text-end">
                      <button 
                        className="btn btn-sm"
                        onClick={(e) => handleArchiveClick(work, e)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#212529';
                          e.currentTarget.style.backgroundColor = '#e9ecef';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#6c757d';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        style={{ 
                          color: '#6c757d',
                          border: 'none',
                          background: 'transparent',
                          transition: 'all 0.2s'
                        }}
                        title="Archive"
                      >
                        <Archive size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="card bg-white border shadow-sm rounded mt-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted" style={{ fontSize: '14px' }}>
                Total <strong>{sortedWorks.length}</strong> items
              </div>
              
              <div className="d-flex align-items-center gap-2">
                <nav>
                  <ul className="pagination mb-0" style={{ fontSize: '14px' }}>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        style={{ 
                          padding: '6px 12px',
                          height: '34px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft size={16} />
                      </button>
                    </li>
                    
                    {/* Current page button */}
                    <li className="page-item active">
                      <button 
                        className="page-link" 
                        style={{ 
                          padding: '6px 12px',
                          height: '34px',
                          minWidth: '40px',
                          backgroundColor: '#3b82c4',
                          borderColor: '#3b82c4',
                          color: '#fff'
                        }}
                      >
                        {currentPage}
                      </button>
                    </li>
                    
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        style={{ 
                          padding: '6px 12px',
                          height: '34px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </li>
                  </ul>
                </nav>
                
                <select 
                  className="form-select" 
                  style={{ width: '120px', fontSize: '14px', padding: '6px 30px 6px 12px', height: '34px' }}
                  value={itemsPerPageState}
                  onChange={(e) => {
                    setItemsPerPageState(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={10}>10 / page</option>
                  <option value={25}>25 / page</option>
                  <option value={50}>50 / page</option>
                  <option value={100}>100 / page</option>
                </select>
                
                <div className="d-flex align-items-center gap-2">
                  <span style={{ fontSize: '14px' }}>Go to</span>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ width: '60px', fontSize: '14px', padding: '4px 10px' }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const page = parseInt((e.target as HTMLInputElement).value);
                        if (page >= 1 && page <= totalPages) {
                          setCurrentPage(page);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Archive Confirmation Modal */}
      {showArchiveModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Archive Major Works</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={handleCancelArchive}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to archive <strong>{workToArchive?.title}</strong>?</p>
                <p className="text-muted small mb-0">
                  To restore this major work, you will need to contact the technical support team.
                </p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={handleCancelArchive}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn d-flex align-items-center gap-2"
                  style={{ backgroundColor: '#0B81C5', color: 'white' }}
                  onClick={handleConfirmArchive}
                >
                  <Archive size={18} />
                  Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}