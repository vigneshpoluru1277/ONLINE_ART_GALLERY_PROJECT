import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';

export default function AdminPage(){
  const role = localStorage.getItem('role');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [refundTarget, setRefundTarget] = useState(null);
  const [refundAmount, setRefundAmount] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/users`);
      setUsers(res.data || []);
    } catch {
      setError('Unable to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (role === 'ADMIN') fetchUsers(); }, [role, fetchUsers]);

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user? This action cannot be undone.')) return;
    setActionLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/auth/users/${id}`);
      await fetchUsers();
    } catch {
      alert('Failed to delete');
    } finally { setActionLoading(false); }
  };

  const openRefund = (user) => { setRefundTarget(user); setRefundAmount(''); };

  const submitRefund = async () => {
    if (!refundTarget) return;
    const amt = parseFloat(refundAmount);
    if (!amt || amt <= 0) { alert('Enter a valid amount'); return; }
    setActionLoading(true);
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/users/${refundTarget.id}/refund`, { amount: amt });
      alert(res.data?.message || 'Refund successful');
      setRefundTarget(null);
      await fetchUsers();
    } catch {
      alert('Refund failed');
    } finally { setActionLoading(false); }
  };

  if(role !== 'ADMIN'){
    return (
      <div className="page-root">
        <div className="page-inner container">
          <h2 className="site-title">Access Denied</h2>
          <p className="muted">You must be an admin to view this page.</p>
        </div>
      </div>
    );
  }

  const filtered = useMemo(() => {
    const s = (search || '').toLowerCase().trim();
    return users.filter(u => {
      if (filterRole !== 'ALL' && String(u.role) !== filterRole) return false;
      if (!s) return true;
      return (u.username || '').toLowerCase().includes(s) || (u.email || '').toLowerCase().includes(s) || (u.name || '').toLowerCase().includes(s);
    });
  }, [users, filterRole, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page-1)*pageSize, page*pageSize);

  return (
    <div className="page-root">
      <div className="page-inner container">
        <h2 className="site-title">Admin Dashboard</h2>
        <p className="muted">Manage users: view sellers and buyers, delete accounts, and refund balances.</p>

        <div style={{display:'flex',gap:12,alignItems:'center',marginTop:12,flexWrap:'wrap'}}>
          <div style={{display:'flex',gap:8}}>
            <button className={`btn ${filterRole==='ALL'? 'btn-primary':''}`} onClick={() => { setFilterRole('ALL'); setPage(1); }}>All</button>
            <button className={`btn ${filterRole==='BUYER'? 'btn-primary':''}`} onClick={() => { setFilterRole('BUYER'); setPage(1); }}>Buyers</button>
            <button className={`btn ${filterRole==='SELLER'? 'btn-primary':''}`} onClick={() => { setFilterRole('SELLER'); setPage(1); }}>Sellers</button>
          </div>

          <div style={{marginLeft:'auto',display:'flex',gap:8,alignItems:'center'}}>
            <input placeholder="Search username, name, or email" value={search} onChange={e=>{setSearch(e.target.value); setPage(1);}} style={{padding:8,border:'1px solid #ddd',borderRadius:8}} />
            <button className="btn btn-outline" onClick={fetchUsers}>Refresh</button>
          </div>
        </div>

        {loading && <p style={{marginTop:12}}>Loading users...</p>}
        {error && <p className="muted">{error}</p>}

        <div style={{marginTop:16}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{textAlign:'left',borderBottom:'1px solid #eee'}}>
                <th style={{padding:'10px'}}>Username</th>
                <th style={{padding:'10px'}}>Name</th>
                <th style={{padding:'10px'}}>Email</th>
                <th style={{padding:'10px'}}>Role</th>
                <th style={{padding:'10px'}}>Balance</th>
                <th style={{padding:'10px',textAlign:'right'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map(u => (
                <tr key={u.id} style={{borderBottom:'1px solid #f3f4f6'}}>
                  <td style={{padding:10}}>{u.username}</td>
                  <td style={{padding:10}}>{u.name || '-'}</td>
                  <td style={{padding:10}}>{u.email || '-'}</td>
                  <td style={{padding:10}}>{u.role}</td>
                  <td style={{padding:10}}>₹{(u.balance || 0).toFixed(2)}</td>
                  <td style={{padding:10,textAlign:'right'}}>
                    <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
                      {String(u.role) === 'SELLER' && (
                        <button className="btn btn-outline" onClick={() => openRefund(u)}>Refund</button>
                      )}
                      <button className="btn btn-logout" onClick={() => deleteUser(u.id)} disabled={actionLoading}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:8,marginTop:16}}>
          <button className="btn btn-outline" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page<=1}>Prev</button>
          <span className="muted">Page {page} of {totalPages}</span>
          <button className="btn btn-outline" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page>=totalPages}>Next</button>
        </div>

        {refundTarget && (
          <div style={{position:'fixed',right:20,top:80,background:'var(--card)',padding:16,borderRadius:8,boxShadow:'var(--shadow)'}}>
            <h4 style={{margin:'0 0 8px'}}>Refund {refundTarget.username}</h4>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <input value={refundAmount} onChange={e=>setRefundAmount(e.target.value)} placeholder="Amount" type="number" style={{padding:8,border:'1px solid #ddd',borderRadius:6}} />
              <button className="btn btn-primary" onClick={submitRefund} disabled={actionLoading}>{actionLoading ? 'Sending...' : 'Send'}</button>
              <button className="btn btn-outline" onClick={()=>setRefundTarget(null)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
