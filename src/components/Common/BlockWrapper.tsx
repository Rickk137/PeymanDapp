import { ReactNode } from 'react';

interface BlockWrapperProps {
  label?: string;
  className?: string;
  children: ReactNode;
}

function BlockWrapper({ label, children, className = '' }: BlockWrapperProps) {
  return (
    <div className={className}>
      {label && <div className="text-white mb-3">{label}</div>}
      {children}
    </div>
  );
}

export default BlockWrapper;
