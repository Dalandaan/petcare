const colors: Record<string, string> = {
  Active: 'bg-green-300 text-green-900',
  Inactive: 'bg-gray-300 text-gray-700',
  Completed: 'bg-green-300 text-green-900',
  Pending: 'bg-yellow-200 text-yellow-800',
  'In Progress': 'bg-blue-300 text-blue-900',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`px-3 py-0.5 rounded-full text-[11px] font-medium ${colors[status] ?? 'bg-gray-200'}`}>
      {status}
    </span>
  );
}