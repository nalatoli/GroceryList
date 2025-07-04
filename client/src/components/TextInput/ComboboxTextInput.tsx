import styles from './TextInput.module.css';

export default function ComboboxTextInput({
  placeholder,
  value,
  options,
  onChange,
}: {
  placeholder: string;
  value: string;
  options: string[];
  onChange(text: string): void;
}) {
  return (
    <div className={styles['container']}>
      <input
        className={styles['text-input']}
        type="text"
        name="combo-options"
        list="combo-options"
        autoComplete="on"
        inputMode="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <datalist id="combo-options">
        {options.map((item, index) => (
          <option key={index} value={item} />
        ))}
      </datalist>
    </div>
  );
}
