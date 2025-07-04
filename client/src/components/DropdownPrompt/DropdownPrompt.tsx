import styles from './DropdownPrompt.module.css';
import { useState } from 'react';

export function DropdownPrompt({
  open,
  title,
  items,
  onSubmit,
  onCancel,
}: {
  open: boolean;
  title: string;
  items: string[];
  onSubmit: (value: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState('');

  if (!open) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          className={styles.combobox}
        >
          <option value="" disabled>
            Select an option
          </option>
          {items.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className={styles.buttons}>
          <button onClick={() => onSubmit(value)} className={styles.button}>
            OK
          </button>
          <button onClick={onCancel} className={styles.button}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
