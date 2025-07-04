import styles from './TextInput.module.css';

export default function TextInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange(text: string): void;
}) {
  return (
    <div className={styles['container']}>
      <input
        className={styles['text-input']}
        type="text"
        inputMode="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
