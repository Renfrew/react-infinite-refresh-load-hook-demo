# react-infinite-refresh-load-hook Demo

This is the demo of the react-infinite-refresh-load-hook `useInfiniteScroll`

[Home Page](https://github.com/Renfrew/react-infinite-refresh-load-hook/#readme)

## Possible library usage

```jsx
// Load More and refresh within a choosen container
const App = () => {
  const handleLoadMore = React.useCallback(() => {
    ...
  }, []);

  const handleRefresh = React.useCallback(() => {
    ...
  }, []);

  const [infiniteRef, onLoadAnchorRef, onRefreshAnchorRef] = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    onRefresh: handleRefresh,
  });

  return (
    <React.Fragment>
      {/* Set the container ref, which is scrollable */}
      {/* if this is not set, it will default to window */}
      <ul ref={infiniteRef}>
        {data.map((_, idx) => {
          if (idx === 0) {
            return (
              <li
                key={idx}
                // Set the ref of element that will fire Refresh
                // when it is visable on the container
                ref={onRefreshAnchorRef}
              >
                {idx}
              </li>
            );
          }
          if (idx === data.length - 2) {
            return (
              <li
                key={idx}
                // Set the ref of element that will fire loadMore
                // when it is visable on the container
                ref={onLoadAnchorRef}
              >
                {item.value}
              </li>
            );
          }
          return (
            <li key={idx}>{idx}</li>
          );
        })}
      </Scrollable>
    </React.Fragment>
  );
};
```

```jsx
// Only refresh when scroll the window up
const App = () => {
  const handleRefresh = React.useCallback(() => {
    ...
  }, []);

  const [, , onRefreshAnchorRef] = useInfiniteScroll({
    onRefresh: handleRefresh,
  });

  return (
    <React.Fragment>
      <ul>
        {data.map((_, idx) => {
          if (idx === 0) {
            return (
              <li
                key={idx}
                // Set the ref of element that will fire Refresh
                // when it is visable on the window
                ref={onRefreshAnchorRef}
              >
                {idx}
              </li>
            );
          }
          return (
            <li key={idx}>{idx}</li>
          );
        })}
      </Scrollable>
    </React.Fragment>
  );
};
```

```jsx
// Only Load More within a choosen container when scroll up
const App = () => {
  const handleLoadMore = React.useCallback(() => {
    ...
  }, []);

  const [infiniteRef, onLoadAnchorRef] = useInfiniteScroll({
    onLoadMore: handleLoadMore,
  });

  return (
    <React.Fragment>
      {/* Set the container ref, which is scrollable */}
      {/* if this is not set, it will default to window */}
      <ul ref={infiniteRef}>
        {data.map((_, idx) => {
          if (idx === 0) {
            return (
              <li
                key={idx}
                // Set the ref of element that will fire Refresh
                // when it is visable on the container
                ref={onLoadAnchorRef}
              >
                {idx}
              </li>
            );
          }
          return (
            <li key={idx}>{idx}</li>
          );
        })}
      </Scrollable>
    </React.Fragment>
  );
};
```
