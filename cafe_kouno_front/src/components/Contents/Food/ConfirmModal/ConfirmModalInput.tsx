import "./ConfirmModalInput.css"
export const ConfirmModalInput = (props: any) => {
    const setText = props.setEmail;
    const text = props.email;
    return (
        <div className="confirm-modal-form-input-outter">
            <div className="confirm-modal-form-input-label">{props.label}</div>
            <input className="confirm-modal-form-input" onChange={(c) => {
                setText(c.target.value ? c.target.value : "");//フロントエンドは書き換え可能なので、極力バックエンドで値のチェックを行いますねー
            }} type="email" value={text} autoComplete={props.autocomplete} />
        </div>
    )
}