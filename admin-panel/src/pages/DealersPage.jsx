import React, { useState } from 'react';
import { Check, X, ShieldCheck, AlertCircle, Building2, Phone, Mail, MapPin, Search } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function DealersPage() {
  const { dealers, approveDealer, rejectDealer } = useAdmin();
  const [tab, setTab] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReason, setRejectReason] = useState('GSTIN could not be verified on the official GST portal.');

  const filteredDealers = dealers.filter((d) => {
    const matchesTab = tab === 'ALL' || d.status.toUpperCase() === tab;
    const matchesSearch =
      d.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleConfirmReject = () => {
    if (rejectingId) {
      rejectDealer(rejectingId, rejectReason);
      setRejectingId(null);
    }
  };

  return (
    <div>
      {/* Top Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '8px', background: '#e2e8f0', padding: '4px', borderRadius: '10px' }}>
          {[
            { id: 'ALL', label: 'All Dealers' },
            { id: 'PENDING', label: 'Pending Verification' },
            { id: 'APPROVED', label: 'Approved Dealers' },
            { id: 'REJECTED', label: 'Rejected Applications' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`filter-tab ${tab === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="search-input" style={{ width: '280px' }}>
          <Search size={15} color="#64748b" />
          <input
            type="text"
            placeholder="Search company, GSTIN, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px' }}
          />
        </div>
      </div>

      {/* Dealers Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Business / Company</th>
              <th>Proprietor Details</th>
              <th>GSTIN Number</th>
              <th>Location</th>
              <th>Annual Volume</th>
              <th>Status</th>
              <th>Approval Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDealers.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                  No dealer records found matching this view.
                </td>
              </tr>
            ) : (
              filteredDealers.map((d) => (
                <tr key={d.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ padding: '8px', backgroundColor: '#f1f5f9', borderRadius: '8px', color: '#475569' }}>
                        <Building2 size={18} />
                      </div>
                      <div>
                        <p style={{ fontWeight: '700', color: '#0f172a' }}>{d.companyName}</p>
                        <p style={{ fontSize: '11px', color: '#64748b' }}>ID: {d.id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p style={{ fontWeight: '600', color: '#1e293b' }}>{d.name}</p>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>{d.phone}</p>
                    <p style={{ fontSize: '11px', color: '#94a3b8' }}>{d.email}</p>
                  </td>
                  <td>
                    <span style={{ 
                      fontFamily: 'monospace', 
                      fontSize: '12px', 
                      fontWeight: '700', 
                      padding: '3px 8px', 
                      background: '#f8fafc', 
                      border: '1px solid var(--border)', 
                      borderRadius: '4px',
                      color: '#0f172a' 
                    }}>
                      {d.gstin}
                    </span>
                  </td>
                  <td>
                    <p style={{ fontSize: '13px', fontWeight: '500' }}>{d.city}, {d.state}</p>
                  </td>
                  <td>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{d.annualTurnover}</p>
                    <p style={{ fontSize: '11px', color: '#64748b' }}>Orders placed: {d.totalOrders}</p>
                  </td>
                  <td>
                    <span className={`badge badge-${d.status}`}>
                      {d.status}
                    </span>
                    {d.status === 'rejected' && d.rejectionReason && (
                      <p style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', maxWidth: '180px' }}>
                        {d.rejectionReason}
                      </p>
                    )}
                  </td>
                  <td>
                    {d.status === 'pending' ? (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => approveDealer(d.id)}
                          className="btn btn-success btn-sm"
                          title="Grant Wholesale Pricing"
                        >
                          <Check size={14} /> Approve
                        </button>
                        <button
                          onClick={() => setRejectingId(d.id)}
                          className="btn btn-danger btn-sm"
                          title="Reject Dealer Application"
                        >
                          <X size={14} /> Reject
                        </button>
                      </div>
                    ) : d.status === 'approved' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', color: '#059669', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <ShieldCheck size={15} /> Wholesale Active
                        </span>
                        <button
                          onClick={() => setRejectingId(d.id)}
                          style={{ fontSize: '11px', color: '#94a3b8', textDecoration: 'underline' }}
                        >
                          Revoke
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => approveDealer(d.id)}
                        className="btn btn-outline btn-sm"
                      >
                        Re-Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Reject Modal */}
      {rejectingId && (
        <div className="modal-overlay" onClick={() => setRejectingId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#991b1b' }}>Reject Dealer Application</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Select a reason for rejecting this dealer application:
              </p>
            </div>

            <div style={{ padding: '24px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '8px' }}>
                Rejection Reason:
              </label>
              <select
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  fontSize: '13px',
                  marginBottom: '16px'
                }}
              >
                <option value="GSTIN could not be verified on the official GST portal.">GSTIN could not be verified on the official GST portal.</option>
                <option value="Applicant business does not meet minimum annual turnover requirement.">Applicant business does not meet minimum annual turnover requirement.</option>
                <option value="Duplicate registration with existing active dealer account in this territory.">Duplicate registration with existing active dealer account in this territory.</option>
                <option value="Incomplete trade credentials and business address proof.">Incomplete trade credentials and business address proof.</option>
              </select>

              <div style={{ padding: '12px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca', display: 'flex', gap: '8px' }}>
                <AlertCircle size={18} color="#ef4444" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '12px', color: '#991b1b' }}>
                  The dealer will receive an automated notification stating this reason and will not be able to order at wholesale pricing.
                </p>
              </div>
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setRejectingId(null)} className="btn btn-outline">
                Cancel
              </button>
              <button onClick={handleConfirmReject} className="btn btn-danger">
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
