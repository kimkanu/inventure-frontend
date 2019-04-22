export enum Layers {
  Header,
  Content,
  BottomNavigator,
  Dialogue,
  Dim,
}

export const layer: (layerName: Layers, offset?: number) => React.CSSProperties = (
  layerName,
  offset = 0,
) => {
  const layerNumber: number = (() => {
    switch (layerName) {
      case Layers.Header:
        return 7000;
      case Layers.Content:
        return 100;
      case Layers.BottomNavigator:
        return 8000;
      case Layers.Dialogue:
        return 9999;
      case Layers.Dim:
        return 9990;
    }
  })();
  return {
    zIndex: layerNumber + offset,
  };
};
