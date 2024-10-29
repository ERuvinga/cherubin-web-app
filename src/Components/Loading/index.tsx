interface loadingDatas {
  contenteText: string;
  hiddenText: boolean;
}

const Loading = (datas: loadingDatas) => {
  return (
    <div className="ContainerLoading">
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

export default Loading;
