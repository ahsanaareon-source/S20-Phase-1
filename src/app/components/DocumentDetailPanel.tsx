import { useState, useEffect } from 'react';
import { Clock, Users, FileText, Download, Archive, X, Send, Maximize2, Edit3, Save, AlertCircle, CheckCircle, XCircle, Sparkles, Calendar, User } from 'lucide-react';

interface DocumentDetailPanelProps {
  show: boolean;
  onHide: () => void;
  document?: any;
}

export default function DocumentDetailPanel({ show, onHide, document }: DocumentDetailPanelProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [visibility, setVisibility] = useState<'visible-to-all' | 'internal-only'>('visible-to-all');
  const [originalVisibility, setOriginalVisibility] = useState<'visible-to-all' | 'internal-only'>('visible-to-all');
  const [editableFields, setEditableFields] = useState({
    date: '25 November 2025',
    documentName: document?.name || '',
    recipient: 'Leaseholder',
    propertyName: 'Riverside Apartments',
    scopeOfWorks: 'The works will include comprehensive roof repairs and replacement, external building maintenance, and necessary structural improvements.',
    netCostOfWorks: '£405,000',
    adminFeePercentage: '10%',
    adminFeeAmount: '£40,500',
    surveyorFee: '£4,500',
    totalCost: '£450,000',
    contribution: '£18,750'
  });

  // Initialize visibility from document data when document changes
  useEffect(() => {
    if (document && document.visibility) {
      setVisibility(document.visibility);
      setOriginalVisibility(document.visibility);
    } else {
      // Default to visible-to-all if not specified
      setVisibility('visible-to-all');
      setOriginalVisibility('visible-to-all');
    }
  }, [document]);

  const visibilityChanged = visibility !== originalVisibility;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsEditMode(false);
      // Reset visibility to original when closing
      if (document && document.visibility) {
        setVisibility(document.visibility);
      }
      onHide();
    }, 300);
  };

  const handleSave = () => {
    // Save the edited fields (in a real app, this would save to backend)
    setIsEditMode(false);
    // Show success toast or notification
  };

  const handleSaveVisibility = () => {
    // Save the visibility change (in a real app, this would save to backend)
    // Update the document's visibility in the parent component
    if (document) {
      document.visibility = visibility;
    }
    setOriginalVisibility(visibility);
    // Show success toast or notification
  };

  if (!show && !isClosing) return null;

  const isMajorWorksDocument = document?.category === 'project';

  // Determine preview type based on document ID
  const getPreviewType = () => {
    if (!document) return 'none';
    const id = document.id;
    if (isMajorWorksDocument) {
      // For major works documents
      if (id === 10 || id === 12 || id === 15) return 'image';
      return 'none';
    }
    // For consultation documents
    if (id === 1 || id === 4 || id === 7) return 'image';
    if (id === 2 || id === 5 || id === 8) return 'editable';
    return 'none';
  };

  const previewType = getPreviewType();

  // Generate AI suggestions based on document type and ID
  const getAISuggestions = () => {
    if (!document) return [];
    
    if (isMajorWorksDocument) {
      // Major works document AI suggestions based on type
      const majorWorksSuggestions: { [key: string]: any[] } = {
        'Contracts': [
          {
            type: 'info',
            icon: CheckCircle,
            color: '#2563eb',
            bgColor: '#dbeafe',
            borderColor: '#60a5fa',
            textColor: '#1e3a8a',
            message: 'Contract includes all required clauses. Payment terms and milestones are clearly defined.'
          },
          {
            type: 'warning',
            icon: AlertCircle,
            color: '#f59e0b',
            bgColor: '#fef3c7',
            borderColor: '#fbbf24',
            textColor: '#78350f',
            message: 'Consider adding a retention clause to protect against defects during the defects liability period.'
          }
        ],
        'Site meeting minutes': [
          {
            type: 'info',
            icon: CheckCircle,
            color: '#2563eb',
            bgColor: '#dbeafe',
            borderColor: '#60a5fa',
            textColor: '#1e3a8a',
            message: 'All action items have assigned owners and deadlines. Good practice for accountability.'
          }
        ],
        'F10 / CDM docs': [
          {
            type: 'info',
            icon: CheckCircle,
            color: '#2563eb',
            bgColor: '#dbeafe',
            borderColor: '#60a5fa',
            textColor: '#1e3a8a',
            message: 'F10 form appears complete with all required HSE information.'
          },
          {
            type: 'warning',
            icon: AlertCircle,
            color: '#f59e0b',
            bgColor: '#fef3c7',
            borderColor: '#fbbf24',
            textColor: '#78350f',
            message: 'Ensure F10 is submitted to HSE at least 6 weeks before construction work begins.'
          }
        ],
        'Certificates of payment': [
          {
            type: 'info',
            icon: CheckCircle,
            color: '#2563eb',
            bgColor: '#dbeafe',
            borderColor: '#60a5fa',
            textColor: '#1e3a8a',
            message: 'Payment certificate includes itemized breakdown and retention amounts.'
          }
        ],
        'Other': [
          {
            type: 'info',
            icon: CheckCircle,
            color: '#2563eb',
            bgColor: '#dbeafe',
            borderColor: '#60a5fa',
            textColor: '#1e3a8a',
            message: 'Document is properly formatted and ready for filing.'
          }
        ]
      };

      return majorWorksSuggestions[document.type] || majorWorksSuggestions['Other'];
    }
    
    // Consultation document suggestions (existing logic)
    const suggestions = [
      // Document 1 - Date mismatch and compliance
      [
        {
          type: 'warning',
          icon: AlertCircle,
          color: '#f59e0b',
          bgColor: '#fef3c7',
          borderColor: '#fbbf24',
          textColor: '#78350f',
          message: 'The document date (25 November 2025) is before the due date (28 November 2025). Consider updating for clarity.'
        },
        {
          type: 'info',
          icon: CheckCircle,
          color: '#2563eb',
          bgColor: '#dbeafe',
          borderColor: '#60a5fa',
          textColor: '#1e3a8a',
          message: 'Document meets Section 20 requirements. The 30-day consultation period is clearly stated.'
        }
      ],
      // Document 2 - Missing info
      [
        {
          type: 'error',
          icon: XCircle,
          color: '#dc2626',
          bgColor: '#fee2e2',
          borderColor: '#f87171',
          textColor: '#7f1d1d',
          message: 'Missing contractor contact details. Recipients may need this information during the consultation period.'
        }
      ],
      // Document 3 - All good
      [
        {
          type: 'info',
          icon: CheckCircle,
          color: '#2563eb',
          bgColor: '#dbeafe',
          borderColor: '#60a5fa',
          textColor: '#1e3a8a',
          message: 'No issues detected. Document is ready to send.'
        }
      ],
      // Document 4 - Typo warning
      [
        {
          type: 'warning',
          icon: AlertCircle,
          color: '#f59e0b',
          bgColor: '#fef3c7',
          borderColor: '#fbbf24',
          textColor: '#78350f',
          message: 'Possible inconsistency: "£18,750" appears in one section while "£18,700" appears in another.'
        }
      ],
      // Document 5 - Missing deadline
      [
        {
          type: 'error',
          icon: XCircle,
          color: '#dc2626',
          bgColor: '#fee2e2',
          borderColor: '#f87171',
          textColor: '#7f1d1d',
          message: 'Missing consultation response deadline. Section 20 requires a clear deadline for observations.'
        },
        {
          type: 'warning',
          icon: AlertCircle,
          color: '#f59e0b',
          bgColor: '#fef3c7',
          borderColor: '#fbbf24',
          textColor: '#78350f',
          message: 'Property address formatting is inconsistent across the document.'
        }
      ],
      // Document 6 - Compliance check
      [
        {
          type: 'info',
          icon: CheckCircle,
          color: '#2563eb',
          bgColor: '#dbeafe',
          borderColor: '#60a5fa',
          textColor: '#1e3a8a',
          message: 'All required Section 20 information is present and correctly formatted.'
        }
      ],
      // Document 7 - Cost warning
      [
        {
          type: 'warning',
          icon: AlertCircle,
          color: '#f59e0b',
          bgColor: '#fef3c7',
          borderColor: '#fbbf24',
          textColor: '#78350f',
          message: 'Total cost exceeds £250,000 threshold. Ensure all Section 20 consultation stages are followed.'
        },
        {
          type: 'info',
          icon: CheckCircle,
          color: '#2563eb',
          bgColor: '#dbeafe',
          borderColor: '#60a5fa',
          textColor: '#1e3a8a',
          message: 'Document includes all three required contractor quotes as per regulations.'
        }
      ],
      // Document 8 - Format issue
      [
        {
          type: 'warning',
          icon: AlertCircle,
          color: '#f59e0b',
          bgColor: '#fef3c7',
          borderColor: '#fbbf24',
          textColor: '#78350f',
          message: 'Date format varies throughout document (25/11/2025 vs 25 November 2025). Use consistent format.'
        }
      ]
    ];

    const index = (document.id - 1) % suggestions.length;
    return suggestions[index];
  };

  const aiSuggestions = getAISuggestions();

  return (
    <>
      {/* Backdrop */}
      <div 
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
        style={{ 
          opacity: (show && !isClosing) ? 0.5 : 0,
          zIndex: 1040,
          transition: 'opacity 0.3s ease-in-out',
          pointerEvents: (show && !isClosing) ? 'auto' : 'none'
        }}
        onClick={handleClose}
      />
      
      {/* Panel */}
      <div 
        className="position-fixed top-0 end-0 h-100 bg-white shadow-lg"
        style={{ 
          width: '703px',
          zIndex: 1050,
          transform: (show && !isClosing) ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          overflowY: 'auto',
          borderLeft: '1px solid rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="p-4">
          {/* Header with Close Button */}
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div className="flex-grow-1">
              <h5 className="mb-2" style={{ fontWeight: 600, fontSize: '16px', lineHeight: '24px' }}>
                {document?.name}
              </h5>
              <div className="d-flex gap-2 align-items-center">
                {!isProjectDocument && document?.status && (
                  <span 
                    className="badge"
                    style={{
                      backgroundColor: '#dbeafe',
                      color: '#1447e6',
                      border: '1px solid #bedbff',
                      fontSize: '12px',
                      fontWeight: 500,
                      padding: '3px 9px',
                      borderRadius: '8px'
                    }}
                  >
                    {document?.status}
                  </span>
                )}
                <span 
                  className="badge"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#0a0a0a',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    fontSize: '14px',
                    fontWeight: 400,
                    padding: '3px 9px',
                    borderRadius: '8px',
                    textTransform: 'capitalize'
                  }}
                >
                  {document?.type}
                </span>
              </div>
            </div>
            
            {/* Close Button */}
            <button 
              className="btn btn-link text-dark p-0"
              onClick={handleClose}
              style={{ opacity: 0.7 }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Document Details Grid - Different for consultation vs major works */}
          {isMajorWorksDocument ? (
            // Major Works Document Details
            <div className="mb-4">
              <div className="row g-3">
                <div className="col-6">
                  <div className="mb-3">
                    <div className="text-muted small mb-1" style={{ fontSize: '14px', color: '#4a5565' }}>
                      Document type
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 400 }}>
                      {document?.type}
                    </div>
                  </div>
                </div>
                
                <div className="col-6">
                  <div className="mb-3">
                    <div className="text-muted small mb-1" style={{ fontSize: '14px', color: '#4a5565' }}>
                      Last updated
                    </div>
                    <div className="d-flex align-items-center" style={{ fontSize: '16px' }}>
                      <Calendar size={16} className="me-2" style={{ color: '#99A1AF' }} />
                      {document?.lastUpdated}
                    </div>
                  </div>
                </div>
                
                <div className="col-12">
                  <div className="mb-3">
                    <div className="text-muted small mb-1" style={{ fontSize: '14px', color: '#4a5565' }}>
                      Updated by
                    </div>
                    <div className="d-flex align-items-center" style={{ fontSize: '16px' }}>
                      <User size={16} className="me-2" style={{ color: '#99A1AF' }} />
                      {document?.lastUpdatedBy}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description for major works documents */}
              <div className="mb-4">
                <div className="text-muted small mb-2" style={{ fontSize: '14px', color: '#4a5565' }}>
                  Description
                </div>
                <div style={{ fontSize: '14px', lineHeight: '20px' }}>
                  {document?.type === 'Contracts' && 'Main contractor agreement outlining scope, timeline, and payment terms for the major works.'}
                  {document?.type === 'Site meeting minutes' && 'Minutes from site meeting including progress updates, action items, and key decisions.'}
                  {document?.type === 'F10 / CDM docs' && 'Health and safety notification form required under CDM regulations for construction major works.'}
                  {document?.type === 'Certificates of payment' && 'Payment certificate for completed work phase including itemized costs and retention.'}
                  {document?.type === 'Other' && 'Additional documentation related to the major works.'}
                </div>
              </div>

              {/* Visibility Section for major works documents */}
              <div className="mb-4">
                <div className="text-muted small mb-2" style={{ fontSize: '14px', color: '#4a5565' }}>
                  Document visibility
                </div>
                <div className="d-flex gap-2">
                  <div 
                    className={`border rounded-3 p-2 d-flex align-items-start gap-2 flex-grow-1 ${visibility === 'visible-to-all' ? 'border-primary border-2 bg-light' : ''}`}
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    onClick={() => setVisibility('visible-to-all')}
                  >
                    <input
                      type="radio"
                      className="form-check-input mt-0"
                      name="visibility"
                      checked={visibility === 'visible-to-all'}
                      onChange={() => setVisibility('visible-to-all')}
                      style={{ cursor: 'pointer', flexShrink: 0 }}
                    />
                    <div className="flex-grow-1">
                      <div className="fw-semibold mb-1" style={{ fontSize: '13px' }}>
                        Visible to all
                      </div>
                      <div className="text-muted" style={{ fontSize: '11px', lineHeight: '1.3' }}>
                        Anyone can see this document
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`border rounded-3 p-2 d-flex align-items-start gap-2 flex-grow-1 ${visibility === 'internal-only' ? 'border-primary border-2 bg-light' : ''}`}
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    onClick={() => setVisibility('internal-only')}
                  >
                    <input
                      type="radio"
                      className="form-check-input mt-0"
                      name="visibility"
                      checked={visibility === 'internal-only'}
                      onChange={() => setVisibility('internal-only')}
                      style={{ cursor: 'pointer', flexShrink: 0 }}
                    />
                    <div className="flex-grow-1">
                      <div className="fw-semibold mb-1" style={{ fontSize: '13px' }}>
                        Internal only
                      </div>
                      <div className="text-muted" style={{ fontSize: '11px', lineHeight: '1.3' }}>
                        Only visible to business team
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Consultation Document Details
            <div className="row g-3 mb-4">
              <div className="col-6">
                <div className="mb-3">
                  <div className="text-muted small mb-1" style={{ fontSize: '14px', color: '#4a5565' }}>
                    Section 20 stage
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 400 }}>
                    {document?.stage}
                  </div>
                </div>
              </div>
              
              <div className="col-6">
                <div className="mb-3">
                  <div className="text-muted small mb-1" style={{ fontSize: '14px', color: '#4a5565' }}>
                    Due to send on
                  </div>
                  <div className="d-flex align-items-center" style={{ fontSize: '16px' }}>
                    <Clock size={16} className="me-2" style={{ color: '#99A1AF' }} />
                    {document?.dueDate}
                  </div>
                </div>
              </div>
              
              <div className="col-6">
                <div className="mb-3">
                  <div className="text-muted small mb-1" style={{ fontSize: '14px', color: '#4a5565' }}>
                    Sent on
                  </div>
                  <div style={{ fontSize: '16px' }}>
                    {document?.sentDate || '—'}
                  </div>
                </div>
              </div>
              
              <div className="col-6">
                <div className="mb-3">
                  <div className="text-muted small mb-1" style={{ fontSize: '14px', color: '#4a5565' }}>
                    Recipients
                  </div>
                  <div className="d-flex align-items-center" style={{ fontSize: '16px' }}>
                    <Users size={16} className="me-2" style={{ color: '#99A1AF' }} />
                    46 people
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recipient Groups - Only for consultation documents */}
          {!isProjectDocument && document?.recipients && (
            <div className="mb-4">
              <div className="text-muted small mb-2" style={{ fontSize: '14px', color: '#4a5565' }}>
                Recipient groups
              </div>
              <div className="d-flex gap-2 flex-wrap">
                {document?.recipients.map((recipient: any, idx: number) => (
                  <span 
                    key={idx}
                    className="badge"
                    style={{
                      backgroundColor: '#eceef2',
                      color: '#030213',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 500,
                      padding: '3px 9px',
                      borderRadius: '8px'
                    }}
                  >
                    {recipient.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description - Only for consultation documents */}
          {!isProjectDocument && (
            <div className="mb-4">
              <div className="text-muted small mb-2" style={{ fontSize: '14px', color: '#4a5565' }}>
                Description
              </div>
              <div style={{ fontSize: '14px', lineHeight: '20px' }}>
                Quote for roof repair and replacement work
              </div>
            </div>
          )}

          {/* Divider */}
          <hr style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', height: '1px', border: 'none' }} />

          {/* AI Suggestions Section */}
          <div className="mb-4 mt-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <Sparkles size={20} style={{ color: '#7c3aed' }} />
              <h6 className="mb-0" style={{ fontSize: '16px', fontWeight: 600 }}>
                AI Suggestions
              </h6>
            </div>
            
            <div className="d-flex flex-column gap-2">
              {aiSuggestions.map((suggestion, idx) => (
                <div 
                  key={idx}
                  className="d-flex gap-3 p-3"
                  style={{
                    backgroundColor: suggestion.bgColor,
                    border: `1px solid ${suggestion.borderColor}`,
                    borderRadius: '10px'
                  }}
                >
                  <suggestion.icon size={18} style={{ color: suggestion.color, flexShrink: 0, marginTop: '2px' }} />
                  <div className="flex-grow-1">
                    <div style={{ fontSize: '13px', lineHeight: '20px', color: suggestion.textColor }}>
                      {suggestion.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <hr style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', height: '1px', border: 'none' }} />

          {/* Document Preview */}
          <div className="mb-4 mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="text-muted small" style={{ fontSize: '14px', color: '#4a5565' }}>
                Document preview
              </div>
              <Maximize2 size={16} style={{ color: '#030213', cursor: 'pointer' }} />
            </div>
            
            {previewType === 'none' && (
              <div 
                style={{
                  backgroundColor: '#f9fafb',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="text-center">
                  <div className="d-flex justify-content-center mb-2">
                    <FileText size={48} style={{ color: '#99A1AF' }} />
                  </div>
                  <div className="text-muted mb-3" style={{ fontSize: '14px', color: '#6a7282' }}>
                    Preview not available
                  </div>
                  <button 
                    className="btn btn-outline-dark d-inline-flex align-items-center gap-2"
                    style={{ fontSize: '14px' }}
                  >
                    <Maximize2 size={16} />
                    Open full screen preview
                  </button>
                </div>
              </div>
            )}

            {previewType === 'image' && !isProjectDocument && (
              <div 
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  padding: '20px',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}
              >
                {/* Mock Consultation Document Preview */}
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>
                  <strong>Fixflo Property Management</strong><br />
                  123 Management Street<br />
                  London, SE1 9RY
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '20px' }}>
                  Date: 25 November 2025
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
                  {document?.name}
                </div>
                <div style={{ fontSize: '12px', lineHeight: '1.6', color: '#333' }}>
                  <p>Dear Leaseholder,</p>
                  <p>
                    We are writing to inform you of proposed major works to {document?.stage.toLowerCase()} 
                    affecting your property at Riverside Apartments.
                  </p>
                  <p>
                    <strong>Scope of Works:</strong><br />
                    The works will include comprehensive roof repairs and replacement, external building 
                    maintenance, and necessary structural improvements to ensure the long-term integrity 
                    of the building.
                  </p>
                  <p>
                    <strong>Estimated Costs (inc. VAT):</strong><br />
                    Total major works cost: £450,000<br />
                    Your estimated contribution: £18,750
                  </p>
                  <p>
                    This notice is issued under Section 20 of the Landlord and Tenant Act 1985. 
                    You have 30 days from the date of this letter to provide any comments or observations.
                  </p>
                  <p>Yours sincerely,<br />
                  <strong>Property Management Team</strong></p>
                </div>
              </div>
            )}

            {previewType === 'image' && isProjectDocument && (
              <div 
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  padding: '20px',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}
              >
                {/* Mock Major Works Document Preview */}
                {document?.type === 'Contracts' && (
                  <>
                    <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
                      MAIN CONTRACTOR AGREEMENT
                    </div>
                    <div style={{ fontSize: '12px', lineHeight: '1.6', color: '#333' }}>
                      <p><strong>Major Works:</strong> Riverside Apartments - Roof Replacement and Building Maintenance</p>
                      <p><strong>Contractor:</strong> BuildRight Construction Ltd</p>
                      <p><strong>Contract Sum:</strong> £405,000 (exc. VAT)</p>
                      <p><strong>Contract Period:</strong> 24 weeks from commencement date</p>
                      <p><strong>Payment Terms:</strong> Stage payments as per schedule attached</p>
                      <p>This agreement is made between the Client and the Contractor for the execution of major works at the above property...</p>
                    </div>
                  </>
                )}
                {document?.type === 'Site meeting minutes' && (
                  <>
                    <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
                      Site Meeting Minutes - {document?.name}
                    </div>
                    <div style={{ fontSize: '12px', lineHeight: '1.6', color: '#333' }}>
                      <p><strong>Date:</strong> 15 November 2025</p>
                      <p><strong>Attendees:</strong> James Cooper (PM), Sarah Mitchell (Surveyor), John Smith (Contractor)</p>
                      <p><strong>Progress Update:</strong><br />
                      - Scaffolding installation complete<br />
                      - Roof membrane removal 60% complete<br />
                      - Materials on order for next phase</p>
                      <p><strong>Action Items:</strong><br />
                      1. Submit updated schedule by Friday - Contractor<br />
                      2. Review material specifications - Surveyor</p>
                    </div>
                  </>
                )}
                {document?.type === 'F10 / CDM docs' && (
                  <>
                    <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
                      F10 NOTIFICATION OF CONSTRUCTION MAJOR WORKS
                    </div>
                    <div style={{ fontSize: '12px', lineHeight: '1.6', color: '#333' }}>
                      <p><strong>Major Works Details:</strong></p>
                      <p>Major Works: Riverside Apartments - Major Works<br />
                      Address: 123 Riverside Road, London, SE1 9RY<br />
                      Client: Riverside Management Company Ltd</p>
                      <p><strong>Major Works Scope:</strong><br />
                      Roof replacement, external repairs, and structural improvements</p>
                      <p><strong>Health & Safety:</strong><br />
                      Principal Designer: Safety First Consulting<br />
                      Principal Contractor: BuildRight Construction Ltd</p>
                    </div>
                  </>
                )}
                {document?.type === 'Certificates of payment' && (
                  <>
                    <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
                      PAYMENT CERTIFICATE - PHASE 1
                    </div>
                    <div style={{ fontSize: '12px', lineHeight: '1.6', color: '#333' }}>
                      <p><strong>Certificate No:</strong> 001<br />
                      <strong>Date:</strong> 10 November 2025<br />
                      <strong>Valuation Period:</strong> 01/11/2025 - 10/11/2025</p>
                      <p><strong>Work Completed:</strong><br />
                      Scaffolding and site setup: £45,000<br />
                      Roof membrane removal: £32,000<br />
                      Materials and equipment: £28,000</p>
                      <p><strong>Total Value:</strong> £105,000<br />
                      <strong>Less Retention (5%):</strong> £5,250<br />
                      <strong>Net Amount Due:</strong> £99,750</p>
                    </div>
                  </>
                )}
                {document?.type === 'Other' && (
                  <div style={{ fontSize: '12px', lineHeight: '1.6', color: '#333', textAlign: 'center', padding: '40px' }}>
                    <FileText size={48} style={{ color: '#99A1AF', marginBottom: '16px' }} />
                    <p>Major works document preview</p>
                  </div>
                )}
              </div>
            )}

            {previewType === 'editable' && (
              <div 
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  padding: '20px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  position: 'relative'
                }}
              >
                {/* Edit/Save button overlay */}
                <div 
                  className="position-absolute"
                  style={{ top: '12px', right: '12px', zIndex: 10 }}
                >
                  {!isEditMode ? (
                    <button 
                      className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
                      style={{ fontSize: '12px' }}
                      onClick={() => setIsEditMode(true)}
                    >
                      <Edit3 size={14} />
                      Edit document
                    </button>
                  ) : (
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1"
                        style={{ fontSize: '12px' }}
                        onClick={() => setIsEditMode(false)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="btn btn-sm btn-primary d-inline-flex align-items-center gap-1"
                        style={{ fontSize: '12px' }}
                        onClick={handleSave}
                      >
                        <Save size={14} />
                        Save changes
                      </button>
                    </div>
                  )}
                </div>

                {/* Mock Editable Document */}
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>
                  <strong>Fixflo Property Management</strong><br />
                  123 Management Street<br />
                  London, SE1 9RY
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '20px' }}>
                  Date: {isEditMode ? (
                    <input 
                      type="text"
                      className="form-control form-control-sm d-inline-block"
                      style={{ 
                        width: 'auto',
                        fontSize: '12px',
                        backgroundColor: '#fff3cd',
                        border: '1px solid #ffc107',
                        padding: '2px 6px'
                      }}
                      value={editableFields.date}
                      onChange={(e) => setEditableFields({...editableFields, date: e.target.value})}
                    />
                  ) : (
                    <span style={{ backgroundColor: '#fff3cd', padding: '2px 4px' }}>{editableFields.date}</span>
                  )}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
                  {isEditMode ? (
                    <input 
                      type="text"
                      className="form-control form-control-sm"
                      style={{ 
                        fontSize: '14px',
                        fontWeight: 600,
                        backgroundColor: '#fff3cd',
                        border: '1px solid #ffc107',
                        padding: '4px 8px'
                      }}
                      value={editableFields.documentName}
                      onChange={(e) => setEditableFields({...editableFields, documentName: e.target.value})}
                    />
                  ) : (
                    <span style={{ backgroundColor: '#fff3cd', padding: '2px 4px' }}>{editableFields.documentName}</span>
                  )}
                </div>
                <div style={{ fontSize: '12px', lineHeight: '1.6', color: '#333' }}>
                  <p>
                    Dear {isEditMode ? (
                      <input 
                        type="text"
                        className="form-control form-control-sm d-inline-block"
                        style={{ 
                          width: '120px',
                          fontSize: '12px',
                          backgroundColor: '#fff3cd',
                          border: '1px solid #ffc107',
                          padding: '2px 6px'
                        }}
                        value={editableFields.recipient}
                        onChange={(e) => setEditableFields({...editableFields, recipient: e.target.value})}
                      />
                    ) : (
                      <span style={{ backgroundColor: '#fff3cd', padding: '2px 4px' }}>{editableFields.recipient}</span>
                    )},
                  </p>
                  <p>
                    We are writing to inform you of proposed major works to {document?.stage.toLowerCase()} 
                    affecting your property at {isEditMode ? (
                      <input 
                        type="text"
                        className="form-control form-control-sm d-inline-block"
                        style={{ 
                          width: '180px',
                          fontSize: '12px',
                          backgroundColor: '#fff3cd',
                          border: '1px solid #ffc107',
                          padding: '2px 6px'
                        }}
                        value={editableFields.propertyName}
                        onChange={(e) => setEditableFields({...editableFields, propertyName: e.target.value})}
                      />
                    ) : (
                      <span style={{ backgroundColor: '#fff3cd', padding: '2px 4px' }}>{editableFields.propertyName}</span>
                    )}.
                  </p>
                  <p>
                    <strong>Scope of Works:</strong><br />
                    {isEditMode ? (
                      <textarea 
                        className="form-control form-control-sm"
                        style={{ 
                          fontSize: '12px',
                          backgroundColor: '#e7f3ff',
                          border: '1px solid #0d6efd',
                          padding: '6px 8px',
                          minHeight: '60px'
                        }}
                        value={editableFields.scopeOfWorks}
                        onChange={(e) => setEditableFields({...editableFields, scopeOfWorks: e.target.value})}
                      />
                    ) : (
                      <span style={{ backgroundColor: '#e7f3ff', padding: '2px 4px' }}>
                        {editableFields.scopeOfWorks}
                      </span>
                    )}
                  </p>
                  <p>
                    <strong>Estimated Costs (inc. VAT):</strong><br />
                    Net cost of works: {isEditMode ? (
                      <input 
                        type="text"
                        className="form-control form-control-sm d-inline-block"
                        style={{ 
                          width: '100px',
                          fontSize: '12px',
                          backgroundColor: '#fff3cd',
                          border: '1px solid #ffc107',
                          padding: '2px 6px'
                        }}
                        value={editableFields.netCostOfWorks}
                        onChange={(e) => setEditableFields({...editableFields, netCostOfWorks: e.target.value})}
                      />
                    ) : (
                      <span style={{ backgroundColor: '#fff3cd', padding: '2px 4px' }}>{editableFields.netCostOfWorks}</span>
                    )}<br />
                    Managing agent works administration fee ({isEditMode ? (
                      <input 
                        type="text"
                        className="form-control form-control-sm d-inline-block"
                        style={{ 
                          width: '50px',
                          fontSize: '12px',
                          backgroundColor: '#fff3cd',
                          border: '1px solid #ffc107',
                          padding: '2px 6px'
                        }}
                        value={editableFields.adminFeePercentage}
                        onChange={(e) => setEditableFields({...editableFields, adminFeePercentage: e.target.value})}
                      />
                    ) : (
                      <span style={{ backgroundColor: '#fff3cd', padding: '2px 4px' }}>{editableFields.adminFeePercentage}</span>
                    )} of net cost): {isEditMode ? (
                      <input 
                        type="text"
                        className="form-control form-control-sm d-inline-block"
                        style={{ 
                          width: '100px',
                          fontSize: '12px',
                          backgroundColor: '#fff3cd',
                          border: '1px solid #ffc107',
                          padding: '2px 6px'
                        }}
                        value={editableFields.adminFeeAmount}
                        onChange={(e) => setEditableFields({...editableFields, adminFeeAmount: e.target.value})}
                      />
                    ) : (
                      <span style={{ backgroundColor: '#fff3cd', padding: '2px 4px' }}>{editableFields.adminFeeAmount}</span>
                    )}<br />
                    Third party surveyor fee: {isEditMode ? (
                      <input 
                        type="text"
                        className="form-control form-control-sm d-inline-block"
                        style={{ 
                          width: '100px',
                          fontSize: '12px',
                          backgroundColor: '#fff3cd',
                          border: '1px solid #ffc107',
                          padding: '2px 6px'
                        }}
                        value={editableFields.surveyorFee}
                        onChange={(e) => setEditableFields({...editableFields, surveyorFee: e.target.value})}
                      />
                    ) : (
                      <span style={{ backgroundColor: '#fff3cd', padding: '2px 4px' }}>{editableFields.surveyorFee}</span>
                    )}<br />
                    <strong>Total major works cost: {isEditMode ? (
                      <input 
                        type="text"
                        className="form-control form-control-sm d-inline-block"
                        style={{ 
                          width: '100px',
                          fontSize: '12px',
                          backgroundColor: '#fff3cd',
                          border: '1px solid #ffc107',
                          padding: '2px 6px'
                        }}
                        value={editableFields.totalCost}
                        onChange={(e) => setEditableFields({...editableFields, totalCost: e.target.value})}
                      />
                    ) : (
                      <span style={{ backgroundColor: '#fff3cd', padding: '2px 4px' }}>{editableFields.totalCost}</span>
                    )}</strong><br />
                    <strong>Your estimated contribution: {isEditMode ? (
                      <input 
                        type="text"
                        className="form-control form-control-sm d-inline-block"
                        style={{ 
                          width: '100px',
                          fontSize: '12px',
                          backgroundColor: '#fff3cd',
                          border: '1px solid #ffc107',
                          padding: '2px 6px'
                        }}
                        value={editableFields.contribution}
                        onChange={(e) => setEditableFields({...editableFields, contribution: e.target.value})}
                      />
                    ) : (
                      <span style={{ backgroundColor: '#fff3cd', padding: '2px 4px' }}>{editableFields.contribution}</span>
                    )}</strong>
                  </p>
                  <p>
                    This notice is issued under Section 20 of the Landlord and Tenant Act 1985. 
                    You have 30 days from the date of this letter to provide any comments or observations.
                  </p>
                  <p>Yours sincerely,<br />
                  <strong>Property Management Team</strong></p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons - Only show for consultation documents */}
          {!isProjectDocument && (
            <>
              <hr style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', height: '1px', border: 'none' }} />
              
              <div className="d-flex gap-2 mt-4">
                <button className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2">
                  <Send size={16} />
                  Send document
                </button>
                <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
                  <Download size={16} />
                  Download
                </button>
                <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
                  <Archive size={16} />
                  Archive
                </button>
              </div>
            </>
          )}

          {/* Action Buttons - For major works documents */}
          {isMajorWorksDocument && (
            <>
              <hr style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', height: '1px', border: 'none' }} />
              
              <div className="d-flex gap-2 mt-4">
                {visibilityChanged && (
                  <button 
                    className="btn btn-primary d-flex align-items-center gap-2"
                    onClick={handleSaveVisibility}
                  >
                    <Save size={16} />
                    Save changes
                  </button>
                )}
                <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
                  <Download size={16} />
                  Download
                </button>
                <button className="btn btn-outline-danger d-flex align-items-center gap-2">
                  <Archive size={16} />
                  Archive
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
