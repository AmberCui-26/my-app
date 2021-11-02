import AppLayout from "../../../../component/layout/layout";
import CourseCard from "../../../../component/courseCard/cardLayout";
import { getCourseInfo } from "../../../../lib/services/apiService";
import { useCallback, useEffect, useState } from "react";
import { List, Skeleton, Divider, BackTop } from "antd";
import { CoursesResponse } from "../../../../lib/modal/response";
import InfiniteScroll from "react-infinite-scroll-component";
import { VerticalAlignTopOutlined } from "@ant-design/icons";

export default function FirstPost() {
  const [courseInfo, setCourseInfo] = useState<CoursesResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>();

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    console.log("pag", page);
    const params = { page: page, limit: 20 };
    getCourseInfo(params)
      .then((res) => {
        setTotal(res.data.data.total);
        setCourseInfo([...courseInfo, ...res.data.data.courses]);
        setLoading(false);
        setPage((prev) => prev + 1);
      })
      .catch((error) => setLoading(false));
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <AppLayout>
      <div
        id="scrollableDiv"
        style={{
          backgroundColor: "#fff",
          margin: "20px",
        }}
      >
        <InfiniteScroll
          dataLength={courseInfo.length}
          next={loadMoreData}
          hasMore={courseInfo.length < total}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>No More Course!</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            grid={{
              gutter: 14,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 4,
              xl: 4,
              xxl: 4,
            }}
            dataSource={courseInfo}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <CourseCard {...item} />
              </List.Item>
            )}
          />
        </InfiniteScroll>
        <BackTop
          style={{
            fontSize: 40,
            color: "#fff",
            right: 15,
            backgroundColor: "#DDDDDD",
          }}
        >
          <VerticalAlignTopOutlined />
        </BackTop>
      </div>
    </AppLayout>
  );
}
