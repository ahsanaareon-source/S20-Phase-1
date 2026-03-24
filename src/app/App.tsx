import { useState } from 'react';
import { Lock, LogOut } from 'lucide-react';
import Sidebar from './components/Sidebar';
import EmptyState from './components/EmptyState';
import MajorWorksForm from './components/MajorWorksForm';
import MajorWorksList from './components/MajorWorksList';
import MajorWorksDetail from './components/MajorWorksDetail';

const PROTOTYPE_ACCESS_PASSWORD = 'majorworks-demo';
const PROTOTYPE_SESSION_KEY = 'majorWorksPhase1PrototypeAuthenticated';

export default function App() {
  const [currentView, setCurrentView] = useState<'list' | 'empty' | 'form' | 'detail'>('list');
  const [formData, setFormData] = useState<any>(null);
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('major-works');
  const [majorWorks, setMajorWorks] = useState<any[]>([]); // Store all major works with timeline data
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem(PROTOTYPE_SESSION_KEY) === 'true');
  const [accessPassword, setAccessPassword] = useState('');
  const [accessError, setAccessError] = useState('');

  const handleAuthenticate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (accessPassword === PROTOTYPE_ACCESS_PASSWORD) {
      sessionStorage.setItem(PROTOTYPE_SESSION_KEY, 'true');
      setIsAuthenticated(true);
      setAccessPassword('');
      setAccessError('');
      return;
    }

    setAccessError('Incorrect password. Try again.');
  };

  const handleLogout = () => {
    sessionStorage.removeItem(PROTOTYPE_SESSION_KEY);
    setIsAuthenticated(false);
    setAccessPassword('');
    setAccessError('');
  };

  const handleCreateClick = () => {
    setFormData(null); // Reset form data to original state
    setSelectedWork(null); // Clear selected work for create mode
    setCurrentView('form');
  };

  const handleEditClick = () => {
    if (selectedWork) {
      setFormData(selectedWork.formData); // Set form data for editing
      setCurrentView('form');
    }
  };

  const handleFormCancel = () => {
    setCurrentView('list');
  };

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    
    if (selectedWork) {
      // Edit mode - update existing work
      const updatedWork = {
        ...selectedWork,
        title: data.projectName || 'Untitled Major Works',
        managementFee: parseFloat(data.managementFee) || 0,
        totalCost: parseFloat(data.totalCost) || 0,
        formData: data, // Update the form data
      };
      
      // Update in major works list
      setMajorWorks(majorWorks.map(work => 
        work.id === selectedWork.id ? updatedWork : work
      ));
      setSelectedWork(updatedWork);
      setCurrentView('detail');
    } else {
      // Create mode - add new work
      const newWork = {
        id: 'new-' + Date.now(),
        title: data.projectName || 'Untitled Major Works',
        estate: data.estate || 'N/A',
        building: data.building || 'N/A',
        location: `${data.estate || 'N/A'} - ${data.building || 'N/A'}`,
        managementFee: parseFloat(data.managementFee) || 0,
        totalCost: parseFloat(data.totalCost) || 0,
        formData: data, // Store the complete form data
        isNew: true,
        createdAt: new Date().toISOString(),
        stageCompletion: {
          'notice-of-intention': false,
          'tender': false,
          'estimates': false,
          'reasons': false,
          'completion': false
        }
      };
      
      // Add to major works list
      setMajorWorks([...majorWorks, newWork]);
      setSelectedWork(newWork);
      setCurrentView('detail');
    }
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedWork(null);
  };

  const handleViewDetail = (work: any) => {
    setSelectedWork(work);
    setCurrentView('detail');
  };
  
  const handleUpdateTimeline = (workId: string, stageCompletion: any) => {
    // Update the stage completion for a specific work
    setMajorWorks(majorWorks.map(work => 
      work.id === workId 
        ? { ...work, stageCompletion }
        : work
    ));
    
    // Also update selected work if it's the same
    if (selectedWork?.id === workId) {
      setSelectedWork({ ...selectedWork, stageCompletion });
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNavigate = (page: string) => {
    if (page === 'major-works') {
      setCurrentView('list');
      setSelectedWork(null);
      setActivePage('major-works');
    }
    // Add other navigation handlers here as needed
    console.log('Navigate to:', page);
  };

  if (!isAuthenticated) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center px-3"
        style={{
          background:
            'linear-gradient(135deg, rgba(15,23,42,0.96) 0%, rgba(30,41,59,0.92) 45%, rgba(51,65,85,0.9) 100%)'
        }}
      >
        <div className="w-100" style={{ maxWidth: '440px' }}>
          <div className="card border-0 shadow-lg" style={{ borderRadius: '20px' }}>
            <div className="card-body p-4 p-lg-5">
              <div className="d-flex align-items-center justify-content-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{ width: '64px', height: '64px', backgroundColor: '#eef2ff', color: '#4338ca' }}
                >
                  <Lock size={28} />
                </div>
              </div>
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center gap-2 mb-3">
                  <h3 className="mb-0">Major works</h3>
                  <span
                    className="badge"
                    style={{
                      color: '#C85D12',
                      backgroundColor: 'transparent',
                      border: '1px solid #F4C38A',
                      borderRadius: '5px',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      lineHeight: 1,
                      padding: '0.22rem 0.42rem'
                    }}
                  >
                    PHASE 1
                  </span>
                </div>
                <p className="text-muted mb-0">Enter the shared password to access this prototype.</p>
              </div>

              <form onSubmit={handleAuthenticate}>
                <div className="mb-3">
                  <label htmlFor="phase1-prototype-password" className="form-label fw-medium">
                    Password
                  </label>
                  <input
                    id="phase1-prototype-password"
                    type="password"
                    className={`form-control ${accessError ? 'is-invalid' : ''}`}
                    value={accessPassword}
                    onChange={(event) => {
                      setAccessPassword(event.target.value);
                      if (accessError) setAccessError('');
                    }}
                    placeholder="Enter password"
                    autoFocus
                  />
                  {accessError && <div className="invalid-feedback">{accessError}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Enter prototype
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex vh-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        activePage={activePage}
        onNavigate={handleNavigate} 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        onCreateMajorWorks={handleCreateClick}
      />

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Header */}
        <div className="bg-white border-bottom p-3">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-3">
                  {currentView !== 'list' && (
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={handleBackToList}
                    >
                      ← Back
                    </button>
                  )}
                  <div className="d-flex align-items-center gap-2">
                    <h4 className="mb-0">Major works</h4>
                    <span
                      className="badge"
                      style={{
                        color: '#C85D12',
                        backgroundColor: 'transparent',
                        border: '1px solid #F4C38A',
                        borderRadius: '5px',
                        fontSize: '9px',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        lineHeight: 1,
                        padding: '0.22rem 0.42rem'
                      }}
                    >
                      PHASE 1
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <button className="btn btn-outline-secondary d-flex align-items-center gap-2" onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow-1 overflow-auto bg-light">
          {currentView === 'list' && <MajorWorksList onCreateNew={handleCreateClick} onViewDetail={handleViewDetail} majorWorks={majorWorks} />}
          
          {currentView === 'empty' && <EmptyState onCreateClick={handleCreateClick} />}
          
          {currentView === 'form' && (
            <MajorWorksForm 
              onCancel={handleFormCancel} 
              onSubmit={handleFormSubmit}
              initialData={formData}
              isEditMode={selectedWork !== null}
            />
          )}
          
          {currentView === 'detail' && selectedWork && (
            <MajorWorksDetail 
              work={selectedWork}
              onBack={handleBackToList}
              onUpdateTimeline={handleUpdateTimeline}
              onEdit={handleEditClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
