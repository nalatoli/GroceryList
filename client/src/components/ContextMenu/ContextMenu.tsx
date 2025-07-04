import styles from './ContextMenu.module.css';
import { useEffect, useRef } from 'react';

export default function ContextMenu({
  visible,
  position,
  options,
  onClose,
}: {
  visible: boolean;
  position: { x: number; y: number };
  options: { label: string; disabled: boolean; onClick: () => void }[];
  onClose: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      ref={menuRef}
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        background: 'var(--contextmenu-background)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 1000,
      }}
      className={styles.container}
      onClick={onClose}
    >
      {options.map((option, index) => (
        <div
          key={index}
          style={{
            padding: '10px',
            borderBottom:
              index !== options.length - 1 ? '1px solid #eee' : 'none',
            cursor: option.disabled ? 'not-allowed' : 'pointer',
            color: option.disabled ? '#aaa' : 'inherit',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (option.disabled) return;
            option.onClick();
            onClose();
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
}
