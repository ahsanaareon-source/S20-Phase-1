import { useState } from 'react';
import { Download, MapPin, CheckCircle, Upload, Link as LinkIcon, ExternalLink, X as XIcon, Clock, Eye, Trash2, Edit, Plus } from 'lucide-react';
import AuditLog from './AuditLog';

interface MajorWorksDetailProps {
  work: {
    id: string;
    title: string;
    estate?: string;
    building?: string;
    location: string;
    managementFee?: number;
    totalCost?: number;
    isNew?: boolean;
    formData?: any;
    stageCompletion?: any;
  };
  onBack: () => void;
  onUpdateTimeline: (workId: string, stageCompletion: any) => void;
  onEdit?: () => void;
}

export default function MajorWorksDetail({ work, onBack, onUpdateTimeline, onEdit }: MajorWorksDetailProps) {
  // Phase 1: 4 tabs - Overview, Issues, Documents, Audit Log
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStage, setSelectedStage] = useState('notice-of-intention');
  const [uploadedFiles, setUploadedFiles] = useState<any[]>(work.uploadedFiles || []);
  const [isDragging, setIsDragging] = useState(false);
  const [linkedIssues, setLinkedIssues] = useState<string[]>(work.linkedIssues || []);
  const [showLinkIssueModal, setShowLinkIssueModal] = useState(false);
  const [issueSearchQuery, setIssueSearchQuery] = useState('');
  const [selectedIssuesToLink, setSelectedIssuesToLink] = useState<string[]>([]);
  const [showLowestQuoteModal, setShowLowestQuoteModal] = useState(false);
  const [reasonsStageName, setReasonsStageName] = useState('Notice of reasons');
  
  // Standard Section 20 stages - Phase 1: Manual checkboxes only
  const [stageCompletion, setStageCompletion] = useState(
    work.stageCompletion || {
      'notice-of-intention': false,
      'tender': false,
      'estimates': false,
      'reasons': false,
      'completion': false
    }
  );

  const stages = [
    { id: 'notice-of-intention', name: 'Notice of intention' },
    { id: 'tender', name: 'Tenders' },
    { id: 'estimates', name: 'Statement of estimate' },
    { id: 'reasons', name: reasonsStageName },
    { id: 'completion', name: 'Completion' }
  ];

  // Sample issues for demonstration - organized by building
  const allIssues = [
    // Riverside Heights
    { id: '1', title: 'Water leak in communal area', building: 'Riverside Heights', status: 'Open', issueRef: '#2547' },
    { id: '2', title: 'Structural cracks in external walls', building: 'Riverside Heights', status: 'In Progress', issueRef: '#2498' },
    { id: '3', title: 'Roof membrane deterioration', building: 'Riverside Heights', status: 'Open', issueRef: '#2521' },
    { id: '4', title: 'Balcony railing corrosion', building: 'Riverside Heights', status: 'Open', issueRef: '#2589' },
    { id: '5', title: 'Communal heating system fault', building: 'Riverside Heights', status: 'In Progress', issueRef: '#2612' },
    { id: '6', title: 'Window frame water ingress', building: 'Riverside Heights', status: 'Open', issueRef: '#2634' },
    
    // Parkview Block
    { id: '7', title: 'Roof tiles missing after storm', building: 'Parkview Block', status: 'In Progress', issueRef: '#2401' },
    { id: '8', title: 'Lift mechanical failure', building: 'Parkview Block', status: 'Open', issueRef: '#2445' },
    { id: '9', title: 'Fire door seal damage', building: 'Parkview Block', status: 'Resolved', issueRef: '#2378' },
    { id: '10', title: 'Drainage system blockage', building: 'Parkview Block', status: 'Open', issueRef: '#2467' },
    
    // Central Tower
    { id: '11', title: 'Cladding inspection required', building: 'Central Tower', status: 'Open', issueRef: '#2301' },
    { id: '12', title: 'Elevator modernization needed', building: 'Central Tower', status: 'In Progress', issueRef: '#2325' },
    { id: '13', title: 'Basement flooding issues', building: 'Central Tower', status: 'Open', issueRef: '#2356' },
    { id: '14', title: 'CCTV system malfunction', building: 'Central Tower', status: 'Resolved', issueRef: '#2289' },
    
    // Tower B
    { id: '15', title: 'Window seal deterioration', building: 'Tower B', status: 'Open', issueRef: '#2201' },
    { id: '16', title: 'Communal lighting upgrade needed', building: 'Tower B', status: 'In Progress', issueRef: '#2234' },
    { id: '17', title: 'Intercom system replacement', building: 'Tower B', status: 'Open', issueRef: '#2267' }
  ];

  // Filter issues based on selected building from the form
  const selectedBuilding = work.building || work.formData?.building || '';
  const availableIssues = allIssues.filter(issue => issue.building === selectedBuilding);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
      uploadedAt: new Date().toISOString().split('T')[0],
      stage: selectedStage,
      type: file.type
    }));

    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const handleStageToggle = (stageId: string) => {
    const stageIndex = stages.findIndex(s => s.id === stageId);
    
    // Check if trying to mark as complete
    const isCurrentlyCompleted = stageCompletion[stageId as keyof typeof stageCompletion];
    
    if (!isCurrentlyCompleted) {
      // Trying to mark as complete - check if previous stages are completed
      if (stageIndex > 0) {
        const previousStage = stages[stageIndex - 1];
        const isPreviousCompleted = stageCompletion[previousStage.id as keyof typeof stageCompletion];
        
        if (!isPreviousCompleted) {
          // Previous stage not completed, show alert
          alert(`Please complete "${previousStage.name}" before marking this stage as complete.`);
          return;
        }
      }
      
      // If this is the "estimates" stage, show the lowest quote modal
      if (stageId === 'estimates') {
        setShowLowestQuoteModal(true);
        return;
      }
    } else {
      // Unchecking a stage - if it's estimates, revert the reasons stage name
      if (stageId === 'estimates') {
        setReasonsStageName('Notice of reasons');
      }
    }
    
    // Allow toggling
    const newStageCompletion = {
      ...stageCompletion,
      [stageId]: !stageCompletion[stageId as keyof typeof stageCompletion]
    };
    
    setStageCompletion(newStageCompletion);
    
    // Update in parent component
    onUpdateTimeline(work.id, newStageCompletion);
  };

  const handleLowestQuoteConfirm = (lowestAccepted: boolean) => {
    // Update the stage name based on user selection
    if (lowestAccepted) {
      setReasonsStageName('Notice of award');
    }
    
    // Mark the estimates stage as complete
    const newStageCompletion = {
      ...stageCompletion,
      'estimates': true
    };
    
    setStageCompletion(newStageCompletion);
    onUpdateTimeline(work.id, newStageCompletion);
    setShowLowestQuoteModal(false);
  };
  
  // Helper function to check if a stage can be completed
  const canCompleteStage = (stageId: string) => {
    const stageIndex = stages.findIndex(s => s.id === stageId);
    
    // First stage can always be completed
    if (stageIndex === 0) return true;
    
    // Check if previous stage is completed
    const previousStage = stages[stageIndex - 1];
    return stageCompletion[previousStage.id as keyof typeof stageCompletion];
  };

  const handleToggleIssueSelection = (issueId: string) => {
    if (selectedIssuesToLink.includes(issueId)) {
      setSelectedIssuesToLink(selectedIssuesToLink.filter(id => id !== issueId));
    } else {
      setSelectedIssuesToLink([...selectedIssuesToLink, issueId]);
    }
  };

  const handleConfirmLinkIssues = () => {
    const newLinkedIssues = [...linkedIssues];
    selectedIssuesToLink.forEach(issueId => {
      if (!newLinkedIssues.includes(issueId)) {
        newLinkedIssues.push(issueId);
      }
    });
    setLinkedIssues(newLinkedIssues);
    setShowLinkIssueModal(false);
    setIssueSearchQuery('');
    setSelectedIssuesToLink([]);
  };

  const handleUnlinkIssue = (issueId: string) => {
    setLinkedIssues(linkedIssues.filter(id => id !== issueId));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Get data from formData if available
  const projectData = {
    title: work.title,
    estate: work.formData?.estate || work.estate || 'N/A',
    building: work.formData?.building || work.building || 'N/A',
    totalCost: work.formData?.totalCost || work.totalCost || 0,
    managementFee: work.formData?.managementFee || work.managementFee || 0,
    consultationStage: work.formData?.consultationStage || 'notice-of-intention',
    location: work.location
  };

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <h2 className="mb-0">{projectData.title}</h2>
            <button 
              className="btn btn-link p-0"
              onClick={onEdit}
              style={{ color: '#0B81C5' }}
              title="Edit Major Works"
            >
              <Edit size={20} />
            </button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <MapPin size={16} className="text-muted" />
            <a href="#" className="text-decoration-none" style={{ color: '#0B81C5' }} onClick={(e) => e.preventDefault()}>
              {projectData.location}
            </a>
          </div>
        </div>
      </div>

      {/* Section 20 Timeline - Above tabs, visible for all tabs */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-2">Section 20 Timeline</h5>
          <p className="text-muted small mb-4">Manual stage tracking - mark stages complete as work progresses</p>
          
          <div className="position-relative" style={{ padding: '20px 0' }}>
            {/* Progress container */}
            <div className="d-flex justify-content-between position-relative">
              {stages.map((stage, index) => {
                const isCompleted = stageCompletion[stage.id as keyof typeof stageCompletion];
                const isLastStage = index === stages.length - 1;
                const canComplete = canCompleteStage(stage.id);
                const isDisabled = !canComplete && !isCompleted;
                const isProjectComplete = stageCompletion['completion'];
                const timelineColor = isProjectComplete ? '#28a745' : '#0B81C5';
                
                return (
                  <div key={stage.id} className="d-flex flex-column align-items-center" style={{ flex: 1, position: 'relative' }}>
                    {/* Connecting line to next stage */}
                    {!isLastStage && (
                      <div 
                        className="position-absolute"
                        style={{ 
                          top: '20px',
                          left: 'calc(50% + 20px)',
                          width: 'calc(100% - 40px)',
                          height: '3px',
                          backgroundColor: isCompleted ? timelineColor : '#e9ecef',
                          zIndex: 0
                        }}
                      />
                    )}
                    
                    {/* Stage circle */}
                    <div 
                      className={`rounded-circle d-flex align-items-center justify-content-center mb-2 ${
                        isCompleted 
                          ? 'text-white' 
                          : isDisabled 
                            ? 'bg-light border border-2 text-muted' 
                            : 'bg-white border border-2 text-muted'
                      }`}
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        backgroundColor: isCompleted ? timelineColor : isDisabled ? '#f8f9fa' : 'white',
                        borderColor: isCompleted ? timelineColor : '#dee2e6',
                        position: 'relative',
                        zIndex: 1,
                        opacity: isDisabled ? 0.5 : 1
                      }}
                      onClick={() => !isDisabled && handleStageToggle(stage.id)}
                      title={isDisabled ? `Complete ${stages[index - 1].name} first` : ''}
                    >
                      {isCompleted ? (
                        <CheckCircle size={20} />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    
                    {/* Stage name */}
                    <small 
                      className="text-center fw-medium mb-2" 
                      style={{ 
                        maxWidth: '120px',
                        opacity: isDisabled ? 0.5 : 1,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {stage.name}
                    </small>
                    
                    {/* Checkbox */}
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isCompleted}
                        onChange={() => handleStageToggle(stage.id)}
                        id={`stage-${stage.id}`}
                        disabled={isDisabled}
                        style={{ 
                          borderColor: '#0B81C5',
                          backgroundColor: isCompleted ? '#0B81C5' : 'white',
                          cursor: isDisabled ? 'not-allowed' : 'pointer'
                        }}
                        title={isDisabled ? `Complete ${stages[index - 1].name} first` : ''}
                      />
                      <label 
                        className="form-check-label small text-muted" 
                        htmlFor={`stage-${stage.id}`}
                        style={{ 
                          cursor: isDisabled ? 'not-allowed' : 'pointer',
                          opacity: isDisabled ? 0.5 : 1
                        }}
                      >
                        Complete
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - Matching Figma design */}
      <div className="d-flex mb-4" style={{ borderBottom: '1px solid #dee2e6' }}>
        <div 
          className={`px-4 py-3 position-relative ${activeTab === 'overview' ? 'bg-white' : ''}`}
          style={{ 
            cursor: 'pointer',
            backgroundColor: activeTab === 'overview' ? 'white' : '#0B81C5',
            color: activeTab === 'overview' ? '#000' : 'white',
            borderLeft: activeTab === 'overview' ? '4px solid #0B81C5' : '4px solid transparent'
          }}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </div>
        <div 
          className={`px-4 py-3 position-relative ${activeTab === 'issues' ? 'bg-white' : ''}`}
          style={{ 
            cursor: 'pointer',
            backgroundColor: activeTab === 'issues' ? 'white' : '#0B81C5',
            color: activeTab === 'issues' ? '#000' : 'white',
            borderLeft: activeTab === 'issues' ? '4px solid #0B81C5' : '4px solid transparent'
          }}
          onClick={() => setActiveTab('issues')}
        >
          Issues
        </div>
        <div 
          className={`px-4 py-3 position-relative ${activeTab === 'documents' ? 'bg-white' : ''}`}
          style={{ 
            cursor: 'pointer',
            backgroundColor: activeTab === 'documents' ? 'white' : '#0B81C5',
            color: activeTab === 'documents' ? '#000' : 'white',
            borderLeft: activeTab === 'documents' ? '4px solid #0B81C5' : '4px solid transparent'
          }}
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </div>
        <div 
          className={`px-4 py-3 position-relative ${activeTab === 'audit' ? 'bg-white' : ''}`}
          style={{ 
            cursor: 'pointer',
            backgroundColor: activeTab === 'audit' ? 'white' : '#0B81C5',
            color: activeTab === 'audit' ? '#000' : 'white',
            borderLeft: activeTab === 'audit' ? '4px solid #0B81C5' : '4px solid transparent'
          }}
          onClick={() => setActiveTab('audit')}
        >
          Audit trail
        </div>
        {/* Fill remaining space with blue background */}
        <div className="flex-fill" style={{ backgroundColor: '#0B81C5' }}></div>
      </div>

      {/* Tab Content */}
      <div className="pt-3">
        {/* Overview Tab - Phase 1: Basic info only */}
        {activeTab === 'overview' && (
          <div>
            {/* Major Works Summary - 4 KPIs */}
            <div className="row g-3 mb-4">
              {/* Linked Issues KPI */}
              <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span className="text-muted small">Linked Issues</span>
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          backgroundColor: '#E3F2FD'
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                        </svg>
                      </div>
                    </div>
                    <div 
                      className="h2 mb-1 fw-bold"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActiveTab('issues')}
                    >
                      {linkedIssues.length}
                    </div>
                    <div className="text-muted small">Across all stages</div>
                  </div>
                </div>
              </div>

              {/* Documents Uploaded KPI */}
              <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span className="text-muted small">Documents Uploaded</span>
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          backgroundColor: '#E3F2FD'
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                          <line x1="12" y1="18" x2="12" y2="12"/>
                          <line x1="9" y1="15" x2="15" y2="15"/>
                        </svg>
                      </div>
                    </div>
                    <div 
                      className="h2 mb-1 fw-bold"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActiveTab('documents')}
                    >
                      {uploadedFiles.length}
                    </div>
                    <div className="text-muted small">All file types</div>
                  </div>
                </div>
              </div>

              {/* Estimated Budget KPI */}
              <div className="col-md-3">
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
                          <line x1="12" y1="1" x2="12" y2="23"/>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                      </div>
                    </div>
                    <div className="h2 mb-1 fw-bold">
                      {formatCurrency(projectData.totalCost)}
                    </div>
                    <div className="text-muted small">View cost breakdown</div>
                  </div>
                </div>
              </div>

              {/* Management Fee KPI */}
              <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span className="text-muted small">Management Fee</span>
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          backgroundColor: '#E8F5E9'
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="1" x2="12" y2="23"/>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                      </div>
                    </div>
                    <div className="h2 mb-1 fw-bold">
                      {formatCurrency(projectData.managementFee)}
                    </div>
                    <div className="text-muted small">Inc. VAT</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Major Works Information - Full width */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">Major Works Information</h5>
                
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <small className="text-muted d-block">Major works</small>
                    <strong>{projectData.title}</strong>
                  </div>

                  <div className="col-md-3 mb-3">
                    <small className="text-muted d-block">Building / Estate</small>
                    <strong>{projectData.estate}</strong>
                    <div className="text-muted small">{projectData.building}</div>
                  </div>

                  <div className="col-md-3 mb-3">
                    <small className="text-muted d-block">Total Cost (inc. VAT)</small>
                    <strong className="h5">{formatCurrency(projectData.totalCost)}</strong>
                  </div>

                  <div className="col-md-3 mb-3">
                    <small className="text-muted d-block">Management Fee(s)</small>
                    <strong className="h5 text-success">{formatCurrency(projectData.managementFee)}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Issues Tab - Phase 1: Manual linking */}
        {activeTab === 'issues' && (
          <div>
            <div className="mb-4 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Linked Issues</h5>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-outline-primary d-flex align-items-center gap-2"
                >
                  <Plus size={18} />
                  Create Issue
                </button>
                {linkedIssues.length > 0 && (
                  <button 
                    className="btn d-flex align-items-center gap-2"
                    onClick={() => setShowLinkIssueModal(true)}
                    style={{ backgroundColor: '#0B81C5', color: 'white' }}
                  >
                    <LinkIcon size={18} />
                    Link Issue
                  </button>
                )}
              </div>
            </div>

            {linkedIssues.length === 0 ? (
              <div className="d-flex flex-column align-items-center justify-content-center py-5 text-muted">
                <LinkIcon size={48} className="mb-3 opacity-50" />
                <p className="text-center">No issues linked to this project yet</p>
                <p className="small text-center mb-3">Click "Link Issue" to manually associate issues with this major works</p>
                <button 
                  className="btn d-flex align-items-center gap-2"
                  onClick={() => setShowLinkIssueModal(true)}
                  style={{ backgroundColor: '#0B81C5', color: 'white' }}
                >
                  <LinkIcon size={18} />
                  Link Issue
                </button>
              </div>
            ) : (
              <div className="list-group">
                {linkedIssues.map((issueId) => {
                  const issue = allIssues.find(i => i.id === issueId);
                  if (!issue) return null;
                  return (
                    <div key={issueId} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-medium">{issue.title}</div>
                        <small className="text-muted">{issue.issueRef} • {issue.building} • {issue.status}</small>
                      </div>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          title="View issue"
                        >
                          <ExternalLink size={16} />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleUnlinkIssue(issueId)}
                        >
                          <XIcon size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Link Issue Modal */}
            {showLinkIssueModal && (
              <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Link Issue to Major Works</h5>
                      <button 
                        type="button" 
                        className="btn-close"
                        onClick={() => {
                          setShowLinkIssueModal(false);
                          setIssueSearchQuery('');
                          setSelectedIssuesToLink([]);
                        }}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p className="text-muted small mb-3">
                        Select one or more issues from <strong>{selectedBuilding}</strong> to manually link to this S20 major works
                      </p>
                      
                      {/* Search Input */}
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search issues by title or reference..."
                          value={issueSearchQuery}
                          onChange={(e) => setIssueSearchQuery(e.target.value)}
                        />
                      </div>

                      {/* Issues List */}
                      <div className="list-group" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {availableIssues
                          .filter(issue => !linkedIssues.includes(issue.id))
                          .filter(issue => 
                            issue.title.toLowerCase().includes(issueSearchQuery.toLowerCase()) ||
                            issue.issueRef.toLowerCase().includes(issueSearchQuery.toLowerCase())
                          )
                          .map((issue) => (
                            <div
                              key={issue.id}
                              className="list-group-item list-group-item-action"
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleToggleIssueSelection(issue.id)}
                            >
                              <div className="d-flex align-items-start gap-2">
                                <input
                                  type="checkbox"
                                  className="form-check-input mt-1"
                                  checked={selectedIssuesToLink.includes(issue.id)}
                                  onChange={() => handleToggleIssueSelection(issue.id)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <div className="flex-grow-1">
                                  <div className="fw-medium">{issue.title}</div>
                                  <small className="text-muted">{issue.issueRef} • {issue.building} • {issue.status}</small>
                                </div>
                              </div>
                            </div>
                          ))}
                        {availableIssues
                          .filter(issue => !linkedIssues.includes(issue.id))
                          .filter(issue => 
                            issue.title.toLowerCase().includes(issueSearchQuery.toLowerCase()) ||
                            issue.issueRef.toLowerCase().includes(issueSearchQuery.toLowerCase())
                          ).length === 0 && (
                          <div className="text-center text-muted py-4">
                            <p className="small mb-0">No issues found matching your search</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => {
                          setShowLinkIssueModal(false);
                          setIssueSearchQuery('');
                          setSelectedIssuesToLink([]);
                        }}
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        className="btn d-flex align-items-center gap-2"
                        style={{ backgroundColor: '#0B81C5', color: 'white' }}
                        onClick={handleConfirmLinkIssues}
                        disabled={selectedIssuesToLink.length === 0}
                      >
                        <LinkIcon size={18} />
                        Link {selectedIssuesToLink.length > 0 ? `${selectedIssuesToLink.length} ` : ''}Issue{selectedIssuesToLink.length !== 1 ? 's' : ''}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Documents Tab - Phase 1: Simple upload only */}
        {activeTab === 'documents' && (
          <div>
            <h5 className="mb-4">Document Upload</h5>

            {/* Upload Area */}
            <div
              className={`border rounded p-5 mb-4 d-flex flex-column align-items-center justify-content-center ${
                isDragging ? 'bg-light' : ''
              }`}
              style={{ 
                cursor: 'pointer',
                borderStyle: 'dashed',
                borderWidth: '2px',
                borderColor: isDragging ? '#0B81C5' : '#dee2e6'
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <Upload size={48} className="text-muted mb-3" />
              <p className="mb-2 text-center">Drag and drop files here, or click to browse</p>
              <small className="text-muted text-center">All file types supported</small>
              <input
                id="fileInput"
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div>
                <h6 className="mb-3">Uploaded Documents ({uploadedFiles.length})</h6>
                <div className="list-group">
                  {uploadedFiles.map((file: any, index: number) => (
                    <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-medium">{file.name}</div>
                        <small className="text-muted">
                          {formatFileSize(file.size)} • Uploaded {file.uploadedAt ? new Date(file.uploadedAt).toLocaleDateString() : 'Recently'}
                        </small>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                          title="View document"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                          onClick={() => handleRemoveFile(index)}
                          title="Delete document"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {uploadedFiles.length === 0 && (
              <div className="text-center text-muted py-3">
                <p className="small">No documents uploaded yet</p>
              </div>
            )}
          </div>
        )}

        {/* Audit Trail Tab */}
        {activeTab === 'audit' && (
          <div>
            <AuditLog />
          </div>
        )}
      </div>

      {/* Lowest Quote Confirmation Modal */}
      {showLowestQuoteModal && (
        <>
          <div 
            className="modal fade show d-block" 
            tabIndex={-1}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title">Confirm Quote Selection</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowLowestQuoteModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="mb-3">
                    Was the lowest quote accepted for this major works?
                  </p>
                  <p className="text-muted small mb-0">
                    If yes, the next stage will be "Notice of award". If no, it will be "Notice of reasons".
                  </p>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => handleLowestQuoteConfirm(false)}
                  >
                    No
                  </button>
                  <button 
                    type="button" 
                    className="btn"
                    style={{ backgroundColor: '#0B81C5', color: 'white' }}
                    onClick={() => handleLowestQuoteConfirm(true)}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}