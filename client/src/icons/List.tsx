const ListSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="6" r="1.3" fill="#000000" />
    <circle cx="5" cy="10" r="1.3" fill="#000000" />
    <circle cx="5" cy="14" r="1.3" fill="#000000" />
    <line x1="8.5" y1="6" x2="15.5" y2="6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8.5" y1="10" x2="15.5" y2="10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8.5" y1="14" x2="15.5" y2="14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export default ListSVG
