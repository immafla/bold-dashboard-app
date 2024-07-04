interface ICheckbox {
    ariaLabel?: string;
    id: string;
    checked: boolean;
    handleChange: () => any;
    label?: string;
    aditionalStyles?: any;
}

export const Checkbox = ({ ariaLabel, id, checked, handleChange, label, aditionalStyles }: ICheckbox): JSX.Element => {
    return (
        <div className={`${aditionalStyles}`}>
            <input
                type="checkbox"
                aria-label={ariaLabel}
                id={id}
                checked={checked}
                onChange={handleChange}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};