import React from "react";
import styled from "styled-components";
import useInfiniteScroll from "react-infinite-refresh-load-hook";

interface Item {
  key: number;
  value: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ScollableNoHeight = styled.ul`
  background-color: "#E6E6FA";
`;

const Scrollable = styled.ul`
  list-style: none;
  overflow: scroll;
  height: 600px;
  width: 350px;
  background-color: grey;
`;

const ListItem = styled.li`
  background-color: #fafafa;
  border: 1px solid #99b4c0;
  padding: 8px;
  margin: 4px;
`;

function App() {
  const [data, setData] = React.useState<Item[]>([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const dataLength = React.useRef(0);

  const handleLoadMore = React.useCallback(() => {
    const newArray: Item[] = [];
    for (let i = 0; i < dataLength.current + 40; i++) {
      newArray.push({
        key: i,
        value: `This is item ${i}`,
      });
    }
    dataLength.current += 40;
    setData(newArray);
  }, []);

  const handleRefresh = React.useCallback(() => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
      }, 3000);
    }
  }, [isRefreshing]);

  const [infiniteRef, onLoadAnchorRef, onRefreshAnchorRef] = useInfiniteScroll<
    HTMLUListElement,
    HTMLLIElement,
    HTMLLIElement
  >({
    onLoadMore: handleLoadMore,
    onRefresh: handleRefresh,
  });

  const [, onLoadAnchorRef2, onRefreshAnchorRef2] = useInfiniteScroll<
    HTMLUListElement,
    HTMLLIElement,
    HTMLLIElement
  >({
    onLoadMore: handleLoadMore,
    onRefresh: handleRefresh,
  });

  React.useEffect(() => {
    handleLoadMore();
  }, [handleLoadMore]);

  return (
    <React.Fragment>
      <h1>Infinite List</h1>
      <h3>Created by using “react-infinite-refresh-load-hook”</h3>
      <Container>
        <Scrollable ref={infiniteRef} id="box">
          {isRefreshing && <div>Refreshing</div>}
          {data.map((item, idx) => {
            if (idx === 0) {
              return (
                <ListItem
                  key={item.key}
                  ref={onRefreshAnchorRef}
                  id={`item${item.key}`}
                >
                  {item.value}
                </ListItem>
              );
            }
            if (idx === data.length - 2) {
              return (
                <ListItem
                  key={item.key}
                  ref={onLoadAnchorRef}
                  id={`item${item.key}`}
                >
                  {item.value}
                </ListItem>
              );
            }
            return (
              <ListItem key={item.key} id={`item${item.key}`}>
                {item.value}
              </ListItem>
            );
          })}
        </Scrollable>
        <ScollableNoHeight id="box">
          {isRefreshing && <div>Refreshing</div>}
          {data.map((item, idx) => {
            if (idx === 0) {
              return (
                <ListItem
                  key={item.key}
                  ref={onRefreshAnchorRef2}
                  id={`item${item.key}`}
                >
                  {item.value}
                </ListItem>
              );
            }
            if (idx === data.length - 2) {
              return (
                <ListItem
                  key={item.key}
                  ref={onLoadAnchorRef2}
                  id={`item${item.key}`}
                >
                  {item.value}
                </ListItem>
              );
            }
            return (
              <ListItem key={item.key} id={`item${item.key}`}>
                {item.value}
              </ListItem>
            );
          })}
        </ScollableNoHeight>
      </Container>
    </React.Fragment>
  );
}

export default App;
