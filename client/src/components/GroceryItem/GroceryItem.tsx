import styles from './GroceryItem.module.css';
import { useId, useState, useRef } from 'react';
import type { Grocery } from '../../models/Grocery';
import ContextMenu from '../ContextMenu/ContextMenu';
import { DropdownPrompt } from '../DropdownPrompt/DropdownPrompt';
import type { Aisle } from '../../models/Aisle';

export default function GroceryItem({
  onToggle: onToggle,
  highlighted,
  onOpenConextMenu,
  onCloseContextMenu,
  onAisleSet,
  onDelete,
  grocery,
  aisle,
  availableAisles,
}: {
  onToggle: () => void;
  highlighted: boolean;
  onOpenConextMenu: () => void;
  onCloseContextMenu: () => void;
  onAisleSet: (val: string | null) => void;
  onDelete: () => void;
  grocery: Grocery;
  aisle: Aisle | undefined;
  availableAisles: Aisle[];
}) {
  const id = useId();

  const startPos = useRef<{ x: number; y: number } | null>(null);
  const longPressTimeout = useRef<number | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [showPrompt, setShowPrompt] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!showPrompt) {
      const touch = e.touches[0];
      startPos.current = { x: touch.pageX, y: touch.pageY };

      longPressTimeout.current = setTimeout(() => {
        setMenuPos({
          x: Math.max(0, touch.pageX - 130),
          y: touch.pageY,
        });
        setMenuVisible(true);
        onOpenConextMenu();
      }, 500);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startPos.current || !longPressTimeout.current) return;

    const touch = e.touches[0];
    const dx = Math.abs(touch.pageX - startPos.current.x);
    const dy = Math.abs(touch.pageY - startPos.current.y);

    if (dx > 10 || dy > 10) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
  };

  const handleTouchEnd = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
    startPos.current = null;
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
    onCloseContextMenu();
  };

  return (
    <div
      className={`${styles['wrapper']} ${highlighted ? styles['wrapper-highlighted'] : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onContextMenu={(e) => {
        e.preventDefault();
        setMenuPos({ x: e.pageX, y: e.pageY });
        setMenuVisible(true);
      }}
      onClick={handleCloseMenu}
    >
      <label style={{ opacity: 0.5, padding: '0 0 0 0.75rem' }}>
        {aisle?.name ?? '[None]'}
      </label>
      <input
        type="checkbox"
        className={styles['inp-cbx']}
        id={id}
        onChange={onToggle}
        checked={grocery.isChecked}
      />
      <label className={styles['cbx']} htmlFor={id}>
        <span>
          <svg width="12px" height="9px" viewBox="0 0 12 9">
            <polyline points="1 5 4 8 11 1"></polyline>
          </svg>
        </span>
        <span>{`${grocery.name} ${grocery.quantity === '1' ? `` : `[${grocery.quantity}]`}`}</span>
      </label>

      <ContextMenu
        visible={menuVisible}
        position={menuPos}
        options={[
          {
            label: 'Set Aisle',
            onClick: () => setShowPrompt(true),
            disabled: false,
          },
          {
            label: 'Clear Aisle',
            onClick: () => onAisleSet(null),
            disabled: !aisle,
          },
          { label: 'Remove', onClick: onDelete, disabled: false },
        ]}
        onClose={handleCloseMenu}
      />

      <DropdownPrompt
        open={showPrompt}
        title={`Choose an aisle for '${grocery.name}'`}
        items={availableAisles.map(
          (a) => `${a.name}${a.description ? ` (${a.description})` : ``}`,
        )}
        onSubmit={(val) => {
          setShowPrompt(false);
          if (val != aisle?.name) onAisleSet(val);
        }}
        onCancel={() => setShowPrompt(false)}
      />
    </div>
  );
}
