import "./ConfirmModal.css"
export const ConfirmModal = (props: any) => {
    const setShowConfirm = props.closeFunc;
    return <>
        <div className="confirm-modal-outter" >

        </div>
        <div style={{ fontSize: "70px", textAlign: "center", opacity: 1, zIndex: 3, position: "fixed", top: "0px" }}>🚧モーダル設置予定地🚧</div>

    </>
}