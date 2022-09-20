import { useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";

import styles from "./css/EditableText.module.css";


export default function EditableText(props: React.InputHTMLAttributes<HTMLInputElement> & {
    type?: "text" | "number",
    min?: number
    max?: number
}) {

    const [isDisabled, setDisabled] = useState(props.disabled);
    const [value, setValue] = useState(props.value?.toString() || "")

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isDisabled) inputRef.current?.focus();
    });


    return (
        <div className={styles.container}>
            <IconButton type="button" icon="edit" onClick={e => {
                 setDisabled(!isDisabled)
            }}/>
            <input {...props} type="text" disabled={isDisabled} value={value} ref={inputRef} onBlur={e => {
                setDisabled(true);
                if (props.onBlur) props.onBlur(e);
            }} onChange={e => {
                if (props.type == "number") {
                    const re = /^[0-9\b]+$/;
                    if (e.target.value === "" || re.test(e.target.value)) {
                        if (e.target.value) {
                            const num = parseInt(e.target.value);
                            if (!(props.min && num >= props.min)) return;
                            if (!(props.max && num <= props.max)) return;
                        }
                        setValue(e.target.value);
                        if (props.onChange) props.onChange(e);
                    }
                }else {
                    setValue(e.target.value)
                    if (props.onChange) props.onChange(e);
                }
            }}/>
        </div>
    )
}