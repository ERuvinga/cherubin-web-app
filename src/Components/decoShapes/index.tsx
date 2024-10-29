interface descriptionShape {
  shape: string;
  wide: boolean;
}

const Shape = (datas: descriptionShape) => {
  return (
    <>
      {datas.shape == 'square' ? (
        <>
          {datas.wide ? (
            <div className="square wideSquare"></div>
          ) : (
            <div className="square"></div>
          )}
        </>
      ) : (
        <>
          {datas.wide ? (
            <div className="circle wideCircle"></div>
          ) : (
            <div className="circle"></div>
          )}
        </>
      )}
    </>
  );
};

export default Shape;
