interface Provider<TProps> {
  (props: React.PropsWithChildren<TProps>): JSX.Element;
}
  
  export function composeProviders<TProviders extends Array<Provider<any>>>(
    providers: TProviders
  ): React.ComponentType<React.PropsWithChildren> {
    const ProviderComponent: React.FunctionComponent<React.PropsWithChildren> = ({
      children,
    }) => {
      const initialJSX = <>{children}</>;
  
      return providers.reduceRight<JSX.Element>(
        (prevJSX, CurrentProvider) => {
          return <CurrentProvider>{prevJSX}</CurrentProvider>;
        },
        initialJSX
      );
    };
  
    return ProviderComponent;
  }