import { useState } from 'react';

const sampleProducts = [
  { id: 1, name: 'ABC Dry Powder Fire Extinguisher', category: 'Extinguisher', spec: '6 Kg, ISI Marked', price: '₹1,450', stock: 85, status: 'In Stock' },
  { id: 2, name: 'CO2 Fire Extinguisher', category: 'Extinguisher', spec: '4.5 Kg, Type B&C', price: '₹3,200', stock: 42, status: 'In Stock' },
  { id: 3, name: 'FM200 Suppression System', category: 'Suppression', spec: '10 Kg Cylinder, Auto Trigger', price: '₹28,500', stock: 8, status: 'Low Stock' },
  { id: 4, name: 'Conventional Fire Alarm Panel', category: 'Fire Alarm', spec: '4 Zone, 24V DC', price: '₹6,800', stock: 15, status: 'In Stock' },
  { id: 5, name: 'Smoke Detector (Conventional)', category: 'Detection', spec: 'Photoelectric, 9V', price: '₹380', stock: 0, status: 'Out of Stock' },
  { id: 6, name: 'IP CCTV Camera 4MP', category: 'CCTV', spec: '4MP, IR 30m, H.265', price: '₹2,900', stock: 30, status: 'In Stock' },
  { id: 7, name: 'Safety Helmet (Fire Rated)', category: 'PPE', spec: 'IS 2925, ABS Shell', price: '₹650', stock: 60, status: 'In Stock' },
];

const statusBadge: Record<string, string> = {
  'In Stock': 'badge bg-green',
  'Low Stock': 'badge bg-yellow',
  'Out of Stock': 'badge bg-red',
};

export default function Products() {
  const [modalOpen, setModalOpen] = useState(false);
  const [catFilter, setCatFilter] = useState('');
  const [form, setForm] = useState({ name: '', category: '', spec: '', price: '', stock: '', status: '' });

  const filtered = sampleProducts.filter(r => !catFilter || r.category === catFilter);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Products</h2>
        <p style={{ color: 'var(--muted)', margin: '4px 0 0' }}>Manage fire safety products and inventory.</p>
      </div>

      {/* Filters */}
      <div className="card mb-18">
        <div className="card-body">
          <div className="filter-row">
            <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
              <i className="fa fa-plus" /> Add Product
            </button>
            <select className="f-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
              <option value="">All Categories</option>
              <option>Extinguisher</option>
              <option>Suppression</option>
              <option>Fire Alarm</option>
              <option>Detection</option>
              <option>CCTV</option>
              <option>PPE</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-head">
          <span className="card-title">Product Inventory</span>
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>{filtered.length} products</span>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Specification</th>
                  <th>Unit Price (₹)</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td><strong>{r.name}</strong></td>
                    <td><span className="badge bg-blue">{r.category}</span></td>
                    <td style={{ color: 'var(--muted)', fontSize: 13 }}>{r.spec}</td>
                    <td>{r.price}</td>
                    <td>
                      <span style={{ fontWeight: 600, color: r.stock === 0 ? '#c0392b' : r.stock < 10 ? '#d97706' : 'var(--text)' }}>
                        {r.stock === 0 ? '—' : r.stock}
                      </span>
                    </td>
                    <td><span className={statusBadge[r.status]}>{r.status}</span></td>
                    <td>
                      <button className="btn btn-outline btn-sm"><i className="fa fa-edit" /></button>{' '}
                      <button className="btn btn-outline btn-sm"><i className="fa fa-trash" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <span className="modal-title">Add Product</span>
              <button className="modal-close" onClick={() => setModalOpen(false)}><i className="fa fa-times" /></button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label className="form-label">Product Name</label>
                <input className="form-input" placeholder="Enter product name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option value="">Select category</option>
                    <option>Extinguisher</option>
                    <option>Suppression</option>
                    <option>Fire Alarm</option>
                    <option>Detection</option>
                    <option>CCTV</option>
                    <option>PPE</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                    <option value="">Select status</option>
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Specification</label>
                <input className="form-input" placeholder="e.g. 6 Kg, ISI Marked" value={form.spec} onChange={e => setForm({ ...form, spec: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Unit Price (₹)</label>
                  <input className="form-input" placeholder="e.g. 1450" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                </div>
                <div className="form-field">
                  <label className="form-label">Stock Quantity</label>
                  <input className="form-input" type="number" placeholder="Enter quantity" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary">Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
