interface datasBtn {
  label: string;
  OnPressAction: () => void;
  disabled: boolean;
  loading: boolean;
}

const ButtonForm = (datas: datasBtn) => {
  return (
    <div className="ContainerBtnLoader">
      <>
        {datas.loading ? (
          <div className="sendDatasLoading"></div>
        ) : (
          <button
            className={
              datas.disabled || datas.loading
                ? 'sendDatasBtn disbledBtn'
                : 'sendDatasBtn'
            }
            onClick={datas.OnPressAction}
            disabled={datas.disabled || datas.loading}
          >
            {datas.label}
          </button>
        )}
      </>
    </div>
  );
};
export default ButtonForm;
