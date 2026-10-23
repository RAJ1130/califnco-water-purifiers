import React from 'react';
import { 
  IndianRupee, 
  ShoppingBag, 
  Users, 
  Wrench, 
  ArrowUpRight, 
  Check, 
  X, 
  Clock, 
  ChevronRight,
  TrendingUp,
  PackageCheck
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function Dashboard({ setActiveTab }) {
  const { stats, orders, dealers, services, approveDealer, rejectDealer, updateOrderStatus } = useAdmin();

  const recentOrders = orders.slice(0, 4);
  const pendingDealers = dealers.filter(d => d.status === 'pending');
  const pendingServices = services.filter(s => s.status === 'Requested' || s.status === 'Scheduled');

  return (
    <div>
      {/* Metrics Row */}
      <div className="stat-grid">
        <div className="card" style={{ borderLeft: '4px solid #0284c7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Total Revenue</p>
              <h3 style={{ fontSize: '26px', fontWeight: '800', marginTop: '6px', color: '#0f172a' }}>
                ₹{stats.totalRevenue.toLocaleString('en-IN')}
              </h3>
            </div>
            <div style={{ padding: '10px', backgroundColor: '#e0f2fe', borderRadius: '10px', color: '#0284c7' }}>
              <IndianRupee size={22} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px', fontSize: '12px', color: '#10b981', fontWeight: '600' }}>
            <TrendingUp size={14} />
            <span>+24.5% from last week</span>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Total Orders</p>
              <h3 style={{ fontSize: '26px', fontWeight: '800', marginTop: '6px', color: '#0f172a' }}>
                {stats.totalOrders}
              </h3>
            </div>
            <div style={{ padding: '10px', backgroundColor: '#d1fae5', borderRadius: '10px', color: '#10b981' }}>
              <ShoppingBag size={22} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span>{stats.pendingOrders} pending fulfillment</span>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Dealer Applications</p>
              <h3 style={{ fontSize: '26px', fontWeight: '800', marginTop: '6px', color: '#0f172a' }}>
                {stats.approvedDealers} <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>/ {dealers.length}</span>
              </h3>
            </div>
            <div style={{ padding: '10px', backgroundColor: '#fef3c7', borderRadius: '10px', color: '#f59e0b' }}>
              <Users size={22} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px', fontSize: '12px', color: stats.pendingDealers ? '#b45309' : '#10b981', fontWeight: '600' }}>
            <span>{stats.pendingDealers} pending verification</span>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #6366f1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Open Service Tickets</p>
              <h3 style={{ fontSize: '26px', fontWeight: '800', marginTop: '6px', color: '#0f172a' }}>
                {stats.openServices}
              </h3>
            </div>
            <div style={{ padding: '10px', backgroundColor: '#e0e7ff', borderRadius: '10px', color: '#6366f1' }}>
              <Wrench size={22} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px', fontSize: '12px', color: '#6366f1', fontWeight: '600' }}>
            <span>Field technicians dispatched</span>
          </div>
        </div>
      </div>

      {/* Grid: Pending Dealer Approvals & Service Desk */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        
        {/* Pending Dealers Desk */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '800' }}>Pending Dealer Approvals</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Review and grant wholesale pricing access</p>
            </div>
            <button 
              onClick={() => setActiveTab('dealers')}
              className="btn btn-outline btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              View All <ChevronRight size={14} />
            </button>
          </div>

          {pendingDealers.length === 0 ? (
            <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <PackageCheck size={36} color="#10b981" style={{ margin: '0 auto 8px' }} />
              <p style={{ fontSize: '14px', fontWeight: '600' }}>All dealer applications processed</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pendingDealers.map((dealer) => (
                <div 
                  key={dealer.id}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    backgroundColor: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h5 style={{ fontSize: '14px', fontWeight: '700' }}>{dealer.companyName}</h5>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {dealer.name} • {dealer.city}, {dealer.state}
                    </p>
                    <p style={{ fontSize: '11px', color: '#0369a1', fontWeight: '600', marginTop: '2px' }}>
                      GSTIN: {dealer.gstin} • Est. Turnover: {dealer.annualTurnover}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => approveDealer(dealer.id)}
                      className="btn btn-success btn-sm"
                      title="Approve Wholesale Access"
                    >
                      <Check size={14} /> Approve
                    </button>
                    <button
                      onClick={() => rejectDealer(dealer.id)}
                      className="btn btn-danger btn-sm"
                      title="Reject Application"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Service Requests Widget */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '800' }}>Active Service Bookings</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Filter replacement & repair schedule</p>
            </div>
            <button 
              onClick={() => setActiveTab('services')}
              className="btn btn-outline btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              View Service Desk <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pendingServices.map((srv) => (
              <div 
                key={srv.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  backgroundColor: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className={`badge badge-${srv.status.toLowerCase()}`}>
                      {srv.status}
                    </span>
                    <h5 style={{ fontSize: '14px', fontWeight: '700', marginTop: '6px' }}>{srv.serviceType}</h5>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {srv.customerName} ({srv.customerPhone})
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>{srv.preferredDate}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{srv.timeSlot}</p>
                  </div>
                </div>
                <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
                  <span>Assigned: <strong>{srv.technicianAssigned}</strong></span>
                  <span>{srv.purifierModel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Orders Overview */}
      <div className="table-container">
        <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '800' }}>Recent Orders (Customer & Dealer)</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Live order pipeline and fulfillment status</p>
          </div>
          <button 
            onClick={() => setActiveTab('orders')}
            className="btn btn-primary btn-sm"
          >
            Manage All Orders
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer / Dealer</th>
              <th>Type</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Quick Action</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((ord) => (
              <tr key={ord.id}>
                <td style={{ fontWeight: '700', color: '#0284c7' }}>{ord.id}</td>
                <td>
                  <div>
                    <p style={{ fontWeight: '600', color: '#0f172a' }}>{ord.customerName}</p>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>{ord.address.city}, {ord.address.state}</p>
                  </div>
                </td>
                <td>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: '700', 
                    padding: '3px 8px', 
                    borderRadius: '4px',
                    backgroundColor: ord.userRole === 'dealer' ? '#f3e8ff' : '#f1f5f9',
                    color: ord.userRole === 'dealer' ? '#7e22ce' : '#475569'
                  }}>
                    {ord.userRole === 'dealer' ? 'Wholesale Dealer' : 'Retail Customer'}
                  </span>
                </td>
                <td>{ord.items.length} items</td>
                <td style={{ fontWeight: '700' }}>₹{ord.total.toLocaleString('en-IN')}</td>
                <td>
                  <span className={`badge badge-${ord.paymentStatus.toLowerCase()}`}>
                    {ord.paymentStatus}
                  </span>
                </td>
                <td>
                  <span className={`badge badge-${ord.orderStatus.toLowerCase()}`}>
                    {ord.orderStatus}
                  </span>
                </td>
                <td>
                  <select
                    value={ord.orderStatus}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid var(--border)',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: '#f8fafc',
                      outline: 'none'
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
