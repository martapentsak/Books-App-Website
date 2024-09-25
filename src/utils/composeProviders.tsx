interface Provider<TProps> {
    Component: React.ComponentType<React.PropsWithChildren<TProps>>;
    props?: Omit<TProps, "children">;
  }
  
  export function composeProviders<TProviders extends Array<Provider<any>>>(
    providers: TProviders
  ): React.ComponentType<React.PropsWithChildren> {
    const ProviderComponent: React.FunctionComponent<React.PropsWithChildren> = ({
      children,
    }) => {
      const initialJSX = <>{children}</>;
  
      return providers.reduceRight<JSX.Element>(
        (prevJSX, { Component: CurrentProvider, props = {} }) => {
          return <CurrentProvider {...props}>{prevJSX}</CurrentProvider>;
        },
        initialJSX
      );
    };
  
    return ProviderComponent;
  }