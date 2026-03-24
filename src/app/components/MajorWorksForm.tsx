import { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, ChevronDown } from 'lucide-react';

interface MajorWorksFormProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  isEditMode?: boolean;
}

export default function MajorWorksForm({ onCancel, onSubmit, initialData, isEditMode = false }: MajorWorksFormProps) {
  // Phase 1: Single page form with basic info and documents
  const defaultFormData = {
    projectName: '',
    estate: '',
    building: '',
    totalCost: '',
    managementFee: '',
    surveyorFee: '',
    consultationStage: 'notice-of-intention',
    assignedTo: [],
    uploadedFiles: []
  };
  
  const [formData, setFormData] = useState({ ...defaultFormData, ...initialData });
  const [isDragging, setIsDragging] = useState(false);
  const [isAssignDropdownOpen, setIsAssignDropdownOpen] = useState(false);
  const assignDropdownRef = useRef<HTMLDivElement>(null);

  const availableUsers = [
    'John Smith',
    'Sarah Johnson',
    'Michael Brown',
    'Emily Davis',
    'David Wilson',
    'Lisa Anderson',
    'James Taylor',
    'Emma Thompson'
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (assignDropdownRef.current && !assignDropdownRef.current.contains(event.target as Node)) {
        setIsAssignDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleUserToggle = (user: string) => {
    const currentAssigned = formData.assignedTo || [];
    const isSelected = currentAssigned.includes(user);
    
    if (isSelected) {
      handleChange('assignedTo', currentAssigned.filter((u: string) => u !== user));
    } else {
      handleChange('assignedTo', [...currentAssigned, user]);
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files).map(file => ({
      name: file.name,
      size: file.size,
      uploadDate: new Date().toISOString(),
      type: file.type
    }));

    setFormData({
      ...formData,
      uploadedFiles: [...formData.uploadedFiles, ...newFiles]
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [formData]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...formData.uploadedFiles];
    newFiles.splice(index, 1);
    setFormData({ ...formData, uploadedFiles: newFiles });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const calculateFeeAmount = (totalCost: string, feePercentage: string) => {
    const cost = parseFloat(totalCost);
    const percentage = parseFloat(feePercentage);
    if (isNaN(cost) || isNaN(percentage)) return null;
    return (cost * percentage) / 100;
  };

  return (
    <div className="container-fluid p-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          {/* Form Content */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              {/* Basic Project & Property Info */}
              <div className="mb-5">
                <h4 className="mb-4">Basic Major Works & Property Information</h4>
                
                <div className="mb-3">
                  <label className="form-label">Major works</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.projectName}
                    onChange={(e) => handleChange('projectName', e.target.value)}
                    placeholder="Enter major works name"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Estate</label>
                    <select
                      className="form-select"
                      value={formData.estate}
                      onChange={(e) => {
                        handleChange('estate', e.target.value);
                        // Reset building when estate changes
                        handleChange('building', '');
                      }}
                      disabled={isEditMode}
                    >
                      <option value="">Select estate</option>
                      <option value="No estate">No estate</option>
                      <option value="Burns Court">Burns Court</option>
                      <option value="Riverside Apartments">Riverside Apartments</option>
                      <option value="Parkside Estate">Parkside Estate</option>
                      <option value="Westside Towers">Westside Towers</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Building</label>
                    <select
                      className="form-select"
                      value={formData.building}
                      onChange={(e) => handleChange('building', e.target.value)}
                      disabled={isEditMode}
                    >
                      <option value="">Select building</option>
                      {formData.estate === 'No estate' ? (
                        <>
                          <option value="Standalone Tower">Standalone Tower</option>
                          <option value="Independent Building">Independent Building</option>
                          <option value="Single Property Block">Single Property Block</option>
                          <option value="Commercial Building">Commercial Building</option>
                          <option value="Mixed Use Building">Mixed Use Building</option>
                        </>
                      ) : (
                        <>
                          <option value="Riverside Block">Riverside Block</option>
                          <option value="Parkview Block">Parkview Block</option>
                          <option value="Central Tower">Central Tower</option>
                          <option value="Tower A">Tower A</option>
                          <option value="Tower B">Tower B</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Estimated Budget (inc. VAT)</label>
                  <div className="input-group">
                    <span className="input-group-text">£</span>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.totalCost}
                      onChange={(e) => handleChange('totalCost', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Management Fee</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        value={formData.managementFee}
                        onChange={(e) => handleChange('managementFee', e.target.value)}
                        placeholder="0"
                        step="0.01"
                      />
                      <span className="input-group-text">%</span>
                    </div>
                    {formData.totalCost && formData.managementFee && calculateFeeAmount(formData.totalCost, formData.managementFee) !== null && (
                      <small className="text-muted mt-1 d-block">
                        Amount: {formatCurrency(calculateFeeAmount(formData.totalCost, formData.managementFee)!)}
                      </small>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Surveyor Fee</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        value={formData.surveyorFee}
                        onChange={(e) => handleChange('surveyorFee', e.target.value)}
                        placeholder="0"
                        step="0.01"
                      />
                      <span className="input-group-text">%</span>
                    </div>
                    {formData.totalCost && formData.surveyorFee && calculateFeeAmount(formData.totalCost, formData.surveyorFee) !== null && (
                      <small className="text-muted mt-1 d-block">
                        Amount: {formatCurrency(calculateFeeAmount(formData.totalCost, formData.surveyorFee)!)}
                      </small>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Assign To</label>
                  <div className="position-relative" ref={assignDropdownRef}>
                    <div
                      className="form-select d-flex justify-content-between align-items-center"
                      onClick={() => setIsAssignDropdownOpen(!isAssignDropdownOpen)}
                      style={{ cursor: 'pointer' }}
                    >
                      <span className={formData.assignedTo.length === 0 ? 'text-muted' : ''}>
                        {formData.assignedTo.length === 0
                          ? 'Select users'
                          : `${formData.assignedTo.length} user${formData.assignedTo.length > 1 ? 's' : ''} selected`}
                      </span>
                      <ChevronDown size={16} />
                    </div>
                    {isAssignDropdownOpen && (
                      <div
                        className="position-absolute w-100 border rounded bg-white shadow-sm"
                        style={{ zIndex: 1000, maxHeight: '250px', overflowY: 'auto', top: '100%', marginTop: '4px' }}
                      >
                        {availableUsers.map((user) => (
                          <div
                            key={user}
                            className="px-3 py-2 d-flex align-items-center"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleUserToggle(user)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                          >
                            <input
                              type="checkbox"
                              className="form-check-input me-2"
                              checked={formData.assignedTo.includes(user)}
                              onChange={() => {}}
                              style={{ cursor: 'pointer', accentColor: '#0B81C5' }}
                            />
                            <label className="form-check-label mb-0" style={{ cursor: 'pointer' }}>
                              {user}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div>
                <h4 className="mb-4">Document Upload</h4>

                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded p-5 mb-4 d-flex flex-column align-items-center justify-content-center ${
                    isDragging ? 'border-primary bg-light' : 'border-secondary'
                  }`}
                  style={{ cursor: 'pointer' }}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
                  <Upload size={48} className="text-muted mb-3" />
                  <p className="mb-2 text-center">Drag and drop files here, or click to browse</p>
                  <small className="text-muted text-center">Supports all file types</small>
                  <input
                    id="fileInput"
                    type="file"
                    multiple
                    style={{ display: 'none' }}
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </div>

                {/* Uploaded Files List */}
                {formData.uploadedFiles.length > 0 && (
                  <div>
                    <h5 className="mb-3">Uploaded Documents ({formData.uploadedFiles.length})</h5>
                    <div className="list-group">
                      {formData.uploadedFiles.map((file: any, index: number) => (
                        <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <div className="fw-medium">{file.name}</div>
                            <small className="text-muted">{formatFileSize(file.size)}</small>
                          </div>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveFile(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                <button
                  className="btn btn-outline-secondary"
                  onClick={onCancel}
                >
                  Cancel
                </button>

                <button className="btn btn-primary" onClick={handleSubmit}>
                  {isEditMode ? 'Save Changes' : 'Create Major Works'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}