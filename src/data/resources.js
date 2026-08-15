export const resources = [
  { id: 'r1', name: 'Tablets', category: 'Digital', total: 12, available: 5, icon: 'tablet' },
  { id: 'r2', name: 'Books', category: 'Learning', total: 60, available: 30, icon: 'book' },
  { id: 'r3', name: 'Scholarships', category: 'Financial', total: 15, available: 8, icon: 'award' },
  { id: 'r4', name: 'Volunteers', category: 'People', total: 11, available: 3, icon: 'users' },
  { id: 'r5', name: 'Stationery Kits', category: 'Learning', total: 40, available: 22, icon: 'pencil' },
  { id: 'r6', name: 'Internet Dongles', category: 'Digital', total: 8, available: 3, icon: 'wifi' },
];

export const resourceRequests = [
  { id: 'rr1', studentId: 's1', studentName: 'Rahul Kumar', village: 'Rampur', need: 'Tablets', priority: 'critical', reason: 'No digital access + high dropout risk' },
  { id: 'rr2', studentId: 's3', studentName: 'Pooja Devi', village: 'Karahi', need: 'Scholarships', priority: 'critical', reason: 'Economic risk + family financial crisis' },
  { id: 'rr3', studentId: 's5', studentName: 'Aman Singh', village: 'Mahua', need: 'Tablets', priority: 'high', reason: 'No digital access for remote learning' },
  { id: 'rr4', studentId: 's8', studentName: 'Sunita Kumari', village: 'Rosera', need: 'Books', priority: 'high', reason: 'Cannot afford textbooks' },
  { id: 'rr5', studentId: 's12', studentName: 'Vikash Paswan', village: 'Rosera', need: 'Tablets', priority: 'critical', reason: 'No digital access + attendance dropping' },
  { id: 'rr6', studentId: 's15', studentName: 'Khushboo Raj', village: 'Mahua', need: 'Scholarships', priority: 'high', reason: 'At risk of leaving for work' },
  { id: 'rr7', studentId: 's18', studentName: 'Rajnish Kumar', village: 'Aurangabad', need: 'Books', priority: 'moderate', reason: 'Shared textbooks unavailable' },
];
