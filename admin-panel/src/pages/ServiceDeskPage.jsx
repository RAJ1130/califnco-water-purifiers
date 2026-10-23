import React, { useState } from 'react';
import { Wrench, Calendar, Clock, MapPin, User, CheckCircle2, Search, AlertTriangle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function ServiceDeskPage() {
  const { services, updateServiceStatus } = useAdmin();
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingService, setEditingService] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [technician, setTechnician] = useState('');

  const techniciansList = [
    "Ravi Kumar (Senior Technician)",
    "Arun Prakash (Installation Specialist)",
    "Deepak Sharma (RO Membrane Expert)",
    "Kishore Babu (Commercial Dispenser Tech)",
    "Unassigned"
  ];

  const filteredServices = services.filter((s) => {
    const matchesStatus = statusFilter === 'ALL' || s.status.toUpperCase() === statusFilter;
    const matchesSearch =
      s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.purifierModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.customerPhone.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenEdit = (srv) => {
    setEditingService(srv);
    setNewStatus(srv.status);
    setTechnician(srv.technicianAssigned);
  };

  const handleSaveService = () => {
    if (editingService) {
      updateServiceStatus(editingService.id, newStatus, technician);
      setEditingService(null);
    }
  };

  return (
    <div>
      {/* Filters & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Status Filters */}
        <div style={{ display: 'flex', gap: '8px', background: '#e2e8f0', padding: '4px', borderRadius: '10px' }}>
          {['ALL', 'REQUESTED', 'SCHEDULED', 'IN-PROGRESS', 'COMPLETED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`filter-tab ${statusFilter === st ? 'active' : ''}`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="search-input" style={{ width: '280px' }}>
          <Search size={15} color="#64748b" />
          <input
            type="text"
            placeholder="Search service, customer, model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px' }}
          />
        </div>
      </div>

      {/* Services Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Service Type & Purifier</th>
              <th>Customer Details</th>
              <th>Schedule Time</th>
              <th>Assigned Technician</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                  No service tickets found matching criteria.
                </td>
              </tr>
            ) : (
              filteredServices.map((srv) => (
                <tr key={srv.id}>
                  <td style={{ fontWeight: '700', color: '#0284c7' }}>{srv.id}</td>
                  <td>
                    <div>
                      <p style={{ fontWeight: '700', color: '#0f172a' }}>{srv.serviceType}</p>
                      <p style={{ fontSize: '12px', color: '#64748b' }}>{srv.purifierModel}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p style={{ fontWeight: '600', color: '#1e293b' }}>{srv.customerName}</p>
                      <p style={{ fontSize: '12px', color: '#64748b' }}>{srv.customerPhone}</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {srv.customerAddress}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{srv.preferredDate}</p>
                      <p style={{ fontSize: '12px', color: '#64748b' }}>{srv.timeSlot}</p>
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      fontSize: '12px', 
                      fontWeight: '600',
                      color: srv.technicianAssigned === 'Unassigned' ? '#dc2626' : '#047857'
                    }}>
                      {srv.technicianAssigned}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${srv.status.toLowerCase()}`}>
                      {srv.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleOpenEdit(srv)}
                      className="btn btn-outline btn-sm"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Update Service Modal */}
      {editingService && (
        <div className="modal-overlay" onClick={() => setEditingService(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '800' }}>Manage Ticket {editingService.id}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {editingService.serviceType} for {editingService.customerName}
              </p>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '18px' }}>
                <p style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Reported Problem / Note:</p>
                <p style={{ fontSize: '13px', color: '#0f172a', fontStyle: 'italic' }}>
                  "{editingService.problemDescription || 'Standard service check requested.'}"
                </p>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                  📍 {editingService.customerAddress}
                </p>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Assign Field Technician:
                </label>
                <select
                  value={technician}
                  onChange={(e) => setTechnician(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '13px',
                    backgroundColor: '#fff'
                  }}
                >
                  {techniciansList.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Service Ticket Status:
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '13px',
                    backgroundColor: '#fff'
                  }}
                >
                  <option value="Requested">Requested</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setEditingService(null)} className="btn btn-outline">
                Cancel
              </button>
              <button onClick={handleSaveService} className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
