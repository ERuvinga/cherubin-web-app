interface loadingDatas {
  contenteText: string;
  hiddenText: boolean;
}

const LoadingComponent = (datas: loadingDatas) => {
  return (
    <div className="ContainerLoadingComponent">
      <div className="Snipper">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <>
        {datas.hiddenText ? null : (
          <span className="loadingText">{datas.contenteText}</span>
        )}
      </>
    </div>
  );
};

export default LoadingComponent;
